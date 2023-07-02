//удаление элемента массива и замена его на форматированную дату
// нумерация (numElement) с нуля
/*  function formatDateElement(numElement, rowData){
  const vasteDate = String(rowData.splice(numElement, 1))
  return rowData.splice(numElement, 0, Utilities.formatDate(new Date(vasteDate), 'Europe/Kiev', 'dd.MM.yyyy'))
}

// добавление строк в приход-расход
function addNewRowWaste(rowData) {
  dataWaste().appendRow(formatDateElement(0, rowData))
  return true
}

function addNewRowArrival(rowData) {
  dataArriwal().appendRow(formatDateElement(0, rowData))
  return true
}

function addNewRowMinusThreee(rowData) {
  dataWaste().appendRow(formatDateElement(0, rowData))
  return true
} */

/* function transferRowData(rowData){
  const vasteDate = String(rowData.splice(0, 1))
  rowData.splice(0, 0, Utilities.formatDate(new Date(vasteDate), 'Europe/Kiev', 'dd.MM.yyyy'))
  return rowData
} */

function addNewRowWaste(rowData) {
  const vasteDate = String(rowData.splice(0, 1));
  rowData.splice(0, 0, formatDateDDdotMMdotYYYY(vasteDate));
  dataWaste().appendRow(rowData);  
  return getLastTenRowsWaste();
}

function addNewRowArrival(rowData) {
  const arrivalDate = String(rowData.splice(0, 1))
  rowData.splice(0, 0, formatDateDDdotMMdotYYYY(arrivalDate))
  dataArriwal().appendRow(rowData)
  return getLastTenRowsArrival();
}

function addNewTableArriwalWaste(rowData, sheet) {
  const arrivalDate = String(rowData.splice(0, 1));
  rowData.splice(0, 0, formatDateDDdotMMdotYYYY(arrivalDate));
  const arrivalSumma = rowData.splice(1, 1);
  rowData.splice(1, 0, (new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 }).format(arrivalSumma)));
  const lastTenRows = getLastTenRows(sheet, 1);
  const lastTenRowsData = [];
  lastTenRowsData.push(rowData);
  return lastTenRows
}
function addNewTableArriwal(rowData) {
  const lastTenRows = addNewTableArriwalWaste(rowData, dataArriwal());
  return lastTenRows
}
function addNewTableWaste(rowData) {
  const lastTenRows = addNewTableArriwalWaste(rowData, dataWaste());
  return lastTenRows
}
/* function addNewTableArriwal(rowData) {
  const arrivalDate = String(rowData.splice(0, 1))
  rowData.splice(0, 0, Utilities.formatDate(new Date(arrivalDate), 'Europe/Kiev', 'dd.MM.yyyy'))
  const arrivalSumma = rowData.splice(1, 1)
  rowData.splice(1, 0, (new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2}).format(arrivalSumma)))
  const lastTenRows = getLastTenRows(dataArriwal())
  const lastTenRowsData = lastTenRows.data
  lastTenRowsData.push(rowData)
  return lastTenRows
} */

/* function addNewTableWaste(rowData) {
  const arrivalDate = String(rowData.splice(0, 1))
  rowData.splice(0, 0, Utilities.formatDate(new Date(arrivalDate), 'Europe/Kiev', 'dd.MM.yyyy'))
  const arrivalSumma = rowData.splice(1, 1)
  rowData.splice(1, 0, (new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2}).format(arrivalSumma)))
  const lastTenRows = getLastTenRows(dataWaste())
  const lastTenRowsData = lastTenRows.data
  lastTenRowsData.push(rowData)
  return lastTenRows
} */

// вставка строки с данными комиссии привата в расход 
function addNewRowMinusThreee(rowData) {
  const privDate = String(rowData.splice(0, 1))
  rowData.splice(0, 0, formatDateDDdotMMdotYYYY(privDate))
  dataWaste().appendRow(rowData)
  return true
}

////////////////////////////////////////////////

// ArriwalWaste
/*GET LAST 15 RECORDS */
/* function getLastTenRows(sheet) {
  const lr = sheet.getDataRange().getValues().length

  const data = sheet.getRange(lr - 20, 1, 21, 5).getDisplayValues()
  return data;
} */

// list - це позначка дії їз стовпцями. Яущо пусто, то передається вся таблиця, якщо "1", то викидаємо четвертий стовпець 
function getLastTenRows(sheet, list) {
  const lr = sheet.getDataRange().getValues().length;
  const dataArr = sheet.getRange(2, 1, lr, 5).getDisplayValues();
  //const data = {...sheet.getRange(2, 1, lr, 5).getDisplayValues()};

  // відбір не пустих підмасивів
  let data = dataArr.filter(e => !e.every(el => el === ''));
  // const data = arr.filter(n => n.some(m => m !== ''));

  //добавляємо в кінець масиву номер запису
  data.forEach((el, i) => el.push(String(i)));
  
  let dataMap;

  //видаляємо 4 стовпець
  if (list) {
    dataMap = data.map(x => [x[0], x[1], x[2], x[4], x[5]]);
  } else {
    dataMap = data;
  }

  const dataObject = {
    'data': dataMap,
    'len': lr
  };
  return dataObject
}

function getLastTenRowsWaste() {
  return getLastTenRows(dataWaste(), 1)
}

function getLastTenRowsArriwal() {
  return getLastTenRows(dataArriwal())
}

function getLastTenRowsWasteAndArriwal() {

  return [getLastTenRowsWaste(), getLastTenRowsArriwal()]
}

////////////////////////////////////////////////
////////////////////////////////////////////////

function addpRoekt() {
  const arr = getDropDownArray(dataSheet(), 2, 6)
  return arr[arr.length - 1]
}

/* function addpRoekt() {
  const ss = SpreadsheetApp.openByUrl(URLUPRAV)
  const sheet = ss.getSheetByName('База')
  var dataValues = sheet.getRange("F1:F").getValues(); //получаем массив проектов
  var dataLength = dataValues.length;

  for (var i = dataLength - 1; i >= 0; i--) {
    if (dataValues[i][0] !== "") {
      var lastRowInData = i + 1;
      break;
    }
  }
  var NumProekt = sheet.getRange(lastRowInData, 6).getValue();
  return NumProekt + 1
} */

function addNewRow(rowData) {
  // таблица Управление
  const ss = SpreadsheetApp.openByUrl(URLUPRAV)
  const sheet = ss.getSheetByName('База')
  const spl0 = String(rowData.splice(0, 1))
  const spl1 = String(rowData.splice(0, 1))
  const dat1 = formatDateDDdotMMdotYYYY(spl1)
  if (!spl0) {
    rowData.splice(0, 0, '', dat1)
  } else {
    const dat0 = formatDateDDdotMMdotYYYY(spl0)
    rowData.splice(0, 0, dat0, dat1)
  }
  sheet.appendRow(rowData)
  return true
}

//////////////////////////////
// Выбор для формирования выпадающих списков

// Общая функция
/**
flagNonUnique - это флаг, отвечающий за не уникальность. Если он true, то берется массив всех данных. Если он пропущен, то берется массив только уникальных данных.
*/
function getDropDownArray(sheet, row, col, flagNonUnique) {
  let arr = sheet.getRange(row, col, sheet.getLastRow() - 1, 1).getValues().filter(String).flat();
  const result = flagNonUnique ? arr : [...new Set(arr)];
  return result;
}
// Конец общей функции

//таблица Управление - Фирмы
function getDropDownArrayFirma() {
  return getDropDownArray(dataSheet(), 2, 3)
}

//таблица Управление - Сотрудники
function getDropDownArraySotr() {
  return getDropDownArray(dataSheet(), 2, 7)
}

//таблица Управление - Код работа
function getDropDownArrayCodeRabota() {
  return getDropDownArray(dataSheet(), 2, 5)
}

//таблица Управление - Работа
function getDropDownArrayRabota() {
  return getDropDownArray(dataSheet(), 2, 4)
}

//таблица Управление - Примечание
function getDropDownArrayPrim() {
  return getDropDownArray(dataSheet(), 2, 9)
}

//таблица Управление - Проект
function getDropDownArrayProekt() {
  return getDropDownArray(dataSheet(), 2, 6)
}

//таблица Реестр оформлений - Исполнитель (инспектор)
function getDropDownArrayIspol() {
  return getDropDownArray(dataBase(), 2, 16)
}

//таблица Реестр оформлений - Номера проектов из Финансы
function getDropDownArrayProektFin() {
  return getDropDownArray(dataFinance(), 100, 1)
}

//таблица Реестр оформлений - Номера счетов из Финансы
function getDropDownArraySfFin() {
  return getDropDownArray(dataFinance(), 100, 5)
}

//таблица Реестр оформлений - Примечания из Финансы
function getDropDownArrayPrimFin() {
  return getDropDownArray(dataFinance(), 100, 6)
}

//таблица Реестр оформлений - Примечания мое
function getDropDownArrayPrimMoyoReestr() {
  return getDropDownArray(dataBase(), 2, 21)
}

//таблица Реестр оформлений - Номера проектов из Job
function getDropDownArrayProektJob() {
  return getDropDownArray(dataJob(), 100, 1)
}

//таблица Реестр оформлений - Работа из Job
function getDropDownArrayRabotaJob() {
  return getDropDownArray(dataJob(), 100, 2)
}

//таблица Реестр оформлений - Описание из Job
function getDropDownArrayOpisanieJob() {
  return getDropDownArray(dataJob(), 100, 5)
}

//таблица Реестр оформлений - Фірма из Job
function getDropDownArrayFirmaJob() {
  return getDropDownArray(dataJob(), 100, 10)
}

//таблица Реестр оформлений - Фирмы из Прочие поступления
function getDropDownArrayFirmaArrivalWaste() {
  return getDropDownArray(dataArriwal(), 2, 4)
}

//таблица Реестр оформлений - Статьи из Прочие поступления и Прочие траты
function getDropDownArrayStatyaArrivalWaste() {
  const rashod = dataWaste().getRange(2, 5, dataWaste().getLastRow() - 1, 1).getValues()
  const dohod = dataArriwal().getRange(2, 5, dataArriwal().getLastRow() - 1, 1).getValues()
  return [...new Set(rashod.concat(dohod).filter(String).flat())]
}

//форма оплаты (признак)
function getDropDownArrayPriznak() {
  return ['гот', 'тов', 'фоп']
}

// Конец выбора для формирования выпадающих списков
//////////////////////////////


//автовставка даты в форму
function addDate() {
  return formatDateDDdotMMdotYYYY((new Date()))
}

////////////////////////////////////////////////

// Создание папки с проектом в Аф пустой
function createNewFolder(proekt, firma, prim) {
  //const afFolderId = '13N9QgYZDA81L6zuZhq5fzqTR1s9XSZ_d'
  const afFolderId = '1zN_QXpVkrEDzl3zegha1YMSawCGVjyeE'
  const listFile = listFiles(afFolderId)
  if (!listFile.map(r => r[0]).includes(firma)) {
    const parentFolder = DriveApp.getFolderById(afFolderId);
    const newFolder = parentFolder.createFolder(firma)
    newFolder.createFolder(`#${proekt} ${prim}`)
  } else {
    const listFileUrlArr = listFile.filter(r => r[0] == firma).map(r => r[1])
    const id = listFileUrlArr[0].match(/[-\w]{25,}/)
    DriveApp.getFolderById(id[0]).createFolder(`#${proekt} ${prim}`)
  }
}

//функция создания папки, где внутри есть От органа
function createNewFolderOtOrgana(proekt, firma, prim) {
  //const afFolderId = '13N9QgYZDA81L6zuZhq5fzqTR1s9XSZ_d'
  const afFolderId = '1zN_QXpVkrEDzl3zegha1YMSawCGVjyeE'
  const listFile = listFiles(afFolderId)
  if (!listFile.map(r => r[0]).includes(firma)) {
    const parentFolder = DriveApp.getFolderById(afFolderId);
    const newFolder = parentFolder.createFolder(firma)
    var newFolderProekt = newFolder.createFolder(`#${proekt} ${prim}`)
  } else {
    const listFileUrlArr = listFile.filter(r => r[0] == firma).map(r => r[1])
    const id = listFileUrlArr[0].match(/[-\w]{25,}/)
    var newFolderProekt = DriveApp.getFolderById(id[0]).createFolder(`#${proekt} ${prim}`)
  }
  newFolderProekt.createFolder(`Від клієнта`)
  const newFolderOtOrgana = newFolderProekt.createFolder(`Від органа`)
  newFolderOtOrgana.createFolder(`Фінанси`)
  const newFolderOtBelochki = newFolderOtOrgana.createFolder(`Білочки`)
  newFolderOtBelochki.createFolder('Клієнту')
  newFolderOtBelochki.createFolder('Від клієнта')
}

// получение списка папок в определенной директории
function listFiles(folderId) {
  var arr = [['', folderId, '']]

  for (var x = 0; x < arr.length; x++) {

    if (x && arr[x][2] != 'application/vnd.google-apps.folder') continue;
    var query = createQuery(arr[x][1]);
    var files;
    var pageToken;

    do {
      files = Drive.Files.list({
        q: query,
        maxResults: 100,
        pageToken: pageToken
      });
      if (files.items && files.items.length > 0) {
        for (var i = 0; i < files.items.length; i++) {
          var folder = files.items[i];
          arr.push(
            [folder.title,
            folder.alternateLink]);
        }
      }
      pageToken = files.nextPageToken;
    } while (pageToken);
  }

  arr = arr.slice(1)
  arr.map(h => h.splice(2, 1));
  return arr
  // sh.getRange(4, 1, arr.length, arr[0].length).setValues(arr);
}

function createQuery(f) {
  return `${f == 'root' ? '"root"' : '"' + getIdFromUrl(f) + '"'} in parents and trashed = false`
}

function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }
// Конец Создание папки с проектом в Аф


// Таблица управление tableUpravlenie

function UpdateRecordUprav(dateendUprav, datestartUprav, firmaUprav, rabotaUprav, coderabotaUprav, proektUprav, ispolUprav, schUprav, primUprav) {
  var getLastRow = dataSheet().getLastRow();
  var table_values = dataSheet().getRange(2, 1, getLastRow - 1, 9).getValues();

  for (i = 0; i < table_values.length; i++) {
    if (table_values[i][5] == proektUprav) {
      dataSheet().getRange(i + 2, 1).setValue(dateendUprav);
      dataSheet().getRange(i + 2, 2).setValue(datestartUprav);
      dataSheet().getRange(i + 2, 3).setValue(firmaUprav);
      dataSheet().getRange(i + 2, 4).setValue(rabotaUprav);
      dataSheet().getRange(i + 2, 5).setValue(coderabotaUprav);
      dataSheet().getRange(i + 2, 6).setValue(proektUprav);
      dataSheet().getRange(i + 2, 7).setValue(ispolUprav);
      dataSheet().getRange(i + 2, 8).setValue(schUprav);
      dataSheet().getRange(i + 2, 9).setValue(primUprav);
    }

  }
  return 'SUCCESS';
}

function DeleteRecordUprav(proektUprav) {
  var getLastRow = dataSheet().getLastRow();
  var table_values = dataSheet().getRange(2, 1, getLastRow - 1, 9).getValues();
  for (i = 0; i < table_values.length; i++) {
    if (table_values[i][5] == proektUprav) {
      var rowNumber = i + 2;

      dataSheet().deleteRow(rowNumber)

    }
  }
  return 'SUCCESS';
}

function AddRecordUprav(dateendUprav, datestartUprav, firmaUprav, rabotaUprav, coderabotaUprav, proektUprav, ispolUprav, schUprav, primUprav) {
  let arr = [dateendUprav, datestartUprav, firmaUprav, rabotaUprav, coderabotaUprav, proektUprav, ispolUprav, schUprav, primUprav]
  const spl0 = String(arr.splice(0, 1))
  const spl1 = String(arr.splice(0, 1))
  const dateendUprav1 = formatDateDDdotMMdotYYYY(spl0)
  const datestartUprav1 = formatDateDDdotMMdotYYYY(spl1)
  const tData = formatDateDDdotMMdotYYYY(new Date())

  if (!spl0) {
    arr.splice(0, 0, '')
  } else {
    arr.splice(0, 0, dateendUprav1)
  }
  if (!spl1) {
    arr.splice(1, 0, tData)
  } else {
    arr.splice(1, 0, datestartUprav1)
  }
  dataSheet().appendRow(arr);
  return 'SUCCESS';
}

function searchRecordsUpravGs(dateendUprav, datestartUprav, firmaUprav, rabotaUprav, coderabotaUprav, proektUprav, sotrUprav, schUprav, primUprav) {

  var returnRows = [];
  var allRecords = getRecordsUprav();

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (dateendUprav != '') {
      if (formatDateDDdotMMdotYYYY(value[0]) == formatDateDDdotMMdotYYYY(dateendUprav)) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (datestartUprav != '') {
      if (formatDateDDdotMMdotYYYY(value[1]) == formatDateDDdotMMdotYYYY(datestartUprav)) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (firmaUprav != '') {
      if (value[2].toUpperCase() == firmaUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (rabotaUprav != '') {
      if (value[3].toUpperCase() == rabotaUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (coderabotaUprav != '') {
      if (value[4].toUpperCase() == coderabotaUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (proektUprav != '') {
      if (value[5] == proektUprav) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (sotrUprav != '') {
      if (value[6].toUpperCase() == sotrUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (schUprav != '') {
      if (value[7].toUpperCase() == schUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (primUprav != '') {
      if (value[8].toUpperCase() == primUprav.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (evalRows.indexOf("false") == -1) {
      returnRows.push(value);
    }

  });

  return returnRows;
}

function getRecordsUprav() {
  const data = dataSheet().getDataRange().getValues().slice(1)
  const dataFilterMap = data.filter(x => x[5] != '')
    .map(x => [getDateUprav(x[0]), getDateUprav(x[1]), x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9]])

  return dataFilterMap;
}

function getDateUprav(date) {
  if (date) {
    return Utilities.formatDate(new Date(date), 'Europe/Kiev', 'yyyy-MM-dd')
  } else {
    return ''
  }
}

////////////////////////////////////////////////
// financetable

function searchRecordsFin(proektFin, summaFin, priznakFin, dateoplFin, sfFin, primFin, idFin, firmaFin) {

  var returnRows = [];
  var allRecords = getRecordsFin();

  /* const range = dataBase().getRange(1, 1, dataBase().getLastRow() + 1, dataBase().getLastColumn() + 1);
  const values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    for (var ii = 0; ii <= values[i].length; ii++) {
      if (values[i][ii] == proektFin) {
        var row = i + 1
        var col = ii + 1
      }
    }
  }
  
  let ispol
  if(proektFin){
    ispol = [dataBase().getRange(row, col + 11).getValue(), dataBase().getRange(row, col + 12).getValue()]
  }else{
    ispol = ['недоступен','недоступен'] 
  } */

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (proektFin != '') {
      if (value[0] == proektFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (summaFin != '') {
      if (+value[1] == +summaFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (priznakFin != '') {
      if (value[2] == priznakFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (dateoplFin != '') {
      if (Utilities.formatDate(new Date(strongToDate(value[3])), 'Europe/Kiev', 'dd.MM.yyyy') == Utilities.formatDate(new Date(dateoplFin), 'Europe/Kiev', 'dd.MM.yyyy')) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (sfFin != '') {
      if (value[4] == sfFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (primFin != '') {
      if (value[5] == primFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (idFin != '') {
      if (value[6] == idFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (firmaFin != '') {
      if (value[7] == firmaFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }

    if (evalRows.indexOf("false") == -1) {
      //  value.splice(8, 0, value[8], value[9])
      returnRows.push(value);
    }

  });

  return returnRows;
}

function searchRecordsFinProekt(proektFin, summaFin, priznakFin, dateoplFin, sfFin, primFin, idFin, firmaFin) {

  var returnRows = [];
  var allRecords = getRecordsFin();
  /*  const range = dataBase().getRange(1, 1, dataBase().getLastRow() + 1, dataBase().getLastColumn() + 1);
   const values = range.getValues();
   for (var i = 0; i < values.length; i++) {
     for (var ii = 0; ii <= values[i].length; ii++) {
       if (values[i][ii] == proektFin) {
         var row = i + 1
         var col = ii + 1
       }
     }
   }
   
   let ispol = [dataBase().getRange(row, col + 11).getValue(), dataBase().getRange(row, col + 12).getValue()] */

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (proektFin != '') {
      if (value[0] == proektFin) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else {
      evalRows.push('true');
    }
    evalRows.splice(1, 0, 'true', 'true', 'true', 'true', 'true', 'true', 'true')

    if (evalRows.indexOf("false") == -1) {
      /*   if (ispol) {
          value.splice(8, 0, ...ispol)
        } */
      returnRows.push(value);

    }

  });

  return returnRows;
}

function getRecordsFin() {
  /*  const data = dataFinance().getRange(99,1, dataFinance().getLastRow(), dataFinance().getLastColumn()).getValues().slice(1)
   const dataFilterMap = data.map(x => [x[0], x[1], x[2], getDateFin(x[3]), x[4], x[5], x[6], x[14], x[15], x[16]])
   return dataFilterMap; */
  return getDataTableFinance();
}
/* 
function getDateFin(date) {
  if (date) {
    return Utilities.formatDate(new Date(date), 'Europe/Kiev', 'yyyy-MM-dd')
  } else {
    return ''
  }
} */

function UpdateRecordFin(proektFin, summaFin, priznakFin, dateoplFin, sfFin, primFin, idFin, firmaFin, sumIspolFin, oplataIspolFin, checkBox) {
  console.log(checkBox)
  var getLastRow = dataFinance().getDataRange().getValues().length;
  var table_values = dataFinance().getRange(100, 1, getLastRow, 15).getValues();
  const range = dataBase().getRange(1, 1, dataBase().getLastRow() + 1, dataBase().getLastColumn() + 1);
  const values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    for (var ii = 0; ii <= values[i].length; ii++) {
      if (values[i][ii] == proektFin) {
        var row = i + 1
        var col = ii + 1
      }
    }
  }
  for (i = 0; i < table_values.length; i++) {
    if (table_values[i][6] == idFin) {
      dataFinance().getRange(i + 100, 1).setValue(proektFin);
      dataFinance().getRange(i + 100, 2).setValue(summaFin * 1);
      dataFinance().getRange(i + 100, 3).setValue(priznakFin);
      dataFinance().getRange(i + 100, 4).setValue(dateoplFin);
      dataFinance().getRange(i + 100, 5).setValue(sfFin);
      dataFinance().getRange(i + 100, 6).setValue(primFin);
      dataFinance().getRange(i + 100, 7).setValue(idFin);
      dataBase().getRange(row, col + 11).setValue(sumIspolFin)
      dataBase().getRange(row, col + 12).setValue(oplataIspolFin)
    }
  }
  // обработка вставки "частичная оплата"
  issuePart(checkBox, proektFin);
  return 'SUCCESS';
}

function AddRecordFin(proektFin, summaFin, priznakFin, dateoplFin, sfFin, primFin, idFin, firmaFin, checkBox) {
  dataFinance().insertRowAfter(99);
  //формируем id
  const idFinId = new Date().getTime();
  const data = [[proektFin, summaFin * 1, priznakFin, dateoplFin, sfFin, primFin, idFinId]];
  dataFinance().getRange('A100:G100').setValues(data);

  // обработка вставки "частичная оплата"
  if (checkBox === 'ispolu') {
    ispoluSet(summaFin, proektFin);
  } else {
    issuePart(checkBox, proektFin);
  }
}

function AddRecordFinMultiple(arrFinMulti) {
  const rows = arrFinMulti.length;
  dataFinance().insertRowsAfter(99, rows);

  //формируем id
  const idFinId = new Date().getTime();

  // обробляємо інпути
  let data = [];
  for (i = 0; i < rows; i++) {
    data.push([arrFinMulti[i][0], arrFinMulti[i][1] * 1, arrFinMulti[i][2], arrFinMulti[i][3], arrFinMulti[i][4], arrFinMulti[i][6], idFinId * getRandom()]);
  };
  dataFinance().getRange('A100:G' + Number(rows + 99)).setValues(data);

  // обробляємо чекбокси
  let check = [];
  for (i = 0; i < rows; i++) {
    check.push([arrFinMulti[i][0], arrFinMulti[i][1], arrFinMulti[i][8], arrFinMulti[i][10]]);
  };

  const getLastRowReestr = dataBase().getLastRow();
  const tableValuesReestr = dataBase().getRange(2, 1, getLastRowReestr - 1, 24).getValues();
  for (i = 0; i < check.length; i++) {

    // виставлено частково
    if (check[i][0] && check[i][2] === true) {
      for (y = 0; y < tableValuesReestr.length; y++) {
        if (+tableValuesReestr[y][5] == +check[i][0]) {
          dataBase.getRange(y + 2, 24).setValue(check[i][2]);
        }
      }
    }

    // викону
    if (check[i][0] && check[i][3] === true) {
      if (check[i][1] < 0) check[i][1] = -check[i][1];
      for (y = 0; y < tableValuesReestr.length; y++) {
        if (+tableValuesReestr[y][5] == +check[i][0]) {
          dataBase().getRange(y + 2, 18).setValue(check[i][1]);
        }
      }
    }
  }
}

// функция обработка вставки "частичная оплата"
function issuePart(checkBox, proektFin) {
  const getLastRowReestr = dataBase().getLastRow();
  const tableValuesReestr = dataBase().getRange(2, 1, getLastRowReestr - 1, 24).getValues();
  let check = (checkBox == 'part') ? true : false;
  for (i = 0; i < tableValuesReestr.length; i++) {
    if (+tableValuesReestr[i][5] == +proektFin) {
      dataBase().getRange(i + 2, 24).setValue(check);
    }
  }
}

// функция обработка вставки "исполу"
function ispoluSet(summaFin, proektFin) {
  const getLastRowReestr = dataBase().getLastRow();
  const tableValuesReestr = dataBase().getRange(2, 1, getLastRowReestr - 1, 24).getValues();
  if (summaFin < 0) {
    summaFin = -summaFin;
  }
  for (i = 0; i < tableValuesReestr.length; i++) {
    if (+tableValuesReestr[i][5] == +proektFin) {
      dataBase().getRange(i + 2, 18).setValue(summaFin);
    }
  }
}

///////////////////////////////////////////
//NEVISTAVLENO - NEOPLACHENO

//https://www.bpwebs.com/


/* DEFINE GLOBAL VARIABLES, CHANGE THESE VARIABLES TO MATCH WITH YOUR SHEET */
/* function globalVariablesNevistavleno() {
  var varArray = {
    spreadsheetId: '1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ',
    dataRage: 'В работе!P10:V',
 
  };
  return varArray;
}
function globalVariablesNeoplacheno() {
  var varArray = {
    spreadsheetId: '1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ',
    dataRage: 'В работе!X10:AA',
 
  };
  return varArray;
} */

/* READ DATA */
/* function readData(spreadsheetId, range) {
  var result = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
  return result.values;
} */





function startDataNevistvleno() {
  dataVrabote().getRange('AS13:BL').clearContent()
  dataVrabote().getRange('B13:V').clearContent()
  const data = dataVrabote().getRange('P10:V').getDisplayValues()
  const lenthg = (data.filter(x => x[4] != '')).length + 2
  const res = data.splice(0, lenthg)
  return res
}

function startDataNeoplacheno() {
  dataVrabote().getRange('AS13:BL').clearContent()
  dataVrabote().getRange('B13:V').clearContent()
  const data = dataVrabote().getRange('X10:AA').getDisplayValues()
  const lenthg = (data.filter(x => x[0] != '')).length + 2
  const res = data.splice(0, lenthg)
  return res
}

function startDataVraboteR() {
  dataVrabote().getRange('AS13:BL').clearContent()
  dataVrabote().getRange('B13:V').clearContent()
  const data = dataVrabote().getRange('I10:N').getDisplayValues()
  const lenthg = (data.filter(x => x[4] != '')).length + 2
  const res = data.splice(0, lenthg)
  return res
}

function startDataVraboteT() {
  dataVrabote().getRange('AS13:BL').clearContent()
  dataVrabote().getRange('B13:V').clearContent()
  const data = dataVrabote().getRange('AE10:AJ').getDisplayValues()
  const lenthg = (data.filter(x => x[4] != '')).length + 2
  const res = data.splice(0, lenthg)
  return res
}

function startDataSotrGs() {
  dataVrabote().getRange('AS13:BL').clearContent()
  dataVrabote().getRange('B13:V').clearContent()
  const dataLazorenko = dataVrabote().getRange('AS10:AX').getDisplayValues()
  const dataDilanjan = dataVrabote().getRange('AL10:AQ').getDisplayValues()
  const dataKinzerskiy = dataVrabote().getRange('AZ10:BE').getDisplayValues()
  const dataZinonkina = dataVrabote().getRange('BG10:BL').getDisplayValues()

  const lenthgLazorenko = (dataLazorenko.filter(x => x[4] != '')).length + 2
  const lenthgDilanjan = (dataDilanjan.filter(x => x[4] != '')).length + 2
  const lenthgKinzerskiy = (dataKinzerskiy.filter(x => x[4] != '')).length + 2
  const lenthgZinonkina = (dataZinonkina.filter(x => x[4] != '')).length + 2

  const resLazorenko = dataLazorenko.splice(0, lenthgLazorenko)
  const resDilanjan = dataDilanjan.splice(0, lenthgDilanjan)
  const resKinzerskiy = dataKinzerskiy.splice(0, lenthgKinzerskiy)
  const resZinonkina = dataZinonkina.splice(0, lenthgZinonkina)

  const res =
  {
    nameLazorenko: 'Лазоренко', resLazorenko: resLazorenko, countLazorenko: lenthgLazorenko - 3,
    nameDilanjan: 'Диланян', resDilanjan: resDilanjan, countDilanjan: lenthgDilanjan - 3,
    nameKinzerskiy: 'Кинзерский', resKinzerskiy: resKinzerskiy, countKinzerskiy: lenthgKinzerskiy - 3,
    nameZinonkina: 'Зиновкина', resZinonkina: resZinonkina, countZinonkina: lenthgZinonkina - 3

  }
  Logger.log(res)
  return res
}

////////////////////////////////////////////////
//ТАБЛИЦА РЕЕСТР ОФОРМЛЕНИЙ

function searchRecordsReestrGs(dateendReestr, datestartReestr, firmaReestr, rabotaReestr, coderabotaReestr, proektReestr, sotrReestr, ispolReestr, sumispolReestr, sumoplataReestr, primReestr, primMoyoReestr, issuepartReestr, withoutaccountReestr, stoppedReestr, checkDateReestr) {

  var returnRows = [];
  var allRecords = getRecordsReestr();

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (!checkDateReestr) {
      if (dateendReestr != '') {
        if (formatDateDDdotMMdotYYYY(value[0]) == formatDateDDdotMMdotYYYY(dateendReestr)) {
          evalRows.push('yes');
        } else {
          evalRows.push('no');
        }
      } else {
        evalRows.push('yes');
      }

      if (datestartReestr != '') {
        if (formatDateDDdotMMdotYYYY(value[1]) == formatDateDDdotMMdotYYYY(datestartReestr)) {
          evalRows.push('yes');
        } else {
          evalRows.push('no');
        }
      }
      else {
        evalRows.push('yes');
      }
    }

    if (checkDateReestr === '<') {
      if (dateendReestr != '' && datestartReestr != '') {
        if (new Date(value[0]) <= new Date(dateendReestr) && new Date(value[0]) >= new Date(datestartReestr)) {
          evalRows.push('yes');
        } else {
          evalRows.push('no');
        }
      } else {
        evalRows.push('no');
      }
    }

    if (checkDateReestr === '>') {
      if (dateendReestr != '' && datestartReestr != '') {
        if (new Date(value[1]) <= new Date(dateendReestr) && new Date(value[1]) >= new Date(datestartReestr)) {
          evalRows.push('yes');
        } else {
          evalRows.push('no');
        }
      } else {
        evalRows.push('no');
      }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    if (firmaReestr != '') {
      if (String(value[2]).toUpperCase() == firmaReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (rabotaReestr != '') {
      if (String(value[3]).toUpperCase() == rabotaReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (coderabotaReestr != '') {
      if (String(value[4]).toUpperCase() == coderabotaReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (proektReestr != '') {
      if (value[5] == proektReestr * 1) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (sotrReestr != '') {
      if (String(value[6]).toUpperCase() == sotrReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (ispolReestr != '') {
      if (String(value[7]).toUpperCase() == ispolReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (sumispolReestr != '') {
      if (value[8] == sumispolReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (sumoplataReestr != '') {
      if (value[9] == sumoplataReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (primReestr != '') {
      if (String(value[10]).toUpperCase() == primReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (primMoyoReestr != '') {
      if (String(value[11]).toUpperCase() == primMoyoReestr.toUpperCase()) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (issuepartReestr != '') {
      if (value[12] == issuepartReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (withoutaccountReestr != '') {
      if (value[13] == withoutaccountReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (stoppedReestr != '') {
      if (value[14] == stoppedReestr) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (evalRows.indexOf("no") == -1) {
      returnRows.push(value);
    }

  });

  return returnRows;

}


function getRecordsReestr() {
  const dateRee = dataBase().getDataRange().getValues().slice(1);
  const dataMapRee = dateRee.filter(x => x[5] != '')
    .map(x => [getDateUprav(x[0]), getDateUprav(x[1]), x[2], x[3], x[4], x[5], x[6], x[15], x[16], x[17], x[21], x[20], x[23], x[22], x[18]]);
  const dataFilterMapRee0 = dataMapRee.filter(x => x[0] === '').sort((a, b) => b[5] - a[5]);
  const dataFilterMapRee1 = dataMapRee.filter(x => x[0] != '').sort((a, b) => b[5] - a[5]);
  const dataFilterMapReeDate = dataFilterMapRee0.concat(dataFilterMapRee1);
  return dataFilterMapReeDate
}

function UpdateRecordReestrGs(dateendReestr, datestartReestr, firmaReestr, rabotaReestr, coderabotaReestr, proektReestr, sotrReestr, ispolReestr, sumispolReestr, sumoplataReestr, primReestr, primMoyoReestr, issuepartReestr, withoutaccountReestr, stoppedReestr) {

  var getLastRowUpr = dataSheet().getLastRow();
  var table_values_upr = dataSheet().getRange(2, 1, getLastRowUpr - 1, 9).getValues();

  for (i = 0; i < table_values_upr.length; i++) {
    if (table_values_upr[i][5] == proektReestr) {
      dataSheet().getRange(i + 2, 1).setValue(dateendReestr);
      dataSheet().getRange(i + 2, 2).setValue(datestartReestr);
      dataSheet().getRange(i + 2, 3).setValue(firmaReestr);
      dataSheet().getRange(i + 2, 4).setValue(rabotaReestr);
      dataSheet().getRange(i + 2, 5).setValue(coderabotaReestr);
      dataSheet().getRange(i + 2, 6).setValue(proektReestr);
      dataSheet().getRange(i + 2, 7).setValue(sotrReestr);
      dataSheet().getRange(i + 2, 9).setValue(primReestr);
    }
  }
  var getLastRowRee = dataBase().getLastRow();
  var table_values_ree = dataBase().getRange(2, 1, getLastRowRee, 25).getValues();
  for (i = 0; i < table_values_ree.length; i++) {
    if (table_values_ree[i][5] == proektReestr) {

      dataBase().getRange(i + 2, 16).setValue(ispolReestr);
      dataBase().getRange(i + 2, 17).setValue(sumispolReestr);
      dataBase().getRange(i + 2, 18).setValue(sumoplataReestr);
      dataBase().getRange(i + 2, 21).setValue(primMoyoReestr);
      dataBase().getRange(i + 2, 24).setValue(issuepartReestr);
      dataBase().getRange(i + 2, 23).setValue(withoutaccountReestr);
      dataBase().getRange(i + 2, 19).setValue(stoppedReestr);
    }
  }
  return 'SUCCESS';
}

///////////////////////////////////////////////////
// jobtable

function searchRecordsJob(proektJob, rabotaJob, datestartJob, dateendJob, opisanieJob, idJob, firmaJob, originalJob) {

  var returnRows = [];
  var allRecords = getRecordsJob();

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (proektJob != '') {
      if (value[0] == proektJob) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (rabotaJob != '') {
      if (value[1] == rabotaJob) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (datestartJob != '') {
      if (formatDateDDdotMMdotYYYY(value[2]) == formatDateDDdotMMdotYYYY(datestartJob)) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (dateendJob != '') {
      if (formatDateDDdotMMdotYYYY(value[3]) == formatDateDDdotMMdotYYYY(dateendJob)) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (opisanieJob != '') {
      if (value[4] == opisanieJob) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (originalJob != '') {
      if (value[5] == originalJob) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (idJob != '') {
      if (value[6] == idJob) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (firmaJob != '') {
      if (value[7] == firmaJob) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    if (evalRows.indexOf("no") == -1) {

      returnRows.push(value);

    }

  });

  return returnRows;
}

function searchRecordsJobProekt(proektJob, rabotaJob, datestartJob, dateendJob, opisanieJob, idJob, firmaJob, originalJob) {

  var returnRows = [];
  var allRecords = getRecordsJob();

  allRecords.forEach(function (value, index) {

    var evalRows = [];

    if (proektJob != '') {
      if (value[0] == proektJob) {
        evalRows.push('yes');
      } else {
        evalRows.push('no');
      }
    }
    else {
      evalRows.push('yes');
    }

    evalRows.splice(1, 0, 'true', 'true', 'true', 'true', 'true', 'true', 'true')

    if (evalRows.indexOf("no") == -1) {

      returnRows.push(value);

    }

  });

  return returnRows;
}

function getRecordsJob() {
  const data = dataJob().getRange('A99:J').getValues().slice(1)
  const dataFilterMap = data.map(x => [x[0], x[1], getDateFin(x[2]), getDateFin(x[3]), x[4], x[5], x[6], x[9]])

  return dataFilterMap;
}

function getDateFin(date) {
  if (date) {
    return formatDateDDdotMMdotYYYY(date)
  } else {
    return ''
  }
}

function UpdateRecordjobGs(proektJob, rabotaJob, datestartJob, dateendJob, opisanieJob, idJob, firmaJob, originalJob) {

  var getLastRow = dataJob().getDataRange().getValues().length;
  var table_values = dataJob().getRange(100, 1, getLastRow, 10).getValues();

  let originalJobIf
  if (originalJob === false) {
    originalJobIf = ''
  } else {
    originalJobIf = 1
  }

  for (i = 0; i < table_values.length; i++) {
    if (table_values[i][6] == idJob) {
      dataJob().getRange(i + 100, 1).setValue(proektJob);
      dataJob().getRange(i + 100, 2).setValue(rabotaJob);
      dataJob().getRange(i + 100, 3).setValue(datestartJob);
      dataJob().getRange(i + 100, 4).setValue(dateendJob);
      dataJob().getRange(i + 100, 5).setValue(opisanieJob);
      dataJob().getRange(i + 100, 6).setValue(originalJobIf);
      dataJob().getRange(i + 100, 7).setValue(idJob);
    }
  }
  return 'SUCCESS';
}

function AddRecordjobGs(proektJob, rabotaJob, datestartJob, dateendJob, opisanieJob, idJob, firmaJob, originalJob) {
  dataJob().insertRowAfter(99);
  //формируем id
  const idJobId = new Date().getTime();
  let originalJobIf
  if (originalJob === false) {
    originalJobIf = ''
  } else {
    originalJobIf = 1
  }
  const data = [[proektJob, rabotaJob, datestartJob, dateendJob, opisanieJob, originalJobIf, idJobId]]

  dataJob().getRange('A100:G100').setValues(data);
}

function NaOtdachuJobGs(proektJob, dateendJob, opisanieJob, firmaJob) {
  const url = 'https://docs.google.com/spreadsheets/d/1GLczVuSi-wbQeOb2IvPgZ0KLm9xXakPLb2pqBO2EqjM/edit#gid=0';
  const sheetNaOtdachu = SpreadsheetApp.openByUrl(url).getSheetByName('На отдачу');
  let sheetNaOtdachuValue = sheetNaOtdachu.getDataRange().getValues();// все данные из таблицы На отдачу

  // открываем таблицу На отдачу
  //const html = "<script>window.open('" + url + "');google.script.host.close();</script>";
  // const userInterface = HtmlService.createHtmlOutput(html).setWidth(1).setHeight(1);
  // SpreadsheetApp.getUi().showModalDialog(userInterface, ' ')

  // находим последнюю заполненную строку
  let sheetNaOtdachuLastRow = 0;
  sheetNaOtdachuValue.forEach(function (x, index) {
    if (x[4] != '') {
      sheetNaOtdachuLastRow = index + 1;
    }
  })
  let dataNomer = opisanieJob;//номера работ из job
  let dataProekt = proektJob; //проекты работ из job
  let dataFirma = firmaJob; //фірма работ из job
  let dataDate
  if (dataDate) {
    dataDate = formatDateDDdotMMdotYYYY(dateendJob);//даты работ из job 
  } else {
    dataDate = ''
  }


  // работа с датой
  // let dataDate =
  //     ((dataDate.getDate()) < 10 ? '0' : '') + (dataDate.getDate()) + '.'
  //     + ((dataDate.getMonth() + 1) < 10 ? '0' : '') + (dataDate.getMonth() + 1) + '.'
  //     + dataDate.getFullYear();
  // конец работы с датой

  // проверяем, была ли фірма на отдаче
  let firmaPredid = sheetNaOtdachuValue.filter(row => row[1] == dataFirma);
  //берем последнюю ячейку из Даты отдачи
  let firmaPredid7Pop = firmaPredid.map(row => row[7]).pop();
  // если фирмы на отдаче не было или последняя ячейка из Даты отдачи не нулевая
  if (firmaPredid == '' || firmaPredid7Pop != '') {
    //вставляем новый id
    var id = sheetNaOtdachu.getRange(1, 1).getValue() + 1;
  } else {
    // иначе дублируем старый id
    var id = firmaPredid.map(row => row[0]).pop();
  }


  if (dataDate) {
    var data = [].concat([[id, dataFirma, '', new Date(), dataNomer + " от " + dataDate, dataProekt, 'на отдачу', '']]);
  } else {
    var data = [].concat([[id, dataFirma, '', new Date(), dataNomer + dataDate, dataProekt, 'на отдачу', '']]);
  }


  // проверяем, заносили ли уже этот документ на отдачу
  let filterDadaNumber = sheetNaOtdachuValue.filter(row => row[4] == (data[0][4]));

  if (filterDadaNumber != '') {
    // let ui = SpreadsheetApp.getUi();
    // let response = ui.alert('Цей документ вже вносився. Продовжити?', ui.ButtonSet.YES_NO);
    // if (response == ui.Button.NO) {
    return 'povtor';
    //   }
  }
  sheetNaOtdachu.getRange(sheetNaOtdachuLastRow + 1, 1, 1, 8).setValues(data);
  numProekt();
}

//нумерация новых проектов
function numProekt() {
  const app = SpreadsheetApp;
  const url = 'https://docs.google.com/spreadsheets/d/1GLczVuSi-wbQeOb2IvPgZ0KLm9xXakPLb2pqBO2EqjM/edit#gid=0';
  const sheetSpiski = app.openByUrl(url).getSheetByName('Списки');
  const sheetNaOtdachu = app.openByUrl(url).getSheetByName('На отдачу');
  const lrSheetNaOtdachu = getLastRowFunc(sheetNaOtdachu, 1);
  const lrSheetSpiski = getLastRowFunc(sheetSpiski, 1);

  const firma = sheetNaOtdachu.getRange(lrSheetNaOtdachu, 2).getValue();

  if (sheetNaOtdachu.getRange(lrSheetNaOtdachu, 3).getValue() == '') {
    sheetSpiski.getRange(lrSheetSpiski + 1, 1).setValue(firma);
    sheetSpiski.getRange(lrSheetSpiski + 1, 2).setValue(sheetSpiski.getRange(lrSheetSpiski, 2).getValue() + 1);
  }
  //console.log(sheetSpiski.getRange(lrSheetSpiski, 2).getValue() + 1)
}



//////////////////////////////////////////////////////////

//Sotr2
// получаем массив сотрудников (функцией отбора уникальных значений)
function sotrArr() {
  // находим номер колонки по имени
  const numColSotr = numColElementa(dataSheet(), 'Співробітник').numCol
  return getDropDownArray(dataSheet(), 2, numColSotr)
}

// выборка по заданному сотруднику

//возвращаем работы по сотрудникам

function testSotrCount() {
  let res1 = []
  let res2 = []
  let res3 = []
  const sArr = sotrArr()
  //sArr.splice(sArr.indexOf('Мельник'), 1)
  sArr.forEach(function (elem, index) {
    if (sotr(elem) != '') {
      res1 = res1.concat(elem + '-' + sotr(elem).length)
      res3 = res3.concat(elem)
      res2 = res2.concat(sotr(elem).map(x => [elem, formatDateDDdotMMdotYYYY(x[1]), x[2], x[3], x[5]]));
    }
  })
  let res = { res1: res1, res2: res2, res3: res3 }
  return res
}

function sotr(unit) {
  const values = dataSheet().getDataRange().getValues()
  returnRows = values.filter(x => (x[6] === unit && x[0] == ''))
  return returnRows;
}
/////////////////////////////////////////////////
//INSPEKTOR
function inspektorGs() {
  return dataInspektor().getRange(2, 1, dataInspektor().getLastRow() - 1, 2).getValues()
}

// отбор данных для модального окна
function debtsToInspectorsGs() {
  return dataBase().getRange(2, 1, dataBase().getLastRow(), 20).getValues()
    .map(x => [x[5], x[2], x[15], x[16], x[17]])
    //.filter(x => (x[2] === insp && x[3] != x[4]));
    .filter(x => (x[3] != x[4]));
}

////////////////////////////////////
//СНИППЕТЫ
//Сниппет для определения последней заполненной строки
function getLastRowFunc(sheet, column) {
  var data = sheet.getDataRange().getValues();
  var lr = 0;
  data.forEach(function (x, index) {
    if (x[column - 1] != '') {
      lr = index;
    }
  })
  return lr + 1
}

//просмотр всей таблицы в тРеестр
function getData() {
  var spreadSheetId = "1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ"; //CHANGE
  var dataRange = "База!A2:Z"; //CHANGE
  var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  var values = range.values.filter(x => x[5] != '');
  return values;
}

//просмотр всей таблицы в тРеестр2
function getData2() {
  var spreadSheetId = "1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ"; //CHANGE
  var dataRange = "База!A2:Z"; //CHANGE
  var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  var values = range.values.filter(x => x[5] != '').map(x => [x[0], x[1], x[2], x[3], x[5], x[6], x[15], x[16], x[17], x[21]]);
  return values;
}

//просмотр всей таблицы в Финансы
function getDataTableFinance() {
  var spreadSheetId = "1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ"; //CHANGE
  var dataRange = "Финансы!A100:Z"; //CHANGE
  var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  var values = range.values.filter(x => x[0] != '').map(x => [x[0], strongToNumber(x[1]), x[2], x[3], x[4], x[5], x[6], x[14], x[15], x[16]]);
  return values;
}

//просмотр всей таблицы в job
function getDataTableJob() {
  var spreadSheetId = "1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ"; //CHANGE
  var dataRange = "job!A100:J"; //CHANGE
  var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  var values = range.values.filter(x => x[0] != '').map(x => [x[0], x[1], x[3], x[4], x[5], x[9]]);
  return values;
}

//Сниппет поиска номера столбца и строки
function numColElementa(sheet, element) {
  const range = sheet.getDataRange();
  const values = range.getValues();
  for (let i = 0; i < values.length; i++) {
    for (let ii = 0; ii <= values[i].length; ii++) {
      if (values[i][ii] === element) {
        return {
          nameRow: 'строка', numRow: i + 1,
          nameCol: 'столбец', numCol: ii + 1
        };
      }
    }
  }
}

// Сниппет строка в число
function strongToNumber(str) {
  const replaceSpace = str.replace(/\s+/g, ''); // удаляем пробелы
  const replacePoint = replaceSpace.replace(/,/, '.'); // запятую на точку
  const parsFlo = parseFloat(replacePoint); // строка в число
  const toFixTwu = parsFlo.toFixed(2); // округляем до 2 знаков после запятой
  return toFixTwu
}

// Сниппет текст в дату 
function strongToDate(st) {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(st.replace(pattern, '$3-$2-$1'));
}

//модальное окно Приход-Расход
function deleteRowArriwalModal(id) {
  dataArriwal().deleteRow(id)
}

function deleteRowWasteModal(id) {
  dataWaste().deleteRow(id)
}

function changesRowArriwalModal(id, data) {
  dataArriwal().getRange(id, 1, 1, 5).setValues(data)
}

function changesRowWasteModal(id, data) {
  dataWaste().getRange(id, 1, 1, 5).setValues(data)
}

function changesRowFinanceModal(id, data, checkBox) {
  const row = numColElementa(dataFinance(), +id).numRow;
  dataFinance().getRange(row, 1, 1, 6).setValues(data);
  // обработка вставки "частичная оплата"
  issuePart(checkBox, data[0][0]);
}

function changesRowFinanceYFT(id, date) {
  const row = numColElementa(dataFinance(), +id).numRow;
  dataFinance().getRange(row, 4).setValue(date);
}