/* ════════════════════════════════════════════════════════════
   ICHEM DGHIM — Portfolio v2 — script.js
════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════
     1. CURSOR PERSONNALISÉ
  ══════════════════════════════════════════ */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });

    // Ring légèrement en retard (lerp)
    const animRing = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX - 15}px, ${ringY - 15}px)`;
      requestAnimationFrame(animRing);
    };
    animRing();

    // Hover state
    const hoverables = document.querySelectorAll('a, button, .proj-card, .certif-item, .skill-pill, .contact-item');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ══════════════════════════════════════════
     2. SCROLL REVEAL (IntersectionObserver)
  ══════════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ══════════════════════════════════════════
     3. NAV — SECTION ACTIVE AU SCROLL
  ══════════════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.45
  });

  sections.forEach(s => navObserver.observe(s));

  /* ══════════════════════════════════════════
     4. SMOOTH SCROLL (nav + tous les ancres)
  ══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ══════════════════════════════════════════
     5. VIDÉO AU HOVER SUR LES CARTES PROJET
     (pour les <video data-src="...">)
  ══════════════════════════════════════════ */
  document.querySelectorAll('.proj-card').forEach(card => {
    const video = card.querySelector('video[data-src]');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      if (!video.src || video.src === window.location.href) {
        video.src = video.dataset.src;
        video.load();
      }
      video.play().catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  /* ══════════════════════════════════════════
     6. MODAL DÉMO
  ══════════════════════════════════════════ */
  const modal       = document.getElementById('demoModal');
  const modalTitle  = document.getElementById('modalTitle');
  const videoZone   = document.getElementById('modalVideoZone');
  const modalTech   = document.getElementById('modalTech');
  const modalActs   = document.getElementById('modalActions');
  const closeBtn    = document.getElementById('modalClose');

  function openModal(card) {
    const title   = card.dataset.title   || '';
    const tech    = card.dataset.tech    || '';
    const demo    = card.dataset.demo    || '';
    const github  = card.dataset.github  || '';
    const showcase = card.dataset.showcase || '';

    // Titre
    modalTitle.textContent = title;

    // Zone vidéo
    const cardVideo = card.querySelector('video');

    if (cardVideo && cardVideo.src) {
      videoZone.innerHTML = `
        <video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;">
          <source src="${cardVideo.src}" type="video/mp4">
        </video>`;
    } else if (demo) {
      videoZone.innerHTML = `
        <iframe
          src="${demo}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>`;
    } else {
      videoZone.innerHTML = `
        <div class="modal-no-video">
          <i class="fas fa-hammer icon"></i>
          <p>Démo en cours de préparation</p>
        </div>`;
    }

    // Tech tags
    modalTech.innerHTML = '';
    if (tech) {
      tech.split(',').forEach(t => {
        const span = document.createElement('span');
        span.textContent = t.trim();
        modalTech.appendChild(span);
      });
    }

    // Liens
    modalActs.innerHTML = '';
    if (demo) {
      modalActs.innerHTML += `<a href="${demo}" target="_blank" class="proj-btn primary"><i class="fas fa-external-link-alt"></i> Ouvrir</a>`;
    }
    if (showcase) {
      modalActs.innerHTML += `<a href="${showcase}" target="_blank" class="proj-btn ghost"><i class="fas fa-globe"></i> Site vitrine</a>`;
    }
    if (github) {
      modalActs.innerHTML += `<a href="${github}" target="_blank" class="proj-btn ghost"><i class="fab fa-github"></i> Code</a>`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Vider après transition pour stopper iframe/vidéo
    setTimeout(() => { videoZone.innerHTML = ''; }, 320);
  }

  // Clic sur le bouton "Démo" des cartes
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.closest('.proj-card'));
    });
  });

  // Clic sur la carte elle-même (hors liens)
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      openModal(card);
    });
  });

  // Fermer
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ══════════════════════════════════════════
     7. EMAILJS — FORMULAIRE CONTACT
  ══════════════════════════════════════════ */
  emailjs.init('IdsT61xCsLA3EUkrQ');

  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const feedback   = document.getElementById('formFeedback');

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

      // État chargement
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Envoi en cours…';

      const params = {
        nom,
        email,
        sujet:   document.getElementById('sujet')?.value.trim() || '',
        message
      };

      try {
        await emailjs.send('service_guqhch8', 'template_q3apao5', params);
        showFeedback('✅ Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
        form.reset();
      } catch (err) {
        console.error('EmailJS error:', err);
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

  /* ══════════════════════════════════════════
     8. AMBIENT HERO GLOW (élément dynamique)
  ══════════════════════════════════════════ */
  const hero = document.querySelector('.hero');
  if (hero) {
    const amb = document.createElement('div');
    amb.className = 'hero-ambient';
    hero.appendChild(amb);
  }

  /* ══════════════════════════════════════════
     9. PARALLAXE LÉGÈRE SUR HERO (desktop)
  ══════════════════════════════════════════ */
  if (window.matchMedia('(min-width: 1025px)').matches) {
    const heroPhoto = document.querySelector('.hero-photo');
    const heroBadges = document.querySelectorAll('.hero-badge');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        if (heroPhoto) {
          heroPhoto.style.transform = `translateY(${scrollY * 0.06}px)`;
        }
        heroBadges.forEach((badge, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          badge.style.transform = `translateY(${scrollY * 0.04 * dir}px)`;
        });
      }
    }, { passive: true });
  }

});