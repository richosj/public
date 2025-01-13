export function initLNB(containerSelector = ".lnb") {
  const container = document.querySelector(containerSelector);

  if (!container) {
      console.error("LNB 컨테이너를 찾을 수 없습니다.");
      return;
  }

  const lnbLinks = container.querySelectorAll(".lnb-link, .lnb-sublink");

  lnbLinks.forEach((link) => {
      const parentItem = link.parentElement;
      const submenu = parentItem.querySelector("ul");

      if (submenu) {
          // 하위 메뉴가 있는 경우: 링크 비활성화 및 토글 이벤트 처리
          link.addEventListener("click", (e) => {
              e.preventDefault(); // 링크 동작 방지
              toggleMenu(link, submenu, container);
          });
      } else {
          // 하위 메뉴가 없는 경우: 링크 동작 유지
          link.addEventListener("click", () => {
              console.log(`${link.textContent.trim()}로 이동합니다.`);
          });
      }
  });
}

// 메뉴 열고 닫기
function toggleMenu(link, submenu, container) {
  const parentItem = link.parentElement;

  // 하위 메뉴 토글
  submenu.classList.toggle("open");

  // 같은 레벨의 형제 메뉴 닫기
  const siblingItems = [...parentItem.parentElement.children].filter(
      (item) => item !== parentItem
  );

  siblingItems.forEach((item) => {
      const siblingSubmenu = item.querySelector("ul");
      if (siblingSubmenu) siblingSubmenu.classList.remove("open");
  });

  // 상위 메뉴의 모든 하위 메뉴 닫기 (선택 사항)
  if (!submenu.classList.contains("open")) {
      const allDescendants = submenu.querySelectorAll("ul");
      allDescendants.forEach((descendant) => descendant.classList.remove("open"));
  }
}
