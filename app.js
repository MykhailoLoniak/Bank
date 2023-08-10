// Вибір елементів з DOM
const htmlElement = document.querySelector('#curs'); // Отримання елементу списку курсів валют
const filter = document.querySelector('#filter'); // Отримання елементу фільтру для валют
let CURS = []; // Змінна для зберігання курсів валют

// Додавання слухача події input для фільтрування курсів
filter.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase(); // Отримання введеного значення і перетворення в нижній регістр
  const filteredCash = CURS.filter(
    (curs) => curs.txt.toLowerCase().includes(value) // Фільтрація курсів валют за введеним значенням
  );

  render(filteredCash); // Відображення відфільтрованих курсів
});

// Асинхронна функція для отримання курсів валют з API
async function appCurs() {
  const response = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  );
  const cash = await response.json(); // Отримання даних відповіді у форматі JSON
  CURS = cash; // Збереження отриманих курсів валют
  render(cash); // Відображення всіх курсів
}

// Відображення курсів валют у списку
function render(params) {
  const html = params.map(tohtml).join(''); // Генерація HTML для кожного курсу та об'єднання їх
  htmlElement.innerHTML = html; // Вставка згенерованого HTML у список
}

// Генерація HTML для кожного курсу валюти
function tohtml(props) {
  return `
  <li class='btm'>${props.txt}: ${props.rate}</li>
  `;
}

appCurs(); // Запуск функції для отримання та відображення курсів

// Обробник події при виборі валюти зі списку
htmlElement.onclick = (event) => {
  const key = event.target.textContent;

  if (!event.target.classList.contains('btm')) return;
  if (selectedCourse.includes(key)) return;

  selectedCourse.push(key); // Додавання обраної валюти до списку вибраних
  console.log(selectedCourse);
  calcRender(); // Оновлення відображення інпутів з вибраними валютами
};

// Генерація HTML для відображення інпутів з вибраними валютами
function calcRender() {
  let html = selectedCourse.map((i, index) => calcHtml(i, index)); // Генерація HTML для кожного інпуту
  document.querySelector('.content').innerHTML = html.join(''); // Вставка згенерованого HTML у відповідний контейнер
}

// Обробник події при введенні суми у інпут
function handleInputChange(event) {
  const newValue = parseFloat(event.target.value) || 0;
  const selectedCurrencyRate =
    parseFloat(event.target.getAttribute('data-rate')) || 1;

  // Оновлення значень інших інпутів згідно з курсами валют
  document.querySelectorAll('input[type="text"]').forEach((inputElement) => {
    if (inputElement !== event.target) {
      const otherCurrencyRate =
        parseFloat(inputElement.getAttribute('data-rate')) || 1;
      const equivalentValue =
        (newValue * otherCurrencyRate) / selectedCurrencyRate;
      inputElement.value = equivalentValue.toFixed(2);
    }
  });
}
