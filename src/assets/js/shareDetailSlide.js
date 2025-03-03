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