const burgerBtns = document.querySelectorAll(".burger");
const popup = document.querySelector(".popup-menu");
const body = document.querySelector("body");

if (popup) {
  burgerBtns.forEach((btn) => btn.addEventListener("click", togglePopup));
  function togglePopup() {
    popup.classList.toggle("active");
    body.classList.toggle("no-scroll");
    allBurgersClose();
  }

  function allBurgersClose() {
    burgerBtns.forEach((btn) => btn.classList.toggle("active"));
  }
}
