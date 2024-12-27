// отримуємо всі дані з таблиці КЕШ Рома
function getRecordsCashe() {
  const key = 'PRHisAGc';
  const spredSheet = dataCashe();
  const lr = cellIndex(spredSheet, key);
  const dataRecordsCashe = dataCashe().getRange(`A5692:E${lr - 1}`).getValues(); 
  const dataMapCashe = dataRecordsCashe.map(x => [(x[0]), (x[1]), x[2], x[3], x[4]]);
  const res = delSpaceCol(dataMapCashe);  

  /* const A3 = dataCashe().getRange(`A3`).getValue(); 
  return JSON.stringify(A3);
 */















  return JSON.stringify(res.reverse());
}

//функція розмножує дані першого стовбця на пустоти знизу в першому стовбці і видаляє строки із пустим другим стовбцем
function delSpaceCol(data) {
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i + 1][0] === '') {
      data[i + 1][0] = data[i][0]
    }
  }
  return data.filter(el => el[1] != '')
}