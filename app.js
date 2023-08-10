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
