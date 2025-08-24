document.addEventListener("DOMContentLoaded", function () {
  // --- EmailJS init + form handling ---
  emailjs.init("IdsT61xCsLA3EUkrQ");

  const form = document.querySelector(".contact-form");

  if (!form) {
    console.error("Le formulaire n'a pas été trouvé !");
    return;
  }

  const submitBtn = form.querySelector("#submit_button");
  const feedback = document.createElement('div'); // Création du message visuel
  feedback.className = 'form-feedback';
  form.appendChild(feedback); // Ajout du message sous le formulaire

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
    feedback.classList.remove('success', 'error'); // Reset classes
    feedback.classList.add(type);
    feedback.style.display = 'block';

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 5000);
  }

  // --- Scroll smooth ---
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
});
