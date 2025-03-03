import { INITIAL_ZOOM, MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from "./constants.js";

let nowZoom = INITIAL_ZOOM;

export function initZoom() {
    const zoomInBtn = document.querySelector('.zoomin');
    const zoomOutBtn = document.querySelector('.zoomout');
    const statusScreen = document.querySelector('.status-screen');

    // 버튼이 존재할 때만 이벤트 추가
    if (zoomInBtn && zoomOutBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (nowZoom < MAX_ZOOM) {
                nowZoom = Math.min(nowZoom + ZOOM_STEP, MAX_ZOOM);
                applyZoom();
            }
        });

        zoomOutBtn.addEventListener('click', () => {
            if (nowZoom > MIN_ZOOM) {
                nowZoom = Math.max(nowZoom - ZOOM_STEP, MIN_ZOOM);
                applyZoom();
            }
        });
    }

    function applyZoom() {
        nowZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nowZoom)); // 범위 초과 방지

        // 기본적으로 zoom 속성을 적용
        document.body.style.zoom = (nowZoom * 100) + "%";
        document.body.style.MozTransform = `scale(${nowZoom})`;
        document.body.style.MozTransformOrigin = "0 0 0";

        // 100% (1배율)일 때 zoom 속성 제거
        if (nowZoom === 1) {
            document.body.style.zoom = '';
        }

        if (statusScreen) {
            statusScreen.textContent = Math.round(nowZoom * 100) + "%";
        }

        if (zoomInBtn) zoomInBtn.disabled = nowZoom >= MAX_ZOOM;
        if (zoomOutBtn) zoomOutBtn.disabled = nowZoom <= MIN_ZOOM;
    }
}
