window.addEventListener('load', () => {

    let toggleBtn = document.querySelector('.toggle-btn');
    let container = document.querySelector('.container');
    
    toggleBtn.onclick = () => {
        container.classList.toggle('active');
    };
    
});
