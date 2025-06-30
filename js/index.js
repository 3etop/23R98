document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que Swiper.js esté correctamente inicializado
    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.custom-next', // Botón personalizado "siguiente"
            prevEl: '.custom-prev', // Botón personalizado "anterior"
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true, // Deshabilitar el loop para evitar que sea infinito
    });

    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images figure');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    let currentIndex = 0;

    const updateCarousel = () => {
        const offset = -currentIndex * (150 + 10); // Ajusta el desplazamiento según el tamaño de las imágenes y el gap
        carouselImages.style.transform = `translateX(${offset}px)`;

        // Deshabilitar botones si no hay más imágenes
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === images.length - 1;
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex += 1;
            updateCarousel();
        }
    });

    // Inicializar el estado del carrusel
    updateCarousel();

    // Modal para mostrar imagen ampliada
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.modal-close');

    document.querySelectorAll('.carousel-images img').forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImage.src = image.src;
            modalCaption.textContent = image.alt;

            // Centrar la imagen en el modal
            modalImage.style.position = 'absolute';
            modalImage.style.top = '50%';
            modalImage.style.left = '50%';
            modalImage.style.transform = 'translate(-50%, -50%)';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const card = document.querySelector('.card');

    card.addEventListener('mouseenter', () => {
        card.style.transform = 'rotateY(180deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg)';
    });

    // Botón de instalación PWA y mensaje de soporte
    let deferredPrompt;
    const installBtn = document.getElementById('installPwaBtn');
    const pwaMsg = document.getElementById('pwaMsg');
    let pwaSupported = false;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = 'flex';
        pwaSupported = true;
        if (pwaMsg) pwaMsg.style.display = 'none';
    });
    installBtn && installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                installBtn.style.display = 'none';
            }
            deferredPrompt = null;
        }
    });
    window.addEventListener('appinstalled', () => {
        installBtn.style.display = 'none';
    });
    // Mostrar advertencia si no es soportado
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (!pwaSupported) {
                if (pwaMsg) pwaMsg.innerText = 'Tu navegador no soporta instalación como app o ya está instalada.';
                if (pwaMsg) pwaMsg.style.display = 'block';
            }
        }, 2000);
    });
});