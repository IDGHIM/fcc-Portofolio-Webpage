// script.js
(function () {
  emailjs.init("IdsT61xCsLA3EUkrQ"); // Remplacez par votre clé publique EmailJS
})();

document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Données du formulaire
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const params = {
    nom: nom,
    email: email,
    message: message
  };

  emailjs.send("service_guqhch8", "template_q3apao5", params)
    .then(function (response) {
      alert("Message envoyé avec succès !");
    }, function (error) {
      alert("Erreur lors de l'envoi du message : " + JSON.stringify(error));
    });
});
