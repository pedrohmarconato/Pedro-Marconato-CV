// Page-only enhancements; CV content stays in cv-texts.js.
document.addEventListener('DOMContentLoaded', function () {
    const lang = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
    const email = document.getElementById('cv-email');
    const phone = document.getElementById('cv-phone');
    email.href = 'mailto:' + getText('contact.email', lang);
    phone.href = 'https://wa.me/' + getText('contact.phone', lang).replace(/\D/g, '');
    document.querySelector('.footer-contact').href = email.href;

    // Keep the PDF a native link, including when scripts or popups are blocked.
    document.querySelector('.print-button').addEventListener('click', function (event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const printWindow = window.open(this.href, '_blank');
        if (!printWindow) return;
        event.preventDefault();
        printWindow.opener = null;
        printWindow.addEventListener('load', async function () {
            await printWindow.document.fonts.ready;
            printWindow.print();
        }, { once: true });
    });

    // Position supplementary experience details inside the viewport.
    // Buttons work with keyboard and touch as well as mouse clicks.
    const tooltips = [...document.querySelectorAll('.tooltip')];
    function closeAll() {
        tooltips.forEach(function (tooltip) {
            tooltip.classList.remove('is-open');
            tooltip.querySelector('button').setAttribute('aria-expanded', 'false');
        });
    }
    tooltips.forEach(function (tooltip, index) {
        const icon = tooltip.querySelector('.tooltip-icon');
        const details = tooltip.querySelector('.tooltip-text');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'tooltip-trigger';
        button.setAttribute('aria-label', details.querySelector('.tooltip-header').textContent.trim());
        button.setAttribute('aria-expanded', 'false');
        details.id = 'experience-details-' + index;
        button.setAttribute('aria-controls', details.id);
        icon.setAttribute('aria-hidden', 'true');
        icon.replaceWith(button);
        button.appendChild(icon);
        button.addEventListener('click', function () {
            const wasOpen = tooltip.classList.contains('is-open');
            closeAll();
            if (wasOpen) return;
            tooltip.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
            const rect = button.getBoundingClientRect();
            const width = details.offsetWidth;
            const height = details.offsetHeight;
            details.style.left = Math.max(16, Math.min(rect.left, window.innerWidth - width - 16)) + 'px';
            details.style.top = Math.max(16, Math.min(rect.bottom + 8, window.innerHeight - height - 16)) + 'px';
        });
    });
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.tooltip')) closeAll();
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeAll();
    });
    window.addEventListener('resize', closeAll);
});
