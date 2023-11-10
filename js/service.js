// заміна дублікатів і пустот в ID таблиці Фінанси
const removalDuplicates = () => {
  const sheet = dataFinance();
  const lr = sheet.getLastRow();
  let values = sheet.getRange(100, 7, lr-99, 1).getValues().flat();
  const seen = new Set();
  const res = values.map(val => {
    val = (val < 10000) ? [cripto()] : val;
    if (seen.has(val)) return [cripto()];
    seen.add(val);
    return [val];
  });
  sheet.getRange(100, 7, lr-99, 1).setValues(res);
}