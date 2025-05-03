// работа с датами и временем

function formatDateDDdotMMdotYYYY(date) {
  return Utilities.formatDate(new Date(date), 'Europe/Kiev', 'dd.MM.yyyy')
}

function formatDateYYYYdotMMdotDD(date) {
  return Utilities.formatDate(new Date(date), 'Europe/Kiev', 'yyyy.MM.dd')
}

//генерация случайного числа
function getRandom() {
  return Math.round(Math.random() * 132)
}

// генерація випадкового числа довгого
const cripto = () => Math.random() * (1000000000000 - 10000) + 10000;

// пошук номера строки указаної ячейки 
function cellIndex(spredSheet, key) {
  const dataArr = spredSheet.getRange('A1:A').getValues();
  return dataArr.flat().indexOf(key) + 1;
}

//Обрізає пробіли в заданій колонці таблиці та вставляє очищені дані назад
function trimColumn(sheet, columnNumber) {

  // Отримуємо всі дані з вказаної колонки (крім заголовка)
  const range = sheet.getRange(2, columnNumber, sheet.getLastRow() - 1, 1);
  const values = range.getValues();

  // Обрізаємо пробіли для кожного значення
  const trimmedValues = values.map(row => [String(row[0]).trim()]);

  // Вставляємо очищені дані назад у колонку
  range.setValues(trimmedValues);
}

