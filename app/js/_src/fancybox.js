Fancybox.bind("[data-fancybox]", {});

// скрипт открытия модалки перед закрытием вкладки
function isExistInLocalStorage(selector) {
  return !localStorage.getItem(selector);
}

function handleMouseLeave(event) {
  if (event.clientY < 0) {
    Fancybox.show([{ src: "#to-exit", type: "inline" }]);
    localStorage.setItem("modalShown", "true");
    document.removeEventListener("mouseleave", handleMouseLeave);
  }
}

if (document.querySelector("#to-exit")) {
  if (isExistInLocalStorage("modalShown"))
    document.addEventListener("mouseleave", (event) => handleMouseLeave(event));
}

// скрипт открытия изображения по нажатию на кнопку
const openModalImgBtns = document.querySelectorAll("[data-open-img]");
if (openModalImgBtns.length)
  openModalImgBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => initModalImg(e))
  );
function initModalImg(event) {
  event.preventDefault();
  openModalImg(event);
}

function getPathImg(event) {
  return event.currentTarget.dataset.openImg;
}

function openModalImg(event) {
  Fancybox.show([{ src: getPathImg(event), type: "image" }]);
}

// открытие модалок со слайдером
const openModalSwiperBtns = document.querySelectorAll("[data-fancybox-custom]");
if (openModalSwiperBtns.length)
  openModalSwiperBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => initModalWitchSwiper(e))
  );

function initModalWitchSwiper(event) {
  event.preventDefault();
  const modal = getModal(event);
  if (!modal) return;
  initFancyboxModal(modal);
  if (modal.querySelector(".swiper")) initModalSwiper();
}

function getModal(event) {
  const modalId = event.currentTarget.dataset.fancyboxCustom;
  return document.querySelector(`#${modalId}`);
}

function initModalSwiper() {
  new Swiper(".dream-interiors-popup__swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: {
      enabled: true,
      eventsTarget: ".dream-interiors-popup__swiper", // или 'container'
      forceToAxis: true, // только горизонтальная прокрутка
    },
    // Включаем навигацию для тачпада
    touchEventsTarget: "container",
  });
}

function initFancyboxModal(modal) {
  Fancybox.show([{ src: modal, type: "inline" }], {
    // Основная настройка от drag
    dragToClose: false,

    // Дополнительные настройки для полного отключения drag
    Panzoom: {
      touchAction: "auto", // Отключает обработку касаний для перемещения
    },

    // Можно добавить другие полезные настройки
    Toolbar: false, // Скрыть тулбар
    Thumbs: false, // Скрыть миниатюры если есть
    infinite: false, // Запретить бесконечную прокрутку
  });
}

// открытие пдф файлов/документов в модалке
const openBtnsToFiles = document.querySelectorAll("[data-url-to-docs]");
if (openBtnsToFiles.length)
  openBtnsToFiles.forEach((btn) =>
    btn.addEventListener("click", (e) => openFilesInModal(e))
  );

function openFilesInModal(event) {
  event.preventDefault();
  const docsUrl = getDocsUrls(event);
  if (docsUrl.length === 0) return;

  // Создаем массив для Fancybox
  const fancyboxItems = docsUrl.map(url => getDocsObjects(url));

  // Открываем Fancybox
  initFancyboxDocs(fancyboxItems);
}
function getDocsUrls(event) {
  const urlsString = event.currentTarget.dataset.urlToDocs;
  return urlsString.split("; ");
}
function getDocsObjects(url) {
  const extension = getFileType(url);
  const isDocument = isDocumentFile(extension);
  return getObjectFile(url, isDocument);
}
function getFileType(url) {
  return url.split(".").pop().toLowerCase();
}
function isDocumentFile(extension) {
  return ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(
    extension
  );
}
function getObjectFile(url, isDocument) {
  return {
    src: url,
    type: isDocument ? "iframe" : "image", // для документов используем iframe
  };
}
function initFancyboxDocs(fancyboxItems) {
  console.log("fancyboxItems", fancyboxItems);
  Fancybox.show(fancyboxItems, {
    // Основные настройки
    closeButton: "outside",
    Iframe: {
      css: {
        width: "90vw",
        height: "90vh",
        maxWidth: "1000px",
        maxHeight: "700px",
      },
      attributes: {
        scrolling: "auto",
        allowfullscreen: true,
      },
    },

    // Настройки для документов
    Toolbar: {
      display: {
        middle: [],
        right: ["close", "download", "thumbs"], // кнопки
      },
    },
  });
}