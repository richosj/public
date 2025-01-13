import { BTN_TOP_SELECTOR, TOGGLE_CLASS } from './constants.js';


export function initBtnTop(screen){
    const btnTop = document.querySelector(BTN_TOP_SELECTOR);
    if(btnTop){
        btnTop.addEventListener('click', () => {
            if(screen){
                gsap.to(window, {
                    scrollTo: { y: 0, duration: 1 },
                    ease: 'power2.out'
                });
            } else {
                const floatElement = document.querySelector('.float');
                if (floatElement) {
                    floatElement.classList.toggle(TOGGLE_CLASS);
                }
            }
        });
    }
}