// отримуємо всі дані з таблиці КЕШ Рома
function getRecordsCashe(key, spredSheet, rangeStart) {
  const lr = cellIndex(spredSheet, key);
  console.log(`A${rangeStart}:E${lr - 1}`);
  const dataRecordsCashe = spredSheet.getRange(`A${rangeStart}:E${lr - 1}`).getValues();
  return dataRecordsCashe
}

// отримуємо всі дані з таблиці КЕШ Рома Лист1
function getRecordsCashe1() {
  const rangeStart = '5692'
  const key = 'PRHisAGc'
  const dataRecordsCashe = getRecordsCashe(key, dataCashe(), rangeStart)
  const dataMapCashe = delSpaceCol(dataRecordsCashe).map((x, i) =>
    [+rangeStart + i, formatDateDDdotMMdotYYYY(x[0]), x[1], x[2], x[3], x[4]]);
  return JSON.stringify(dataMapCashe.filter(el => el[2] != ''));
}

//отримуємо всі дані з таблиці КЕШ Рома Аркуш1 (копия)
function getRecordsCashe2() {
  const rangeStart = '1'
  const key = 'PRHisAGc'
  const dataRecordsCashe = getRecordsCashe(key, dataCashe_2(), rangeStart)
  //return JSON.stringify(dataRecordsCashe.filter(el => el[1] != ''));
  return JSON.stringify(dataRecordsCashe);
}

function getRecordsCasheAll() {
  
  return {
    casheRom1: getRecordsCashe1(),
    casheRom2: getRecordsCashe2(),
  }
}

//функція розмножує дані першого стовбця на пустоти знизу в першому стовбці і видаляє строки із пустим другим стовбцем
function delSpaceCol(data) {
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i + 1][0] === '') {
      data[i + 1][0] = data[i][0]
    }
  }
  //return data.filter(el => el[1] != '');
  return data;
}

//запис строчки у таблицю КЕШ Рома
function setRecordsCasheRom(dataModal) {
  const data = [[
    dataModal.casheInputArticle,
    dataModal.casheInputWaste,
    dataModal.casheInputArrival,
    dataModal.casheInputNotes
  ]];
  console.log(data);
  dataCashe().getRange(dataModal.numberRow, 2, 1, 4).setValues(data);
}

//insert
function insertRowCasheRom(row) {
  console.log(row)
  const ss = dataCashe_2()
  const A1Range = ss.getRange(`A1`)
  const C1Range = ss.getRange(`C1`)
  const A1Val = A1Range.getValue()
  C1Range.setValue(A1Val)
  A1Range.setValue(A1Val + row)
}