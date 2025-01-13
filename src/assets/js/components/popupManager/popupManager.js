import {
    ACTIVE_CLASS,
    CLOSE_BUTTON_SELECTOR,
    DIALOG_SELECTOR,
    FOCUSABLE_ELEMENTS,
    OPEN_BUTTON_SELECTOR,
    OVERLAY_SELECTOR
} from './constants.js';

export function initPopupManager() {
    const openButtons = document.querySelectorAll(OPEN_BUTTON_SELECTOR);
    const closeButtons = document.querySelectorAll(CLOSE_BUTTON_SELECTOR);
    const overlay = document.querySelector(OVERLAY_SELECTOR);

    if (openButtons.length > 0) {
        openButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const popup = document.getElementById(targetId);
                if (popup) {
                    openPopup(popup, this);
                }
            });
        });
    }

    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const popup = this.closest(DIALOG_SELECTOR);
                if (popup) {
                    closePopup(popup);
                }
            });
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            const activePopup = document.querySelector(`${DIALOG_SELECTOR}.${ACTIVE_CLASS}`);
            if (activePopup) {
                closePopup(activePopup);
            }
        });
    }
}

export function openPopup(popup, triggerButton) {
    popup.classList.add(ACTIVE_CLASS);
    const overlay = document.querySelector(OVERLAY_SELECTOR);
    overlay?.classList.add(ACTIVE_CLASS);
    popup.setAttribute('aria-hidden', 'false');

    const focusableElements = popup.querySelectorAll(FOCUSABLE_ELEMENTS);
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }

    trapFocus(popup);

    popup.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup(popup);
        }
    });
}

export function closePopup(popup) {
    popup.classList.remove(ACTIVE_CLASS);
    const overlay = document.querySelector(OVERLAY_SELECTOR);
    overlay?.classList.remove(ACTIVE_CLASS);
    popup.setAttribute('aria-hidden', 'true');

    const triggerButton = document.querySelector(`[data-target="${popup.id}"]`);
    triggerButton?.focus();
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(FOCUSABLE_ELEMENTS);
    if (focusableElements.length > 0) {
        let firstElement = focusableElements[0];
        let lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}
