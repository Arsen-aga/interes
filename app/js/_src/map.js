// map
function lazyLoadMap() {
  // Проверяем, есть ли элемент с id "map" на странице
  var mapElement = document.getElementById("map");
  if (mapElement) {
    // Создаем экземпляр Intersection Observer
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Когда элемент видим на экране, загружаем API Яндекс карты асинхронно
          var script = document.createElement("script");
          script.src =
            "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=0333b546-e4cd-4422-b583-f1193f0144a4&_v=20240321151130";
          script.async = true;
          script.onload = function () {
            // Когда скрипт загружен, вызываем функцию инициализации карты
            ymaps.ready(initializeMap);
          };
          document.body.appendChild(script);
          // Отключаем наблюдение за элементом, чтобы не загружать карту повторно при последующих доскроллах
          observer.unobserve(mapElement);
        }
      });
    });

    // Начинаем наблюдение за элементом
    observer.observe(mapElement);
  }
}

function initializeMap() {
  var mapElement = document.getElementById("map");
  ymaps.ready(function () {
    var myMap = new ymaps.Map(
      mapElement,
      {
        center: [56.842995, 60.698799],
        zoom: 18,
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

    var destinations = {
      "Интерес. г. Екатеринбург, ул. Высоцкого, 50 ТК \"КОР\"": [56.842995, 60.698799],
    };

    var myPlacemark = new ymaps.Placemark(
      destinations["Интерес. г. Екатеринбург, ул. Высоцкого, 50 ТК \"КОР\""],
      {
        hintContent: "Офис",
        balloonContent: "Интерес. г. Екатеринбург, ул. Высоцкого, 50 ТК \"КОР\"",
      },
      {
        iconLayout: "default#image",
        iconImageSize: [30, 35],
        iconImageOffset: [-5, -38],
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable("scrollZoom");

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      myMap.behaviors.disable("drag");
    }
  });
  // Ваш код инициализации карты здесь
}

document.addEventListener("DOMContentLoaded", lazyLoadMap);


