import {
    CALLBACK_ATTRIBUTE,
    COLLAPSE_CLOSE_CLASS,
    COLLAPSE_TARGET_ATTRIBUTE,
    COLLAPSE_TOGGLE_SELECTOR,
    TOGGLE_ACTIVE_CLASS
} from './constants.js';

export function initCollapse() {
    const collapseToggles = document.querySelectorAll(COLLAPSE_TOGGLE_SELECTOR);
    
    collapseToggles?.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute(COLLAPSE_TARGET_ATTRIBUTE);
            const content = document.querySelector(`.${targetId}`);
            
            if (!content) {
                //console.error(`대상 컨텐츠를 찾을 수 없습니다: .${targetId}`);
                return;
            }
            
            content.classList.toggle(COLLAPSE_CLOSE_CLASS);
            button.classList.toggle(TOGGLE_ACTIVE_CLASS);

            //  콜백 함수 실행
            const callbackName = button.getAttribute(CALLBACK_ATTRIBUTE);
            
            if (callbackName && typeof window[callbackName] === 'function') {
                window[callbackName](button, content);
            } else {
                //console.log('콜백이 없거나 잘못된 콜백입니다.');
            }
        });
    });
}
