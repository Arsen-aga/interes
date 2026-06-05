const filters = document.querySelectorAll(".filters");

if (filters.length >= 1) {
  filters.forEach((filter) => {
    const btns = filter.querySelectorAll(".filters-btn");
    const items = filter.querySelectorAll(".filters-item");

    btns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        btns.forEach((btn) => {
          btn.classList.remove("active");
        });
        btn.classList.add("active");

        const keyWord = e.currentTarget.dataset.filter;

        items.forEach((item) => {
          if (item.classList.contains(keyWord)) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      });
    });
  });
}
