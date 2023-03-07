window.addEventListener('load', () => {
    const menu = document.querySelector('.menu');
    const search = document.querySelector('.search');
    const wrapMenu = document.querySelector('.wrap-menu');
    const toggle = document.querySelector('.toggle');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        search.classList.toggle('active');
        wrapMenu.classList.toggle('active');
        toggle.classList.toggle('active');
    });

});