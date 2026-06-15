class RangeSlider {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.slider = wrapper.querySelector('.range-slider');
    this.min = Number(this.slider.dataset.rangeMin);
    this.max = Number(this.slider.dataset.rangeMax);
    this.inputs = wrapper.querySelectorAll(".range-option");
    
    this.init();
  }

  // Форматирование числа с пробелом для тысяч
  formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  
  // Обратное преобразование (удаляем пробелы)
  parseNumber(value) {
    return parseInt(value.toString().replace(/\s/g, '')) || 0;
  }

  // Валидация значения
  validateValue(value, index) {
    let validatedValue = value;
    
    if (isNaN(validatedValue)) {
      validatedValue = index === 0 ? this.min : this.max;
    }

    const otherValue = this.parseNumber(this.inputs[index === 0 ? 1 : 0].value);
    
    if (index === 0) {
      validatedValue = Math.min(validatedValue, otherValue);
    }
    if (index === 1) {
      validatedValue = Math.max(validatedValue, otherValue);
    }
    
    return Math.min(this.max, Math.max(this.min, validatedValue));
  }

  // Запрет ввода нецифровых символов
  handleKeyDown(event) {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];
    
    // Запрещаем пробел
    if (event.key === ' ' || event.key === 'Space') {
      event.preventDefault();
      return;
    }
    
    // Разрешаем только цифры и специальные клавиши
    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  // Очистка от нецифровых символов при вводе
  handleInput(event) {
    const input = event.target;
    let rawValue = input.value.replace(/\D/g, '');
    
    if (rawValue !== input.value) {
      input.value = rawValue;
    }
  }

  // Обработка изменения значения в инпуте
  handleChange(event, index) {
    const input = event.target;
    let value = this.parseNumber(input.value);
    value = this.validateValue(value, index);
    
    input.value = this.formatNumber(value);
    
    const newValues = [
      this.parseNumber(this.inputs[0].value),
      this.parseNumber(this.inputs[1].value)
    ];
    this.slider.noUiSlider.set(newValues);
  }

  // Инициализация слайдера
  initSlider() {
    noUiSlider.create(this.slider, {
      start: [this.min, this.max],
      connect: true,
      range: {
        'min': this.min,
        'max': this.max,
      },
    });
  }

  // Инициализация обработчиков событий
  initEventListeners() {
    this.slider.noUiSlider.on("update", (values, handle) => {
      this.inputs[handle].value = this.formatNumber(parseInt(values[handle]));
    });

    this.inputs.forEach((input, idx) => {
      input.addEventListener("keydown", (e) => this.handleKeyDown(e));
      input.addEventListener("input", (e) => this.handleInput(e));
      input.addEventListener("change", (e) => this.handleChange(e, idx));
    });
  }

  // Основной метод инициализации
  init() {
    this.initSlider();
    this.initEventListeners();
  }
}

// Инициализация всех слайдеров на странице
document.addEventListener("DOMContentLoaded", () => {
  const rangeWrappers = document.querySelectorAll(".range-wrapper");
  rangeWrappers.forEach((wrapper) => new RangeSlider(wrapper));
});