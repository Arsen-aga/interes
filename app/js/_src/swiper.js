class WheelInSwiper {
  constructor(element, swiperOption) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.swiperOption = swiperOption;
    this.swiper;
    this.wheelTimeout;

    this.initWheelSwiper();
  }

  get currentSlide() {
    return this.swiper ? this.swiper.activeIndex : null;
  }

  get getSwiper() {
    return this.swiper;
  }

  initWheelSwiper() {
    if (!this.element) return;
    this.swiper = new Swiper(this.element, this.swiperOption);
    this.handleWheel();
  }

  handleWheel() {
    this.element.addEventListener(
      "wheel", (e) => {
        e.preventDefault();

        clearTimeout(this.wheelTimeout);
        this.wheelTimeout = setTimeout(() => {
          const treshhold = 3;

          // работает по вертикали и по горизонтали
          const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

          if (delta > treshhold) {
            this.swiper.slideNext();
          } else if (delta < -treshhold) {
            this.swiper.slidePrev();
          }
        }, 50);
      },
      { passive: false }
    );
  }
}
/*
new WheelInSwiper(".dream-interiors__swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  initialSlide: 1,
  centeredSlides: true,
  autoplay: {
    delay: 1500,
  },
  speed: 1000,
  autoplay: {
    delay: 1500,
    pauseOnMouseEnter: true,
  },
  speed: 1000,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    // Добавляем обработчик drag для скроллбара
    dragClass: "swiper-scrollbar-drag",
    hide: false,
    snapOnRelease: true,
  },
  // Включаем навигацию для тачпада
  touchEventsTarget: "container",
});
new WheelInSwiper(".fixed-cost__swiper", {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 20,
  speed: 1000,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    // Добавляем обработчик drag для скроллбара
    dragClass: "swiper-scrollbar-drag",
    hide: false,
    snapOnRelease: true,
  },
  touchEventsTarget: "container",
  breakpoints: {
    991.8: {
      initialSlide: 1,
    },
  },
});
new WheelInSwiper(".interior__swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 1000,
  navigation: {
    nextEl: ".interior__next",
    prevEl: ".interior__prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Включаем навигацию для тачпада
  touchEventsTarget: "container",
});
new WheelInSwiper(".package-documentation__swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 1000,
  // Включаем навигацию для тачпада
  touchEventsTarget: "container",
});
new WheelInSwiper(".fixing__swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 10,
  autoplay: {
    delay: 3000,
  },
  speed: 1000,
  navigation: {
    nextEl: ".fixing__next",
    prevEl: ".fixing__prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Включаем навигацию для тачпада
  touchEventsTarget: "container",
  breakpoints: {
    991.8: {
      spaceBetween: 20,
      slidesPerView: "auto",
    },
    575.98: {
      slidesPerView: 15,
      slidesPerView: "auto",
      loop: false,
      autoplay: false,
    },
  },
});
new WheelInSwiper(".team__swiper", {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 15,
  initialSlide: 1,
  centeredSlides: true,
  speed: 1000,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    // Добавляем обработчик drag для скроллбара
    dragClass: "swiper-scrollbar-drag",
    hide: false,
    snapOnRelease: true,
  },
  // Включаем навигацию для тачпада
  touchEventsTarget: "container",
  breakpoints: {
    991.8: {
      spaceBetween: 20,
      slidesPerView: "auto",
    },
  },
});
*/

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector(".reviews__swiper")) {
    new WheelInSwiper(".reviews__swiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 15,
      speed: 1000,
      touchEventsTarget: "container",
      navigation: {
        nextEl: ".reviews__filters .reviews__next",
        prevEl: ".reviews__filters .reviews__prev",
      },
      breakpoints: {
        575.98: {
          slidesPerView: 2,
        },
        991.8: {
          slidesPerView: 3,
        },
      },
    })
  }

  const allBrandedSalonsItems = document.querySelectorAll(".branded-salons__item");

  if (allBrandedSalonsItems.length) {
    allBrandedSalonsItems.forEach(wrapper => {
      const thumb = wrapper.querySelector('.branded-salons__thumbswiper')
      const swiper = wrapper.querySelector('.branded-salons__swiper')
      const brandedSalonsThumbSwiper = new WheelInSwiper(thumb, {
        spaceBetween: 8,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
          767.98: {
            slidesPerView: 7,
          },
        },
      });
      new WheelInSwiper(swiper, {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: brandedSalonsThumbSwiper.getSwiper,
        },
      });
    })
  }
  if (document.querySelector(".favorites__swiper")) {

    new WheelInSwiper(".favorites__swiper", {
      loop: false,
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 1000,
      touchEventsTarget: "container",
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  }
  const favoriteSwipers = document.querySelectorAll(".favorites__swiper-images")

  if (favoriteSwipers && favoriteSwipers.length) {
    favoriteSwipers.forEach(favoriteSwiper => {
      new Swiper(favoriteSwiper, {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        touchEventsTarget: "container",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      })
    })
  }

})