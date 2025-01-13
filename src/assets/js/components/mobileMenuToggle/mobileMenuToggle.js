import {
    CLOSE_MENU_BUTTON_SELECTOR,
    MENU_OPEN_CLASS,
    MOBILE_HEADER_SELECTOR,
    OPEN_MENU_BUTTON_SELECTOR
} from './constants.js';

export function initMobileMenuToggle() {
    const openMenuButton = document.querySelector(OPEN_MENU_BUTTON_SELECTOR);
    const closeMenuButton = document.querySelector(CLOSE_MENU_BUTTON_SELECTOR);

    openMenuButton?.addEventListener('click', () => mobileMenuOpen());
    closeMenuButton?.addEventListener('click', () => mobileMenuClose());
}

export function mobileMenuOpen() {
    const mobileHeader = document.querySelector(MOBILE_HEADER_SELECTOR);
    if (mobileHeader) {
        mobileHeader.classList.add(MENU_OPEN_CLASS);
    }
}

export function mobileMenuClose() {
    const mobileHeader = document.querySelector(MOBILE_HEADER_SELECTOR);
    if (mobileHeader) {
        mobileHeader.classList.remove(MENU_OPEN_CLASS);
    }
}
