export const MENU_SELECTOR = '#mgnb > li > a'; // 모바일 메뉴 선택자
export const ACTIVE_CLASS = 'active'; // 활성화 클래스
export const DEPTH_SELECTOR = '.depth'; // depth 선택자
export const ANIMATION_DURATION = 0.3; // 애니메이션 지속 시간 (초)
export const ANIMATION_CONFIG = {
    height: 0,
    opacity: 0,
    duration: ANIMATION_DURATION,
    onComplete: (element) => {
        element.style.visibility = 'hidden';
    }
};
