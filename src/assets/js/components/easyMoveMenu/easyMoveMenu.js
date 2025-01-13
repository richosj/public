import {
    ACTIVE_CLASS,
    MENU_TOGGLE_SELECTOR,
    TITLE_CLOSE,
    TITLE_OPEN
} from './constants.js';

export function initEasyMoveMenu() {
    const easyMoveToggle = document.querySelector(MENU_TOGGLE_SELECTOR);
    if (!easyMoveToggle) return;

    easyMoveToggle.addEventListener('click', handleMenuToggle);
}

function handleMenuToggle() {
    const menuToggle = document.querySelector(MENU_TOGGLE_SELECTOR);
    const isActive = menuToggle.classList.toggle(ACTIVE_CLASS);

    menuToggle.setAttribute('title', isActive ? TITLE_CLOSE : TITLE_OPEN);
}
