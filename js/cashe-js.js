function getDropDownArrayDescriptionCashe() {
    let arr = getDropDownArray(dataList1(), 6, 2);
    //return arr.splice(0, arr.length-2500);
    //return arr.splice(-1500);
    return arr;
}

function getDropDownArrayremarkCashe() {
    return getDropDownArray(dataList1(), 6, 5);
}

// отправка данных в таблицу
function insertRowCache(data) {
    const spredSheet = dataList1();
    const key = 'PRHisAGc';
    const colA = 'A';
    const colB = 'B';
    if (formatDateYYYYdotMMdotDD((preIndex(spredSheet, key, colA)[1][0])) != formatDateYYYYdotMMdotDD(new Date())) {
        spredSheet.insertRows((preIndex(spredSheet, key, colB)[0]) + 1, 2);
        spredSheet.getRange((preIndex(spredSheet, key, colB)[0]) + 2, 1, 1, 1).setValue(new Date());
    }
    spredSheet.insertRows((preIndex(spredSheet, key, colA)[0]) + 1);
    spredSheet.getRange((preIndex(spredSheet, key, colA)[0]) + 1, 2, 1, 4).setValues(data);
    const quantBlankRow = cellIndex(spredSheet, key) - preIndex(spredSheet, key, colB)[0] - 1
    if (quantBlankRow > 3) {
        spredSheet.deleteRows(preIndex(spredSheet, key, colB)[0] + 1, quantBlankRow - 3);
    }
}

// получаем таблицу
const cashe = () => {
    return 'https://docs.google.com/spreadsheets/d/1Y6ukb_iQ0JpPt2nTGvZx0HjWMJ2ACWD0iQDlV9Rjr7s/edit#gid=661962389'
}

// получаем лист "Лист1" по имени
const dataList1 = () => {
    const ret = SpreadsheetApp.openByUrl(cashe()).getSheetByName('1')
    return ret
}

// ищет индекс предпоследней заполненной ячейки и ее значение в указанной колонке. Колонка указывается буквой
function preIndex(spredSheet, key, col) {
    const index = cellIndex(spredSheet, key);
    const dataArr = spredSheet.getRange(col + '1:' + col + '' + index).getValues();
    for (i = dataArr.length - 2; i >= 0; i--) {
        if (dataArr[i] != '') {
            return [i + 1, dataArr[i]]
        }
    }
}

// ищет номер строки указанной ячейки 
function cellIndex(spredSheet, key) {
    const dataArr = spredSheet.getRange('A1:A').getValues();
    return dataArr.flat().indexOf(key) + 1;
}
