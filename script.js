const hamburger = document.querySelector('.hamburger');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Fonction pour basculer l'affichage du menu
function toggleMenu() {
  navbar.classList.toggle('hidden');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('no-scroll'); // Bloquer/débloquer le scroll
}

// Ouvrir/fermer en cliquant sur le hamburger
hamburger.addEventListener('click', toggleMenu);

// Fermer le menu quand un lien est cliqué
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!navbar.classList.contains('hidden')) {
      toggleMenu();
    }
  });
});
// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
  if (
    !navbar.classList.contains('hidden') &&
    !navbar.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    toggleMenu();
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".cardresponsive, .cardjs, .cardpk");

    cards.forEach(card => {
      card.addEventListener("click", function () {
        // Retirer flipped aux autres cartes (optionnel)
        cards.forEach(c => {
          if (c !== card) c.classList.remove("flipped");
        });

        // Bascule la classe flipped
        card.classList.toggle("flipped");
      });
    });
  });

// Fonction pour le formulaire de contact
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("IdsT61xCsLA3EUkrQ");

  const form = document.querySelector(".contact-form");

  if (!form) {
    console.error("Le formulaire n'a pas été trouvé !");
    return;
  }

  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Désactive le bouton pour éviter les doubles envois
    submitBtn.disabled = true;

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!nom || !email || !message) {
      alert("Veuillez remplir tous les champs du formulaire.");
      submitBtn.disabled = false;
      return;
    }

    const params = { nom, email, message };

    emailjs.send("service_guqhch8", "template_q3apao5", params)
      .then(function (response) {
        alert("✅ Message envoyé avec succès !");
        form.reset(); // Réinitialise les champs
        submitBtn.disabled = false;

        // Facultatif : supprimer les erreurs visuelles ou messages affichés
        // Exemple : document.querySelector(".success-message").style.display = "none";

      })
      .catch(function (error) {
        console.error("Erreur EmailJS :", error);
        alert("❌ Une erreur s'est produite lors de l'envoi. Réessayez plus tard.");
        submitBtn.disabled = false;
      });
  });
});
