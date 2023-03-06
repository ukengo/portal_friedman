///02.06.2022+++
function buhgalterTable() {
  // копі із Управление ИА СЧЕТА в РУ+
  //dataUpravlIA
  const valueBuh = ssBuhSheet().getRange(2, 1, getLastRow() - 1, 6).getValues()
  const valueBuhMap = valueBuh.map(x => [x[0], x[1], x[2], x[3], x[5]])

  const valueBuhFalse = valueBuhMap.filter(x => x[4] === false).filter(x => x[0] != '')

  if (valueBuhFalse != '') {
    if (valueBuhFalse.map(x => [x[0], x[1], x[2], x[3]].indexOf('')) > 0) {
      Browser.msgBox('Не всі поля заповнені')
    } else {
      const arr = valueBuhFalse.map(x => [x[0], x[3], numSearh(x[2]), '', x[2], '', new Date().getTime() * getRandom()]);
      const arrPortal = valueBuhFalse.map(x => [x[0], x[1], x[2], x[3]])

      const sheetFinance = dataFinance()//SSREESTR.getSheetByName('Финансы')

      sheetFinance.insertRowsAfter(99, arr.length)
      sheetFinance.getRange(100, 1, arr.length, 7).setValues(arr)


      /*       // замена квери
            const valueA2 = sheetFinance.getRange('A2').getValue(); //получаем значение проекта в А2
            const valueA100G = sheetFinance.getRange('A100:G').getValues(); //получаем значения всего списка проектов из проекта в A100:G
            const filtere = valueA100G.filter((row) => row[0] == valueA2); //отбираем все записи, соответствующие А2
            sheetFinance.getRange(4, 1, 90, 7).clear(); //удаляем данные из lbfgfpjyf, куда будем записывать результаты отбора
      
            if (filtere != 0) {               //если в результате отбора есть данные, то 
              sheetFinance.getRange(4, 1, filtere.length, filtere[0].length).setValues(filtere); //заполняем диапазон
              if (sheetFinance == 'Финансы') {     //если таблица Финансы,
                let sum = filtere.reduce((accumulator, currentValue) => accumulator + (+currentValue[1]), 0);
                sheetFinance.getRange(filtere.length + 4, 1).setValue('Итого');
                sheetFinance.getRange(filtere.length + 4, 2).setValue(sum);     //то формируем сумму
              }
            } */

      //ставим галочки
      const valueBuh5 = valueBuh.map(x => [x[5] = true])
      ssBuhSheet().getRange(2, 6, valueBuh5.length, 1).setValues(valueBuh5)

      //для бота
      const sheetBot = SpreadsheetApp.openById('1dY62dP8R3iTwyoNLvEeEJn5thoC-56Pb4ZNtZJsHGu4')
        .getSheetByName('bot')
      const valueBot = sheetBot.getRange(13, 1).getDisplayValue()
      readLastRow(valueBot)
      console.log('Виконано')
      return arrPortal
    }
  } else {
    //readLastRow('Нет данных')
    return
  }
}

function numSearh(numSf) {
  if (numSf.includes('РФ') || numSf.includes('РМ')) {
    return 'фоп'
  } else {
    return 'тов'
  }
}
/* function numSearh(numSf) {
  console.log("numSf "+numSf);
  const regex = /([А-Я]+)/; //регулярное выражение для получения букв по номеру счета
  let res = numSf.match(regex)[0];//получаем буквы по номеру счета
  console.log('res ' +res);
  
  if (res == 'РФ' || res == 'РМ') {
    return 'фоп'
  } else if (res == 'СФ') {
    return 'тов'
  } else {
    return ''
  }
} */

/*В
Задача: найти номер последней заполненной строки в диаппазоне
помогает, если на листе в другой ячейке есть формула arrayformula, из за которой getLastRow находит последнюю строку таблицы, считая пустые строки arrayformula заполненными
*/
function getLastRow() {
  const dataValues = ssBuhSheet().getRange("A1:A").getValues()
  const dataLength = dataValues.length
  for (var i = dataLength - 1; i >= 0; i--) {
    if (dataValues[i][0] !== "") {
      const lastRowInData = i - 1
      break;
    }
  }
  return i + 1
}

// бот для отправки в телеграм после внесения данных с Ирины в Управление
function readLastRow(mesage) {

  //var botId = '970219148:AAFr7rOe8ScRrEVzKKMReKIYzrejRzYSbmQ'; // тут должен быть ID бота
  var botId = '1429466119:AAG58O0k-4amhUK3yJsDU7bD5rWPj5iPEBw'; // тут должен быть ID бота
  var chatID = '374805417'; // ID группа в которую отправляется сообщение
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // wait 30 seconds for others' use of the code section and lock to stop and then proceed

  } catch (e) {
    Logger.log('Could not obtain lock after 30 seconds.');
    return;
  }

  sendMessage(`
 ${mesage}
  `)

  lock.releaseLock();
}

function sendMessage(sText, chatID) {

  //var botId = '970219148:AAFr7rOe8ScRrEVzKKMReKIYzrejRzYSbmQ'; // тут должен быть ID бота
  var botId = '1429466119:AAG58O0k-4amhUK3yJsDU7bD5rWPj5iPEBw'; // тут должен быть ID бота
  var chatID = '374805417'; // ID группа в которую отправляется сообщение
  UrlFetchApp.fetch("https://api.telegram.org/bot" + botId + "/sendMessage?chat_id=" + chatID, {
    'method': 'post',
    'payload': {
      chat_id: chatID,
      text: sText,
      disable_web_page_preview: true
    }
  })
}

////////////////////////////////
//TermSum
function dataTermSum() {
  const sheet = SpreadsheetApp.openById('1dY62dP8R3iTwyoNLvEeEJn5thoC-56Pb4ZNtZJsHGu4').getSheetByName('bot')
  const termdate = sheet.getRange(3, 1).getValue()
  const termsumma = sheet.getRange(7, 1).getValue()
  return [termdate, termsumma]
}

///////////////////////////////
//DateSost
function dataDateSost() {
  const date = dataInspektor().getRange(3, 4).getDisplayValue()
  return date
}

function updateDateSostGs(dateDateSost) {
  dataInspektor().getRange(3, 4).setValue(dateDateSost)
}