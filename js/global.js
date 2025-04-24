document.addEventListener('DOMContentLoaded', function () {
    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');

    if (menuMobile) {
        menuMobile.addEventListener('click', function () {
            menu.classList.toggle('active');
        });
    }
});