document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // GESTION DU FLIP DES CARTES DE PROJET (MOBILE & DESKTOP)
  // ============================================
  const projectCards = document.querySelectorAll('.project-card');
  
  // Détecter si on est sur un appareil tactile
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    projectCards.forEach(card => {
      card.addEventListener('click', function(e) {
        // Empêcher le clic sur les liens de déclencher le flip
        if (e.target.closest('.project-link')) {
          return;
        }
        
        // Si la carte est déjà retournée et qu'on clique dessus
        if (this.classList.contains('flipped')) {
          // Si le clic est sur la face arrière (pas sur un lien), on ne fait rien
          // pour permettre d'interagir avec les liens
          if (e.target.closest('.project-card-back')) {
            return;
          }
        }
        
        // Retourner toutes les autres cartes
        projectCards.forEach(otherCard => {
          if (otherCard !== this) {
            otherCard.classList.remove('flipped');
          }
        });
        
        // Toggle la classe flipped sur la carte cliquée
        this.classList.toggle('flipped');
      });
    });
    
    // Fermer les cartes retournées en cliquant en dehors
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.project-card')) {
        projectCards.forEach(card => {
          card.classList.remove('flipped');
        });
      }
    });
  }

  // ============================================
  // EMAILJS - GESTION DU FORMULAIRE DE CONTACT
  // ============================================
  emailjs.init("IdsT61xCsLA3EUkrQ");

  const form = document.querySelector(".contact-form");

  if (!form) {
    console.error("Le formulaire n'a pas été trouvé !");
    return;
  }

  const submitBtn = form.querySelector("#submit_button");
  const feedback = document.createElement('div');
  feedback.className = 'form-feedback';
  form.appendChild(feedback);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.disabled = true;

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!nom || !email || !message) {
      showFeedback("Veuillez remplir tous les champs du formulaire.", "error");
      submitBtn.disabled = false;
      return;
    }

    const params = { nom, email, message };

    emailjs.send("service_guqhch8", "template_q3apao5", params)
      .then(function (response) {
        showFeedback("✅ Message envoyé avec succès !", "success");
        form.reset();
        submitBtn.disabled = false;
      })
      .catch(function (error) {
        console.error("Erreur EmailJS :", error);
        showFeedback("❌ Une erreur s'est produite. Veuillez réessayer plus tard.", "error");
        submitBtn.disabled = false;
      });
  });

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.classList.remove('success', 'error');
    feedback.classList.add(type);
    feedback.style.display = 'block';

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 5000);
  }

  // ============================================
  // SMOOTH SCROLL POUR LA NAVIGATION
  // ============================================
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      const offsetTop = targetElement.offsetTop - 20;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });

  // ============================================
  // ANIMATIONS AU SCROLL (OPTIONNEL)
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observer tous les éléments avec animation
  const animatedElements = document.querySelectorAll('.project-card, .skill-category, .methodology-card, .timeline-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});