import { initBtnTop } from "./components/btnTop/index.js";
import { initCollapse } from "./components/collapseToggle/index.js";
import { initEasyMoveMenu } from "./components/easyMoveMenu/index.js";
import { renewalHeaderMotion } from "./components/gnb/index.js";
import { limitedTextarea } from "./components/limitedTextarea/index.js";
import { initLNB } from "./components/LNB/index.js";
import { initMobileMenu } from "./components/mobileMenu/index.js";
import { initMobileMenuToggle } from "./components/mobileMenuToggle/index.js";
import { initPopupManager } from "./components/popupManager/index.js";
import { initRelatedToggle } from "./components/relatedToggle/index.js";
import { initScreenSizeListener } from "./components/screenSize/index.js";
import { initZoom } from "./components/screenZoom/index.js";
import { userAgentCheck } from "./components/userAgent/index.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  initScreenSizeListener();
  userAgentCheck();
  initBtnTop(true);
  renewalHeaderMotion();
  initMobileMenu();
  initMobileMenuToggle();
  initEasyMoveMenu();
  initRelatedToggle();
  initCollapse();
  initPopupManager();
  limitedTextarea();
  initLNB();
  initZoom();
  
  const openMangerBtn = document.querySelector('[data-toggle-manager="u"]');
  if(openMangerBtn){
    const target = document.querySelector('.u');
    const closeBtn = target.querySelector('.close');

    openMangerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      target.classList.toggle('active');
    });  
    closeBtn.addEventListener('click', () => {
      target.classList.remove('active');
    });
  }
});


(function () {
  let currentTooltip = null;
  /**
   * 툴팁 열기
   * @param {Object} options - 옵션 객체
   * @param {HTMLElement} options.target - 툴팁 기준 대상 (버튼)
   * @param {string} [options.title] - 툴팁 제목 (옵션, 없으면 data-title 사용)
   * @param {string} [options.content] - 툴팁 내용 (옵션, 없으면 data-content 사용)
   * @param {HTMLElement} [options.container] - 툴팁을 삽입할 컨테이너 (기본: id="tooltip-root", 없으면 document.body)
   * @param {string|Array} [options.classes] - 추가로 넣을 클래스 (문자열 또는 배열)
   * @param {string} [options.width] - tooltip의 width (예: "300px", "50%")
   * @param {string} [options.height] - tooltip의 height (예: "200px")
   */
  window.openTooltip = function (options) {
      const target = options.target;
      if (!target) return;

      const title = target.hasAttribute("data-title")
      ? target.getAttribute("data-title")
      : (typeof options.title !== "undefined" ? options.title : "제목 없음");

      const content = target.hasAttribute("data-content")
      ? target.getAttribute("data-content")
      : (typeof options.content !== "undefined" ? options.content : "내용 없음");

      const container =
      options.container || document.getElementById("tooltip-root") || document.body;

      // 이미 툴팁이 열려 있으면 닫고, 같은 대상이면 리턴
      if (currentTooltip) {
      closeTooltip();
      if (currentTooltip.target === target) return;
      }

      // 툴팁 생성
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";

      // 추가 클래스 옵션이 있으면 적용 (문자열 또는 배열)
      if (options.classes) {
        if (Array.isArray(options.classes)) {
          options.classes.forEach(cls => tooltip.classList.add(cls));
        } else {
          tooltip.classList.add(options.classes);
        }
      }
      

      tooltip.innerHTML = `
      <div class="tooltip-container">
          <div class="tooltip-header">
            <h4 id="tooltip-title">${title}</h4>
          </div>
          <div id="tooltip-body">
            <div class="tooltip-content">${content}</div>
          </div>
          <button id="close-tooltip" title="닫기"><i></i></button>
      </div>
      `;
      container.appendChild(tooltip);
      
      const tooltipContent = tooltip.querySelector("#tooltip-body").querySelector('.tooltip-content');
      if (options.width) {
        tooltipContent.style.width = options.width;
      }
      if (options.height) {
        tooltipContent.style.height = options.height;
      }



      // 툴팁 위치 설정 (target 버튼의 아래쪽에 위치)
      const rect = target.getBoundingClientRect();
      tooltip.style.position = "absolute";
      tooltip.style.top = `${rect.bottom + window.scrollY}px`;
      //tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.left = `${rect.right + window.scrollX - tooltip.offsetWidth}px`;

      // 닫기 버튼 이벤트 추가
      const closeButton = tooltip.querySelector("#close-tooltip");
      closeButton.addEventListener("click", closeTooltip);
      closeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          closeTooltip();
      }
      });

      // ESC키로 닫기, 바깥 클릭 감지
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleOutsideClick);

      currentTooltip = { tooltip, target };

      // 툴팁 열리면 닫기 버튼으로 포커스 이동
      closeButton.focus();
  };

  /**
   * 툴팁 닫기
   */
  window.closeTooltip = function () {
      if (currentTooltip) {
      currentTooltip.tooltip.remove();
      currentTooltip.target.focus(); // 툴팁을 연 버튼으로 포커스 이동
      currentTooltip = null;
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      }
  };

  /**
   * ESC 키로 툴팁 닫기
   * @param {KeyboardEvent} event
   */
  function handleEscapeKey(event) {
      if (event.key === "Escape") {
      closeTooltip();
      }
  }

  /**
   * 툴팁 외부 클릭 감지
   * @param {MouseEvent} event
   */
  function handleOutsideClick(event) {
      if (
      currentTooltip &&
      !currentTooltip.tooltip.contains(event.target) &&
      !currentTooltip.target.contains(event.target)
      ) {
      closeTooltip();
      }
  }
  })();

