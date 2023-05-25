function insertTermKar(data) {

  dataIns = [[data[0], data[5], '', data[1], true]]
  if (data[4] === 'термінал') {
    dataTerminal().insertRowAfter(2);
    dataTerminal().getRange(3, 1, 1, 5).setValues(dataIns)
  }
  if (data[4] === 'карантин') {

    dataKarantin().insertRowAfter(2);
    dataKarantin().getRange(3, 1, 1, 5).setValues(dataIns)
  }
}


function vReestrTerminalKarantin(data) {
  const sheetReestrTrata = dataWaste()
  // получаем строчний массив счетов для поиска
  let valueVhodString = [[data[0], data[5], '', data[1]]]
  //  берем массив из таблицы Реестр оформлений, лист Прочие траты
  let valueReestrTrata = sheetReestrTrata.getDataRange().getValues().slice(1);
  //  берем столбец с назначениями платежей
  let valueReestrTrataNaznechenie = valueReestrTrata.map(x => x[3]);
  //  берем столбец с назначениями платежей из таблицы Списання термінал
  let valueVhodSchet = data[5]

  if (data[4] === 'термінал') {
    if (valueReestrTrataNaznechenie.toString().includes(valueVhodSchet) == false) {
      let res = [Utilities.formatDate(new Date(data[0]), 'Europe/Kiev', 'dd.MM.yyyy'), data[1], 'тов', '', 'АВТОМОБІЛЬНІ ІНТЕЛЕКТУАЛЬНІ ТЕХНОЛОГІЇ ' + 'пп' + data[5]]
      sheetReestrTrata.appendRow(res)
    }
  }
  if (data[4] === 'карантин') {
    if (valueReestrTrataNaznechenie.toString().includes(valueVhodSchet) == false) {
      let res = [Utilities.formatDate(new Date(data[0]), 'Europe/Kiev', 'dd.MM.yyyy'), data[1], 'тов', '', 'КАРАНТИН ' + '' + data[5]]
      sheetReestrTrata.appendRow(res)

    }
  }
}