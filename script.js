/* ════════════════════════════════════════════════════════════
   ICHEM DGHIM — Portfolio v3 — script.js
   Projets dynamiques + toutes les interactions UI
════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════
   PROJETS PAR DÉFAUT
   (Chargés si aucun projet admin en localStorage)
══════════════════════════════════════ */
const DEFAULT_PROJECTS = [
  {
    id: 'papyrus',
    number: '01',
    title: 'Papyrus',
    desc: 'Plateforme de gestion documentaire — recherche avancée, partage sécurisé et collaboration.',
    fullDesc: 'Plateforme de GED avec recherche full-text, partage sécurisé par token et collaboration en temps réel.',
    tech: ['React', 'Node.js', 'MongoDB', 'REST API'],
    status: 'live',         // 'live' | 'wip'
    type: 'Full-Stack App',
    layout: 'featured',    // 'featured' | 'compact' | 'compact-wide' | 'featured-right' | 'half'
    demoUrl: 'https://papyrus-rho.vercel.app',
    showcaseUrl: 'https://idghim.github.io/Papyrus_website/',
    githubUrl: '',
    image: 'image/projets-pict/Papyrus_logo.png',
    isLogo: true,
    hasDemo: true,
    order: 1
  },
  {
    id: 'alea',
    number: '02',
    title: 'Aléa',
    desc: 'Quiz en marque blanche. Dashboard admin et personnalisation avancée.',
    fullDesc: 'Plateforme de quiz en marque blanche. Dashboard admin, système multi-utilisateurs et personnalisation avancée.',
    tech: ['React', 'Node.js', 'MongoDB'],
    status: 'wip',
    type: 'SaaS',
    layout: 'compact',
    demoUrl: '',
    showcaseUrl: '',
    githubUrl: 'https://github.com/IDGHIM',
    image: 'image/projets-pict/Alea_logo1.png',
    isLogo: true,
    hasDemo: false,
    order: 2
  },
  {
    id: 'pokedex',
    number: '03',
    title: 'Pokédex',
    desc: 'Cartes 3D retournables et consommation de la PokéAPI.',
    fullDesc: 'Pokédex moderne avec cartes 3D retournables, consommation de la PokéAPI et effets visuels immersifs.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
    status: 'live',
    type: 'Web App',
    layout: 'compact-wide',
    demoUrl: 'https://idghim.github.io/Interactive_Pok-dex/',
    showcaseUrl: '',
    githubUrl: 'https://github.com/IDGHIM/Interactive_Pok-dex',
    image: 'image/projets-pict/pokédex_app.png',
    isLogo: false,
    hasDemo: true,
    order: 3
  },
  {
    id: 'morpion',
    number: '04',
    title: 'Morpion',
    desc: 'Jeu de morpion avec React Hooks, gestion d\'état et animations fluides.',
    fullDesc: 'Version moderne du classique jeu de morpion développée avec React Hooks et gestion d\'état optimisée.',
    tech: ['React', 'CSS3', 'JavaScript'],
    status: 'live',
    type: 'React App',
    layout: 'featured-right',
    demoUrl: 'https://tic-tac-toe-rosy-eta.vercel.app/',
    showcaseUrl: '',
    githubUrl: 'https://github.com/IDGHIM/Tic-Tac-Toe',
    image: 'image/projets-pict/tic-tac-toe.png',
    isLogo: false,
    hasDemo: true,
    order: 4
  },
  {
    id: 'studprod',
    number: '05',
    title: 'STUDPROD',
    desc: 'Landing page avec animations fluides et design adaptatif.',
    fullDesc: 'Landing page moderne pour une société de production étudiante avec animations fluides et design responsive.',
    tech: ['HTML5', 'CSS3'],
    status: 'live',
    type: 'Landing Page',
    layout: 'half',
    demoUrl: 'https://idghim.github.io/fcc-Landing-Page',
    showcaseUrl: '',
    githubUrl: 'https://github.com/IDGHIM/fcc-Landing-Page',
    image: 'image/projets-pict/LOGO STUDPROD NOIR.png',
    isLogo: true,
    hasDemo: false,
    order: 5
  },
  {
    id: 'convertisseur',
    number: '06',
    title: 'Convertisseur',
    desc: 'Conversion arabe ↔ romain avec algorithmes de validation.',
    fullDesc: 'Application de conversion entre chiffres arabes et romains avec validation des entrées et interface intuitive.',
    tech: ['HTML5', 'JavaScript'],
    status: 'live',
    type: 'JS App',
    layout: 'half',
    demoUrl: 'https://idghim.github.io/fcc-Roman_Numeral_Converter/',
    showcaseUrl: '',
    githubUrl: 'https://github.com/IDGHIM/fcc-Roman_Numeral_Converter',
    image: 'image/projets-pict/roman_numeral_convert.png',
    isLogo: false,
    hasDemo: false,
    order: 6
  }
];

/* ══════════════════════════════════════
   RENDU DES PROJETS
══════════════════════════════════════ */
function getProjects() {
  try {
    const stored = localStorage.getItem('idghim_projects');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_PROJECTS;
}

function buildProjectCard(proj) {
  const isLogoClass = (proj.isLogo || (proj.image && (proj.image.includes('logo') || proj.image.includes('Logo') || proj.image.includes('LOGO'))));
  const logoFilter  = isLogoClass ? 'object-fit:contain;padding:20%;filter:brightness(0.5) grayscale(10%)' : '';

  const badgeLive = `<span class="proj-badge live">● Live</span>`;
  const badgeWip  = `<span class="proj-badge wip">⚙ En cours</span>`;
  const ribbon    = proj.status === 'wip' ? `<div class="proj-ribbon">En dev</div>` : '';
  const hint      = proj.hasDemo ? `<span class="proj-hint">Cliquer pour la démo</span>` : '';

  // Boutons d'action
  let actions = '';
  if (proj.demoUrl) {
    actions += `<a href="${proj.demoUrl}" target="_blank" class="proj-btn primary" onclick="event.stopPropagation()">
      <i class="fas fa-external-link-alt"></i> Voir le projet
    </a>`;
  }
  if (proj.hasDemo) {
    actions += `<button class="proj-btn ghost open-modal" onclick="event.stopPropagation()">
      <i class="fas fa-play"></i> Démo
    </button>`;
  }
  if (proj.githubUrl && !proj.demoUrl) {
    actions += `<a href="${proj.githubUrl}" target="_blank" class="proj-btn ghost" onclick="event.stopPropagation()">
      <i class="fab fa-github"></i> GitHub
    </a>`;
  }

  const techTags = (proj.tech || []).map(t => `<span>${t}</span>`).join('');

  return `
    <div class="proj-card ${proj.layout} reveal-up"
         data-title="${proj.title}"
         data-desc="${proj.fullDesc || proj.desc}"
         data-tech="${(proj.tech || []).join(',')}"
         data-demo="${proj.demoUrl || ''}"
         data-showcase="${proj.showcaseUrl || ''}"
         data-github="${proj.githubUrl || ''}">
      <div class="proj-preview">
        <img src="${proj.image}" alt="${proj.title}" loading="lazy" style="${logoFilter}" />
      </div>
      <div class="proj-overlay"></div>
      <div class="proj-number">${proj.number || String(proj.order).padStart(2,'0')}</div>
      ${ribbon}
      <div class="proj-content">
        <div class="proj-meta">
          ${proj.status === 'live' ? badgeLive : badgeWip}
          <span class="proj-type">${proj.type}</span>
        </div>
        <h3 class="proj-title">${proj.title}</h3>
        <p class="proj-desc">${proj.desc}</p>
        <div class="proj-tags">${techTags}</div>
        <div class="proj-actions">${actions}</div>
      </div>
      ${hint}
    </div>
  `;
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const projects = getProjects();
  const sorted   = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));

  grid.innerHTML = sorted.map(buildProjectCard).join('');

  // Mettre à jour le badge du hero
  const badge = document.getElementById('badgeProjectCount');
  if (badge) {
    badge.textContent = projects.length >= 6 ? projects.length + '+' : projects.length;
  }

  // Rebind interactions après injection DOM
  bindProjectInteractions();
  bindRevealObserver();
}

/* ══════════════════════════════════════
   MODAL DÉMO
══════════════════════════════════════ */
function bindProjectInteractions() {
  const modal      = document.getElementById('demoModal');
  const modalTitle = document.getElementById('modalTitle');
  const videoZone  = document.getElementById('modalVideoZone');
  const modalTech  = document.getElementById('modalTech');
  const modalActs  = document.getElementById('modalActions');

  function openModal(card) {
    const title    = card.dataset.title    || '';
    const tech     = card.dataset.tech     || '';
    const demo     = card.dataset.demo     || '';
    const github   = card.dataset.github   || '';
    const showcase = card.dataset.showcase || '';

    modalTitle.textContent = title;

    if (demo) {
      videoZone.innerHTML = `
        <iframe
          src="${demo}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>`;
    } else {
      videoZone.innerHTML = `
        <div class="modal-no-video">
          <i class="fas fa-hammer icon"></i>
          <p>Démo en cours de préparation</p>
        </div>`;
    }

    modalTech.innerHTML = '';
    if (tech) {
      tech.split(',').forEach(t => {
        const s = document.createElement('span');
        s.textContent = t.trim();
        modalTech.appendChild(s);
      });
    }

    modalActs.innerHTML = '';
    if (demo)     modalActs.innerHTML += `<a href="${demo}"    target="_blank" class="proj-btn primary"><i class="fas fa-external-link-alt"></i> Ouvrir</a>`;
    if (showcase) modalActs.innerHTML += `<a href="${showcase}" target="_blank" class="proj-btn ghost"><i class="fas fa-globe"></i> Site vitrine</a>`;
    if (github)   modalActs.innerHTML += `<a href="${github}"   target="_blank" class="proj-btn ghost"><i class="fab fa-github"></i> Code</a>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { videoZone.innerHTML = ''; }, 320);
  }

  // Boutons "Démo"
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.closest('.proj-card'));
    });
  });

  // Clic carte entière
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      openModal(card);
    });
  });

  // Fermeture
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ══════════════════════════════════════
   REVEAL OBSERVER (réutilisable)
══════════════════════════════════════ */
function bindRevealObserver() {
  const revealEls = document.querySelectorAll('.reveal-up:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Cursor */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });
    const animRing = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX - 15}px, ${ringY - 15}px)`;
      requestAnimationFrame(animRing);
    };
    animRing();
    const hoverables = document.querySelectorAll('a, button, .proj-card, .certif-item, .skill-pill, .contact-item');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* 2. Reveal observer initial */
  bindRevealObserver();

  /* 3. Nav active section */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links .nav-link');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => navObs.observe(s));

  /* 4. Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
    });
  });

  /* 5. Render projects (dynamique) */
  renderProjects();

  /* 6. EmailJS */
  emailjs.init('IdsT61xCsLA3EUkrQ');
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedback  = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const nom     = document.getElementById('nom').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!nom || !email || !message) {
        showFeedback('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
      }
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Envoi en cours…';
      try {
        await emailjs.send('service_guqhch8', 'template_q3apao5', {
          nom, email,
          sujet: document.getElementById('sujet')?.value.trim() || '',
          message
        });
        showFeedback('✅ Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
        form.reset();
      } catch {
        showFeedback('❌ Une erreur s\'est produite. Veuillez réessayer ou me contacter directement.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Envoyer le message';
      }
    });
  }

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className   = `form-feedback ${type}`;
    setTimeout(() => { feedback.className = 'form-feedback'; }, 6000);
  }

  /* 7. Ambient hero glow */
  const hero = document.querySelector('.hero');
  if (hero && !hero.querySelector('.hero-ambient')) {
    const amb = document.createElement('div');
    amb.className = 'hero-ambient';
    hero.appendChild(amb);
  }

  /* 8. Parallaxe légère hero */
  if (window.matchMedia('(min-width: 1025px)').matches) {
    const heroPhoto  = document.querySelector('.hero-photo');
    const heroBadges = document.querySelectorAll('.hero-badge');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        if (heroPhoto) heroPhoto.style.transform = `translateY(${scrollY * 0.06}px)`;
        heroBadges.forEach((badge, i) => {
          badge.style.transform = `translateY(${scrollY * 0.04 * (i % 2 === 0 ? 1 : -1)}px)`;
        });
      }
    }, { passive: true });
  }

  /* 9. Video hover sur cartes projet */
  document.querySelectorAll('.proj-card').forEach(card => {
    const video = card.querySelector('video[data-src]');
    if (!video) return;
    card.addEventListener('mouseenter', () => {
      if (!video.src || video.src === window.location.href) { video.src = video.dataset.src; video.load(); }
      video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  });

});