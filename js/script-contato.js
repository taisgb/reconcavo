
document.addEventListener("DOMContentLoaded", () => {
  window.emailjs.init("z5CQEKJrSvIG_prM1");

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        subject: this.subject.value,
        message: this.message.value
      };

      const submitButton = form.querySelector("button[type='submit']");
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";

      window.emailjs.send("service_3al1x4b", "template_4zdwmpu", data)
        .then(() => {
          alert("Mensagem enviada com sucesso!");
          form.reset();
        })
        .catch((error) => {
          console.error("Erro ao enviar:", error);
          alert("Erro ao enviar. Verifique o console.");
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        });
    });
  }
});
