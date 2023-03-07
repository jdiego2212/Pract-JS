window.addEventListener('load', () => {

    const body = document.querySelector('body');
    const toggle = document.getElementById('toggle');

    toggle.onclick = () => {
        toggle.classList.toggle('active');
        body.classList.toggle('active');
    }

});