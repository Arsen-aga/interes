class Accordion {
  constructor(accordion) {
    this.accordion = accordion;
    this.accordionsItems = accordion.querySelectorAll(".accordion-item");
    this.accordionsHeaders = accordion.querySelectorAll(".accordion-header");
    this.isOpenOne = accordion.classList.contains('open-one-at-time')

    this.init()
  }

  init() {
    this.handleAccordion()
  }

  handleAccordion() {
    if (!this.accordionsHeaders.length) return;
    this.accordionsHeaders.forEach(header => header.addEventListener("click", () => this.handleClick(header)))
  }

  handleClick(header) {
    const content = header.closest(".accordion-item");
    const isActive = content.classList.contains("active");

    if (this.isOpenOne) content.classList.toggle("active");
    else {
      this.hiddenAllItems();
      if (!isActive) content.classList.add("active");
    }
  }

  hiddenAllItems() {
    this.accordionsItems.forEach(item => item.classList.remove("active"))
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => new Accordion(accordion));
});
