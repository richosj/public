import { ACTIVE_CLASS, TITLE_CLOSE, TITLE_OPEN, TOGGLE_SELECTOR } from './constants.js';

export function initRelatedToggle() {
    const relatedToggles = document.querySelectorAll(TOGGLE_SELECTOR);
    
    relatedToggles.forEach((relatedToggle) => {
        relatedToggle.addEventListener('click', (event) => {
            event.stopPropagation();

            if (relatedToggle.classList.contains(ACTIVE_CLASS)) {
                relatedToggle.setAttribute('title', TITLE_OPEN);
                relatedToggle.classList.remove(ACTIVE_CLASS);
            } else {
                relatedToggle.setAttribute('title', TITLE_CLOSE);
                relatedToggle.classList.add(ACTIVE_CLASS);
                document.body.addEventListener('click', (e) => closeMenu(e, relatedToggle));
            }
        });
    });
}

function closeMenu(event, relatedToggle) {
    if (!relatedToggle.contains(event.target)) {
        if (relatedToggle.classList.contains(ACTIVE_CLASS)) {
            relatedToggle.classList.remove(ACTIVE_CLASS);
            relatedToggle.setAttribute('title', TITLE_OPEN);
        }
        document.body.removeEventListener('click', (e) => closeMenu(e, relatedToggle));
    }
}
