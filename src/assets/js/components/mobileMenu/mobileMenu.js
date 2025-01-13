import { ACTIVE_CLASS, ANIMATION_CONFIG, DEPTH_SELECTOR, MENU_SELECTOR } from './constants.js';

export function initMobileMenu() {
    const menuLinks = document.querySelectorAll(MENU_SELECTOR);
    
    if (menuLinks.length > 0) {
        menuLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                
                const parentLi = this.parentElement;
                const depth = parentLi.querySelector(DEPTH_SELECTOR);
                const siblingLis = Array.from(parentLi.parentElement.children).filter(li => li !== parentLi); // 형제 li들
                siblingLis.forEach(li => {
                    li.classList.remove(ACTIVE_CLASS);
                    const siblingDepth = li.querySelector(DEPTH_SELECTOR);
                    if (siblingDepth && siblingDepth.offsetHeight > 0) {
                        closeMenu(siblingDepth);
                    }
                });

                if (parentLi.classList.contains(ACTIVE_CLASS)) {
                    closeMenu(depth);
                    parentLi.classList.remove(ACTIVE_CLASS);
                } else {
                    openMenu(depth);
                    parentLi.classList.add(ACTIVE_CLASS);
                }
            });
        });
    }
}

function openMenu(depth) {
    if (!depth) return;
    gsap.killTweensOf(depth); // 기존 애니메이션 종료
    depth.style.visibility = 'visible';
    const depthHeight = depth.scrollHeight; // 실제 높이 계산
    gsap.fromTo(
        depth,
        { height: 0, opacity: 0 },
        { height: depthHeight, opacity: 1, duration: ANIMATION_CONFIG.duration }
    );
}

function closeMenu(depth) {
    if (!depth) return;
    gsap.killTweensOf(depth); // 기존 애니메이션 종료
    gsap.to(depth, {
        ...ANIMATION_CONFIG
    });
}
