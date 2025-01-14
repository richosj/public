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

  // 임시 공유서비스 상세 공통 스크립트
  var calendarEl = document.getElementById("calendar");
  if (calendarEl) {
    // 선택 불가능한 날짜 목록
    const disabledDates = ["2025-01-10", "2025-01-15", "2025-01-20"];
    const disabledDates2 = ["2025-01-21"];

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      locale: "ko",
      initialDate: "2025-01-01",
      selectable: true, // 날짜 선택 가능
      showNonCurrentDates: false,
      height: "auto",
      dayCellClassNames: function (date) {
        // 특정 날짜에 클래스 추가
        const inDate = new Date(
          date.date.getTime() - date.date.getTimezoneOffset() * 60000
        );
        const dateStrs = inDate.toISOString().split("T")[0];
        
        if (disabledDates2.includes(dateStrs)) {
          return ['abled-date']; // 클래스 추가
        }
        return [];
      },
      dateClick: function (info) {
        // 기존 클래스 제거
        document.querySelectorAll('.selected-date').forEach((el) => {
          el.classList.remove('selected-date');
        });
  
        // 선택된 날짜에 클래스 추가
        info.dayEl.classList.add('selected-date');
      },
      dayCellContent: function (info) {
        const dateNumber = info.date.getDate(); // 날짜 숫자만 가져오기
        return { html: `<span>${dateNumber}</span>` }; // 숫자만 렌더링

      },
      dayCellDidMount: function (info) {
        const localDate = new Date(
          info.date.getTime() - info.date.getTimezoneOffset() * 60000
        );
        const dateStr = localDate.toISOString().split("T")[0];
        // 선택 불가능한 날짜 스타일 적용
        if (disabledDates.includes(dateStr)) {
          const cell = info.el;
          cell.classList.add("disabled-date"); // 클래스 추가
        }
        // 오늘 날짜 표시
        const today = new Date().toISOString().slice(0, 10);
        if (dateStr === today) {
          info.el.classList.add("fc-today");
        }
        
        
      },
    });

    calendar.render();
  }

  const splideEl = document.querySelector(".splide");
  if (splideEl) {
    var splide = new Splide(".splide", {
      i18n: {
        prev: "이전 슬라이드",
        next: "다음 슬라이드",
        first: "첫 번째 슬라이드로 이동",
        last: "마지막 슬라이드로 이동",
        slideX: "%s번 슬라이드로 이동",
        pageX: "%s번 페이지로 이동",
        play: "자동 재생 시작",
        pause: "자동 재생 일시정지",
      },
      padding: 0,
      gap: "0px",
      type: "slide",
      autoplay: true,
      pagination: false,
      arrows: true,
      slideFocus: true, // 비활성 슬라이드에 있는 링크도 포커스 가능하게 만듦
      focusableNodes: "a, button", // 포커스 가능한 노드를 a, button으로 제한
      pauseOnHover: false,
      pauseOnFocus: false,
    });

    const totalSlidesElement = document.getElementById("total-slides");
    const currentSlideElement = document.getElementById("current-slide");
    splide.on("mounted", function () {
      const totalSlides = splide.length; // mounted 이후에 슬라이드 개수 가져오기
      totalSlidesElement.textContent = totalSlides; // 총 슬라이드 개수 표시
      currentSlideElement.textContent = splide.index + 1; // 초기 슬라이드 인덱스
    });

    splide.on("move", function (newIndex) {
      currentSlideElement.textContent = newIndex + 1; // 슬라이드 변경 시 인덱스 업데이트
    });

    const playPauseButton = document.querySelector(".play-pause");
    let isPlaying = true;

    playPauseButton.addEventListener("click", () => {
      if (isPlaying) {
        splide.Components.Autoplay.pause();
        playPauseButton.textContent = "재생";
        //playPauseButton.setAttribute('aria-label', '자동 재생 시작');
      } else {
        splide.Components.Autoplay.play();
        playPauseButton.textContent = "일시정지";
        //playPauseButton.setAttribute('aria-label', '재생 일시정지');
      }
      isPlaying = !isPlaying;
    });
    splide.mount();
  }
});
