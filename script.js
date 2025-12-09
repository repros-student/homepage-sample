// ページの準備ができたら実行
document.addEventListener("DOMContentLoaded", () => {
  // どのページかは body の data-page 属性で指定
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    const activeLink = document.querySelector(
      `a[data-page-link="${currentPage}"]`
    );
    if (activeLink) {
      activeLink.classList.add("nav-link--active");
    }
  }

  // 「お気に入りに追加」ボタンの処理
  const favoriteButtons = document.querySelectorAll(".js-favorite");
  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const country = btn.dataset.country || "この場所";
      alert(`${country} をお気に入りに追加しました！`);
    });
  });
});
