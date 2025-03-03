import { ANIMATION_DURATION, EXPANDED_HEIGHT, GNB_BG_SELECTOR, GNB_HEIGHT, GNB_LINK_SELECTOR, GNB_SELECTOR } from './constants.js';

export function renewalHeaderMotion() {
    const gnbClass = document.querySelector(GNB_SELECTOR);
    const gnbBg = document.querySelector(GNB_BG_SELECTOR);
    const gnbLinks = gnbClass ? gnbClass.querySelectorAll(GNB_LINK_SELECTOR) : [];

    const expandHeight = () => {
        gsap.to([gnbClass], {
            height: EXPANDED_HEIGHT + GNB_HEIGHT,
            duration: ANIMATION_DURATION,
            ease: 'power2.out'
        });
        gsap.to([gnbBg], {
            height: EXPANDED_HEIGHT,
            duration: ANIMATION_DURATION,
            ease: 'power2.out'
        });
        document.getElementById('overlay').classList.add('active')
    };

    const collapseHeight = () => {
        gsap.to([gnbClass], {
            height: GNB_HEIGHT,
            duration: ANIMATION_DURATION,
            ease: 'power2.out'
        });
        gsap.to([gnbBg], {
            height: 0,
            duration: ANIMATION_DURATION,
            ease: 'power2.out'
        });
        document.getElementById('overlay').classList.remove('active')
    };

    gnbClass?.addEventListener('mouseenter', expandHeight);
    gnbClass?.addEventListener('mouseleave', collapseHeight);
    
    if (gnbLinks.length > 0) {
        gnbLinks[0].addEventListener('focus', expandHeight);
        gnbLinks[gnbLinks.length - 1].addEventListener('focus', expandHeight);
        gnbLinks[gnbLinks.length - 1].addEventListener('blur', collapseHeight);
    }
}
