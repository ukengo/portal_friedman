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