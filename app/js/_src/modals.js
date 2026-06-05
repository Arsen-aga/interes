// Изменение времени в модальном окне, по нажатию на табы

const timeToggle = document.querySelectorAll(".time-check input");
const timeInput = document.querySelector(".time-input");

if (timeToggle.length && timeInput) {
  timeToggle.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (btn.value === "По времени" && btn.checked) {
        timeInput.disabled = false;
      } else {
        timeInput.disabled = true;
        timeInput.value = "";
      }
    });
  });
}

// Изменение заголовка и инпут from в попапе, по нажатию на кнопку в item

const btns = document.querySelectorAll(".change-popup");
btns?.forEach((btn) => {
  btn.addEventListener("click", function () {
    const id = btn.href.split("#")[1];
    const modal = document.getElementById(id);
    const modalFrom = modal.querySelector('[name="from"]');
    const modalYa = modal.querySelector('[name="yaCounter"]');
    const modalTitle = modal.querySelector("h2");

    const startCalcText = "Получите прайс-лист + расчет сметы";

    if (btn.classList.contains("price")) {
      const item = btn.closest(".change-popup-item");
      const changeTitle = item.querySelector(".change-popup-title").textContent;
      modalYa.value = "catalog";
      modalFrom.value = `${startCalcText} (${changeTitle
        .trim()
        .toLowerCase()})`;
      modalTitle.textContent = `${startCalcText} (${changeTitle
        .trim()
        .toLowerCase()})`;

      return;
    }

    modalFrom.textContent = "Получите консультацию";
    modalFrom.value = "Получите консультацию";
    modalYa.value = "consult";
  });
});
