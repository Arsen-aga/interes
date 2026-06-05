class Quiz {
  constructor(quiz) {
    this.quiz = quiz;
    this.steps = quiz.querySelectorAll(".step");
    this.nextStepBtn = quiz.querySelector("[data-next-step]");
    this.errorMessage = quiz.querySelector(".quiz-block__error-message");
    this.lastStep = quiz.querySelector(".last-step");
    this.wrapperSteps = quiz.querySelector(".quiz-block__steps");

    this.init();
  }

  init() {
    // Инициализация первого шага
    this.steps[0].classList.add("active");

    // Обработчик клика на варианты ответов
    this.setupStepHandlers();

    // Обработчик кнопки "Перейти на финальный шаг"
    this.setupNextStepButton();

    // Настройка обработчиков для range slider
    this.setupRangeSliderListeners();

    // Настройка обработчиков для файлов
    this.setupFileListeners();
  }

  setupStepHandlers() {
    // Обработчик для радио-кнопок
    this.quiz.querySelectorAll('.step__inp[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const step = this.findParentStep(e.target);
        this.markStepAsChecked(step);
      });
    });
  }

  setupRangeSliderListeners() {
    // Находим все range инпуты во втором шаге
    const rangeStep = this.steps[1];
    if (!rangeStep) return;
  

    const rangeInput = rangeStep.querySelector('input[name="quiz-2"]');
    if (!rangeInput) return;

    // Слушаем изменения в range инпуте
    rangeInput.addEventListener("input", () => {
      if (rangeInput.value && rangeInput.value.trim() !== "") {
        this.markStepAsChecked(rangeStep);
      }
    });

    // Также слушаем изменения через mousemove на noUiSlider (из вашего кода)
    const noUiHandle = rangeStep.querySelector(".noUi-handle");
    if (noUiHandle) {
      noUiHandle.addEventListener("mousemove", () => {
        if (rangeInput.value && rangeInput.value.trim() !== "") {
          this.markStepAsChecked(rangeStep);
        }
      });
      noUiHandle.addEventListener("touchstart", () => {
        if (rangeInput.value && rangeInput.value.trim() !== "") {
          this.markStepAsChecked(rangeStep);
        }
      });
      noUiHandle.addEventListener("touchmove", () => {
        if (rangeInput.value && rangeInput.value.trim() !== "") {
          this.markStepAsChecked(rangeStep);
        }
      });
      noUiHandle.addEventListener("touchend", () => {
        if (rangeInput.value && rangeInput.value.trim() !== "") {
          this.markStepAsChecked(rangeStep);
        }
      });
      noUiHandle.addEventListener("touchcancel", () => {
        if (rangeInput.value && rangeInput.value.trim() !== "") {
          this.markStepAsChecked(rangeStep);
        }
      });
    }
  }

  setupFileListeners() {
    const fileStep = this.steps[2];
    if (!fileStep) return;

    // Обработчик для загруженного файла
    const fileInput = fileStep.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
          // Снимаем выбор с радио "Нет" если пользователь загрузил файл
          const noRadio = fileStep.querySelector(
            'input[name="quiz-3"][value="Нет"]'
          );
          if (noRadio) {
            noRadio.checked = false;
          }

          this.markStepAsChecked(fileStep);
        }
      });
    }

    // Обработчик для радио "Нет"
    const noRadio = fileStep.querySelector('input[name="quiz-3"][value="Нет"]');
    if (noRadio) {
      noRadio.addEventListener("change", () => {
        // При выборе "Нет" очищаем файловый инпут
        if (fileInput) {
          fileInput.value = "";
          const fileNameElement = fileStep.querySelector(".file-name");
          if (fileNameElement) {
            fileNameElement.textContent = "Есть, отправить файл";
          }
        }
        this.markStepAsChecked(fileStep);
      });
    }
  }

  setupNextStepButton() {
    if (this.nextStepBtn) {
      this.nextStepBtn.addEventListener("click", () => {
        if (this.allStepsCompleted()) {
          // Все шаги пройдены - переходим к финальному шагу
          this.goToFinalStep();
        } else {
          // Не все шаги пройдены - показываем ошибку
          this.showError();
        }
      });
    }
  }

  markStepAsChecked(step) {
    // Проверяем, выбран ли вариант в текущем шаге
    if (this.isStepCompleted(step)) {
      // Добавляем класс checked текущему шагу (не удаляем у других)
      step.classList.add("checked");

      // Убираем ошибку если она была показана
      this.hideError();

      // Автоматически переходим к следующему шагу, если это не последний вопрос
      this.goToNextStep(step);
    }
  }

  isStepCompleted(step) {
    const stepNumber = parseInt(step.dataset.step);
    console.log('stepNumber', stepNumber)
    switch (stepNumber) {
      case 1: // Первый шаг - радио кнопки
        return step.querySelector('input[name="quiz-1"]:checked') !== null;

      case 2: // Второй шаг - range slider
        const rangeInput = step.querySelector('input[name="quiz-2"]');
        return (
          rangeInput &&
          rangeInput.value !== "" &&
          rangeInput.value.trim() !== ""
        );

      case 3: // Третий шаг - файл или "Нет"
        const fileInput = step.querySelector('input[type="file"]');
        const noRadio = step.querySelector(
          'input[name="quiz-3"][value="Нет"]:checked'
        );
        // Проверяем, что либо есть файл, либо выбрано "Нет", но не одновременно
        return (fileInput && fileInput.files.length > 0) || noRadio !== null;

      case 4: // Четвертый шаг - радио кнопки
        return step.querySelector('input[name="quiz-4"]:checked') !== null;

      case 5: // Пятый шаг - радио кнопки
        return step.querySelector('input[name="quiz-5"]:checked') !== null;

      default:
        return false;
    }
  }

  findParentStep(element) {
    let parent = element.parentElement;
    while (parent && !parent.classList.contains("step")) {
      parent = parent.parentElement;
    }
    return parent;
  }

  goToNextStep(currentStep) {
    const currentStepNumber = parseInt(currentStep.dataset.step);

    // Если это не последний вопрос, переходим к следующему
    if (currentStepNumber < 5) {
      // 5 - это последний вопрос (шаг с бюджетом)
      // Убираем активный класс с текущего шага
      currentStep.classList.remove("active");

      // Находим и активируем следующий шаг
      const nextStep = this.quiz.querySelector(
        `[data-step="${currentStepNumber + 1}"]`
      );
      if (nextStep) {
        nextStep.classList.add("active");
      }
    }
  }

  allStepsCompleted() {
    // Проверяем все шаги кроме последнего (финального)
    for (let i = 0; i < 5; i++) {
      // Первые 5 шагов (до финального)
      if (this.steps[i] && !this.isStepCompleted(this.steps[i])) {
        return false;
      }
    }
    return true;
  }

  goToFinalStep() {
    // Скрываем все обычные шаги
    this.steps.forEach((step) => {
      if (!step.classList.contains("last-step")) {
        step.classList.remove("active");
        // Оставляем класс checked на всех пройденных шагах
      }
    });

    // Показываем финальный шаг
    if (this.lastStep) {
      this.lastStep.classList.add("active");
      this.wrapperSteps.classList.add("hidden");
      // Прокручиваем к финальному шагу
      this.quiz.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  showError() {
    if (this.errorMessage) {
      this.errorMessage.classList.add("active");

      // Автоматически скрываем ошибку через 3 секунды
      setTimeout(() => {
        this.hideError();
      }, 3000);
    }
  }

  hideError() {
    if (this.errorMessage) {
      this.errorMessage.classList.remove("active");
    }
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const quizBlocks = document.querySelectorAll(".quiz");
  if (quizBlocks.length) {
    quizBlocks.forEach((quiz) => new Quiz(quiz));
  }
});
// Инициализация квизов

// Ваш существующий код для range slider (оставляем как есть)
const rangeSliders = document.querySelectorAll(".range-slider");
if (rangeSliders.length > 0) {
  rangeSliders.forEach((rangeSlider) => {
    const min = Number(rangeSlider.dataset.rangeMin);
    const max = Number(rangeSlider.dataset.rangeMax);
    const average = (max + min) / 2;
    noUiSlider.create(rangeSlider, {
      start: [average],
      connect: [true, false],
      range: {
        min: [min],
        max: [max],
      },
    });

    const optionsBlock =
      rangeSlider.parentElement.querySelector(".range-option");
    rangeSlider.noUiSlider.on("update", function (values, handle) {
      optionsBlock.innerHTML = parseInt(values[handle]);
    });
  });
}

const getRangeOptions = document.querySelectorAll(".range-option");
if (getRangeOptions) {
  getRangeOptions.forEach((getRangeOption) => {
    const firstValue = getRangeOption.textContent;
    const input = getRangeOption
      .closest(".step__variant-wrapper")
      .querySelector("input");
    if (input) {
      input.value = firstValue;
      const noUiHandle = document.querySelectorAll(".step__variant-range");
      noUiHandle.forEach((handle) =>
        handle.addEventListener("mousemove", () =>
          changeInput(getRangeOption, firstValue, input)
        )
      );
    }
  });

  function changeInput(range, firstValue, input) {
    const value = range.textContent;
    if (value !== firstValue) {
      input.value = value;
      // Триггерим событие input для квиза
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
}

// Ваш существующий код для загрузки файла (оставляем как есть)
document.querySelectorAll(".form__file")?.forEach(function (form) {
  const fileInput = form.querySelector(".file");
  const fileNameElement = form.querySelector(".file-name");

  if (fileInput && fileNameElement) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      fileNameElement.textContent = file.name;
    });
  }
});
