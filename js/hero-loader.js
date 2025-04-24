document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');

    if (hero) {
        const img = new Image();

        img.onload = function () {
            // Aplica a imagem como fundo diretamente no elemento
            hero.style.backgroundImage = `
                linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${img.src}')
            `;
            hero.classList.add('bg-loaded');
        };

        // Caminho relativo ou absoluto da imagem
        img.src = './img/bg/hero.webp';
    }
});
