/**
 * analytics-tracker.js
 * Suivi des visites côté client — stockage dans localStorage
 * Données lisibles uniquement depuis admin.html (protégé par mot de passe)
 */
(function () {
  const STORAGE_KEY = 'idghim_analytics';

  function getAnalytics() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        totalVisits: 0,
        uniqueVisitors: 0,
        visitsByDay: {},
        visitsByPage: {},
        referrers: {},
        devices: { desktop: 0, mobile: 0, tablet: 0 },
        lastVisit: null,
        firstVisit: null
      };
    } catch {
      return {
        totalVisits: 0,
        uniqueVisitors: 0,
        visitsByDay: {},
        visitsByPage: {},
        referrers: {},
        devices: { desktop: 0, mobile: 0, tablet: 0 },
        lastVisit: null,
        firstVisit: null
      };
    }
  }

  function saveAnalytics(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  function isNewVisitor() {
    const key = 'idghim_visitor_id';
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, Date.now() + '_' + Math.random().toString(36).slice(2));
      return true;
    }
    return false;
  }

  function track() {
    const data = getAnalytics();
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const referrer = document.referrer ? new URL(document.referrer).hostname : 'direct';
    const device = getDeviceType();

    // Total visits
    data.totalVisits = (data.totalVisits || 0) + 1;

    // Unique visitors
    if (isNewVisitor()) {
      data.uniqueVisitors = (data.uniqueVisitors || 0) + 1;
    }

    // Visits by day
    data.visitsByDay[today] = (data.visitsByDay[today] || 0) + 1;

    // Visits by page
    data.visitsByPage[page] = (data.visitsByPage[page] || 0) + 1;

    // Referrers
    data.referrers[referrer] = (data.referrers[referrer] || 0) + 1;

    // Devices
    data.devices[device] = (data.devices[device] || 0) + 1;

    // Timestamps
    data.lastVisit = now.toISOString();
    if (!data.firstVisit) data.firstVisit = now.toISOString();

    saveAnalytics(data);
  }

  // Lancer le tracking
  track();

  // Exposer pour debug (accessible depuis la console mais pas visible sans savoir chercher)
  window.__trackPageView = track;
})();