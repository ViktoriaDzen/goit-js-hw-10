// import ... from './js/menu.js';
import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

// form.addEventListener('input', event => {});

function makeOrder(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function addOrderRow(drink) {
  const li = document.createElement('li');
  li.className = 'row-pending';
  li.textContent = `${drink} у роботі…`;
  orderLog.append(li);
  return li;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const drink = formData.get('drink');
  const state = formData.get('state');
  const delay = PREP_TIME[drink];
  const shouldResolve = state === 'fulfilled';
  const row = addOrderRow(drink);
  makeOrder(delay, shouldResolve)
    .then(result => {
      row.className = 'row-ok';
      row.textContent = `${drink} — готово за ${result} ms`;
    })
    .catch(result => {
      // відмова: змінити клас і текст row
      row.className = 'row-err';
      row.textContent = `${drink} — скасовано через ${result} ms`;
    })
    .finally(() => {
      // дописати час завершення

      row.textContent += ` · ${new Date().toLocaleTimeString('uk-UA')}`;
    });
});
// Оброби відправлення форми

// Додай обробник події submit на форму.

// Скасуй стандартне перезавантаження сторінки.
// Прочитай drink і state через FormData.
// Знайди час приготування напою в імпортованому меню.
// Визнач, чи має Promise виконатися успішно, з огляду на вибраний стан.
// Додай рядок до журналу та збережи посилання на нього.
// Запусти makeOrder і опрацюй обидва результати Promise.

// Змінні з напоєм, затримкою та рядком зберігай у межах цього відправлення.
// Тоді кожне замовлення матиме власні дані, навіть якщо кілька напоїв готуються одночасно.
