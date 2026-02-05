// ページの準備ができたら実行
document.addEventListener("DOMContentLoaded", () => {
  const FAVORITES_KEY = "favorites";

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };

  const saveFavorites = (items) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  };

  const renderFavorites = () => {
    const listEl = document.getElementById("favorite-list");
    const emptyEl = document.getElementById("favorite-empty");
    if (!listEl || !emptyEl) return;

    const favorites = loadFavorites();
    listEl.innerHTML = "";
    if (favorites.length === 0) {
      emptyEl.style.display = "block";
      return;
    }

    emptyEl.style.display = "none";
    favorites.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      listEl.appendChild(li);
    });
  };

  // どのページかは body の data-page 属性で指定
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    const activeLink = document.querySelector(
      `a[data-page-link="${currentPage}"]`,
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
      const favorites = loadFavorites();
      if (!favorites.includes(country)) {
        favorites.push(country);
        saveFavorites(favorites);
        alert(`${country} をお気に入りに追加しました！`);
      } else {
        alert(`${country} は既にお気に入りです。`);
      }
    });
  });

  if (currentPage === "favorites") {
    renderFavorites();
  }
});
