document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.modal-close');
    let lastFocusedElement = null;

    document.querySelectorAll('.pagina-2').forEach(card => {
        const title = card.querySelector(':scope > h2')?.textContent.trim();
        const image = card.querySelector('.proyecto-imagen');
        const quoteLink = document.createElement('a');
        const message = `Hola, quiero cotizar el alquiler de ${title} para mi producción.`;

        quoteLink.className = 'quote-link';
        quoteLink.href = `https://api.whatsapp.com/send?phone=3125338978&text=${encodeURIComponent(message)}`;
        quoteLink.target = '_blank';
        quoteLink.rel = 'noopener noreferrer';
        quoteLink.innerHTML = 'Consultar disponibilidad <span aria-hidden="true">↗</span>';
        card.querySelector('.proyecto-texto').append(quoteLink);

        if (image) {
            image.loading = 'lazy';
            image.decoding = 'async';
            image.tabIndex = 0;
            image.alt = title ? `${title}, equipo disponible para alquiler` : 'Equipo audiovisual disponible para alquiler';
        }
    });

    const openModal = image => {
        lastFocusedElement = document.activeElement;
        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalCaption.textContent = image.alt;
        modal.hidden = false;
        document.body.classList.add('modal-open');
        closeModal.focus();
    };

    const hideModal = () => {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    };

    document.querySelectorAll('.proyecto-imagen').forEach(image => {
        image.addEventListener('click', () => openModal(image));
        image.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(image);
            }
        });
    });

    closeModal.addEventListener('click', hideModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            hideModal();
        }
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !modal.hidden) {
            hideModal();
        }
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch(error => {
                console.error('No se pudo registrar el service worker:', error);
            });
        });
    }
});
