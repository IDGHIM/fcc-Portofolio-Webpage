document.addEventListener("DOMContentLoaded", function () {
  // Initialisation d'EmailJS avec votre clé publique
  emailjs.init("IdsT61xCsLA3EUkrQ");

  // Sélection du formulaire
  const form = document.querySelector(".contact-form");

  if (!form) {
    console.error("Le formulaire n'a pas été trouvé !");
    return;
  }

  // Écoute de l'événement 'submit'
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!nom || !email || !message) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    const params = {
      nom: nom,
      email: email,
      message: message
    };

    // Envoi avec EmailJS
    emailjs.send("service_guqhch8", "template_q3apao5", params)
      .then(function (response) {
        alert("✅ Message envoyé avec succès !");
        form.reset(); // Réinitialise le formulaire après envoi
      })
      .catch(function (error) {
        console.error("Erreur EmailJS :", error);
        alert("❌ Une erreur s'est produite lors de l'envoi. Réessayez plus tard.");
      });
  });
});
