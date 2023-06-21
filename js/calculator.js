const areaRangeInputNode = document.querySelector('.js-area-range__carousel');
const numberElementNode = document.querySelector('.js-area-range__number');
const priceElementNode = document.querySelector('.js-calculator-summary__price');
const plusBtn1Node = document.querySelector('.js-composition-counter__plus-btn1');
const minusBtn1Node = document.querySelector('.js-composition-counter__minus-btn1');
const numberElement1Node = document.querySelector('.js-composition-counter__number1');
const plusBtn2Node = document.querySelector('.js-composition-counter__plus-btn2');
const minusBtn2Node = document.querySelector('.js-composition-counter__minus-btn2');
const numberElement2Node = document.querySelector('.js-composition-counter__number2');
const plusBtn3Node = document.querySelector('.js-composition-counter__plus-btn3');
const minusBtn3Node = document.querySelector('.js-composition-counter__minus-btn3');
const numberElement3Node = document.querySelector('.js-composition-counter__number3');
const calculatorServicesNode = document.querySelectorAll('.calculator-service');
const optionCheckboxesNode = document.querySelectorAll('.calculator-service__option');

// Минимальное и максимальное значения для ползунка
areaRangeInputNode.min = 0;
areaRangeInputNode.max = 200;

areaRangeInputNode.addEventListener('input', updateValues);

function updateValues() {
  const area = parseInt(areaRangeInputNode.value);
  const pricePerSq = 1000;
  const totalPrice = area * pricePerSq;

  numberElementNode.textContent = area;

  priceElementNode.dataset.areaPrice = totalPrice;
  updateProjectPrice();
}

// Обработчики событий для кнопок плюс и минус
plusBtn1Node.addEventListener('click', incrementCounter.bind(null, numberElement1Node));
minusBtn1Node.addEventListener('click', decrementCounter.bind(null, numberElement1Node));

plusBtn2Node.addEventListener('click', incrementCounter.bind(null, numberElement2Node));
minusBtn2Node.addEventListener('click', decrementCounter.bind(null, numberElement2Node));

plusBtn3Node.addEventListener('click', incrementCounter.bind(null, numberElement3Node));
minusBtn3Node.addEventListener('click', decrementCounter.bind(null, numberElement3Node));

// Функция для плюса
function incrementCounter(element) {
  let currentValue = parseInt(element.textContent);
  currentValue += 1;
  element.textContent = currentValue;

  updateProjectPrice();
}

// Функция для минуса
function decrementCounter(element) {
  let currentValue = parseInt(element.textContent);
  if (currentValue > 0) {
    currentValue -= 1;
    element.textContent = currentValue;

    updateProjectPrice();
  }
}

// Обработчик события для каждого элемента списка
calculatorServicesNode.forEach(service => {
  const checkbox = service.querySelector('.calculator-service__checkbox');

  service.addEventListener('click', () => {
    // Добавление или удаление класса clicked у нужного элемента списка
    service.classList.toggle('clicked');

    // Показать или скрыть изображение в зависимости от наличия класса clicked
    checkbox.style.display = service.classList.contains('clicked') ? 'inline-block' : 'none';

    updateProjectPrice();
  });
});

// Начальное значение стоимости проекта
let projectPrice = 0;

// Функция для обновления стоимости проекта
function updateProjectPrice() {
  // Сумма от ползунка
  const areaPrice = parseInt(priceElementNode.dataset.areaPrice) || 0;

  // Сбрасываем стоимость проекта
  projectPrice = areaPrice;

  // Обходим все отмеченные чекбоксы опций услуг
  optionCheckboxesNode.forEach(checkbox => {
    if (checkbox.checked) {
      // Получаем цену опции услуги, связанной с чекбоксом
      const priceElement = checkbox.closest('.calculator-service-item').querySelector('.calculator-service__price');
      const price = parseInt(priceElement.textContent.replace(/\s+/g, ''));

      // Добавляем цену опции услуги к стоимости проекта
      projectPrice += price;
    }
  });

  // Обновляем отображение стоимости проекта
  priceElementNode.textContent = projectPrice.toLocaleString() + ' ₽';
}

// Добавляем обработчик события для каждого чекбокса опции услуги
optionCheckboxesNode.forEach(checkbox => {
  checkbox.addEventListener('change', updateProjectPrice);
});

// Добавляем обработчик события для каждого лейбла опции услуги
const optionLabels = document.querySelectorAll('.calculator-option');
optionLabels.forEach(label => {
  label.addEventListener('click', () => {
    const checkbox = label.previousElementSibling;
    checkbox.checked = !checkbox.checked;
    updateProjectPrice();
  });
});

