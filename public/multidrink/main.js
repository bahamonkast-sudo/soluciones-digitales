document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const toggleBtn = document.getElementById('toggleBtn');
    const appContainer = document.querySelector('.app-container');

    if(toggleBtn && appContainer) {
        toggleBtn.addEventListener('click', () => {
            appContainer.classList.toggle('panel-open');
            const isOpen = appContainer.classList.contains('panel-open');
            toggleBtn.setAttribute('aria-expanded', isOpen);
        });
    }

    // Lógica para el Código QR Modal
    const qrBtn = document.getElementById('qrBtn');
    const qrModal = document.getElementById('qrModal');
    const qrCloseBtn = document.getElementById('qrCloseBtn');

    if (qrBtn && qrModal && qrCloseBtn) {
        qrBtn.addEventListener('click', () => {
            qrModal.classList.add('active');
        });

        qrCloseBtn.addEventListener('click', () => {
            qrModal.classList.remove('active');
        });

        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                qrModal.classList.remove('active');
            }
        });
    }
});

// WhatsApp Channel - Play Button (Sección 3)
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('openVideoBtn');
    
    if(playBtn) {
        playBtn.addEventListener('click', function() {
            window.open('https://whatsapp.com/channel/0029Vb8XSZQ60eBio2xA2b1X', '_blank');
        });
    }
});

// Toggle Información de Valor -> Ver Más...
document.addEventListener('DOMContentLoaded', function() {
    const toggleInfoBtn = document.getElementById('toggleInfoBtn');
    const sliderWrapper = document.getElementById('sliderWrapper');
    
    // Set initial text
    if (toggleInfoBtn) {
        toggleInfoBtn.innerHTML = 'Ver más...';
    }

    if (toggleInfoBtn && sliderWrapper) {
        toggleInfoBtn.addEventListener('click', function() {
            if (sliderWrapper.style.display === 'none' || sliderWrapper.style.display === '') {
                sliderWrapper.style.display = 'block';
                toggleInfoBtn.innerHTML = 'Ocultar';
                sliderWrapper.scrollIntoView({ behavior: 'smooth' });
            } else {
                sliderWrapper.style.display = 'none';
                toggleInfoBtn.innerHTML = 'Ver más...';
            }
        });
    }
});
