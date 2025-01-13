import { BTN_TOP_SELECTOR, FLOAT_CLASS, OPEN_CLASS, SMALL_SCREEN_MAX_WIDTH } from './constants.js';

let isCurrentlySmallScreen = undefined;

export function isSmallScreen() {
    return window.innerWidth <= SMALL_SCREEN_MAX_WIDTH;
}

export function checkScreenSizeAndUpdate() {
    const isNowSmallScreen = isSmallScreen();
    if (isCurrentlySmallScreen === undefined || isNowSmallScreen !== isCurrentlySmallScreen) {
        if (isNowSmallScreen) {
            console.log("현재 화면 너비는 1000 이하로 변경되었습니다.");
            updateBtnTopTitle('빠른 메뉴 열림');
        } else {
            console.log("현재 화면 너비는 1000을 초과로 변경되었습니다.");
            closeFloatMenu();
            updateBtnTopTitle('맨 위로 이동');
        }
        isCurrentlySmallScreen = isNowSmallScreen;
    }
}

function closeFloatMenu() {
    const floatElement = document.querySelector(`.${FLOAT_CLASS}`);
    if (floatElement && floatElement.classList.contains(OPEN_CLASS)) {
        floatElement.classList.remove(OPEN_CLASS);
    }
}

function updateBtnTopTitle(title) {
    const btnTop = document.querySelector(BTN_TOP_SELECTOR);
    if (btnTop) {
        btnTop.setAttribute('title', title);
    }
}

export function initScreenSizeListener() {
    checkScreenSizeAndUpdate();
    window.addEventListener('resize', checkScreenSizeAndUpdate);
}
