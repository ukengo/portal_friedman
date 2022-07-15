// работа с датами и временем

function formatDateDDdotMMdotYYYY(date) {
    return Utilities.formatDate(new Date(date), 'Europe/Kiev', 'dd.MM.yyyy')
}