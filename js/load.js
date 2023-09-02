const URLREESTR = () => {
  return 'https://docs.google.com/spreadsheets/d/1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ/edit#gid=627167327'
}
const URLUPRAV = () => {
  return 'https://docs.google.com/spreadsheets/d/1xdJVfecdUCgtF_SHiC_IHbl8FP0Agl3slV_osyj6kxo/edit#gid=0'
}
const URLBUH = () => {
  return 'https://docs.google.com/spreadsheets/d/1bd-YnMzDO8An3pGAniQXbFAPC1IWq5SSBlHK0pW2hVI/edit#gid=1139650230'
}
const URLTERMINAL = () => {
  return 'https://docs.google.com/spreadsheets/d/1af9HbQ5cVnX_buV3rKjEvwuAVvSS-PuuDEHWrBqytcw/edit#gid=797242095'
}
const URLKARANTIN = () => {
  return 'https://docs.google.com/spreadsheets/d/1OWkpbCN9oDoWtUm52ZdcNGTwiXp7qNgMxBYC10PmAsY/edit#gid=797242095'
}

const dataInspektor = () => {
  const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("Инспектор")
  return ret
}

const dataSheet = () => {
  const ret = SpreadsheetApp.openByUrl(URLUPRAV()).getSheetByName("База")
  return ret
}

/* const dataSpiski = () => {
    const ret = SpreadsheetApp.openByUrl(URLUPRAV()).getSheetByName("Списки")
    return ret
} */

const dataFinance = () => {
  const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("Финансы")
  return ret
}

/* const dataSpiskiReestr = () => {
    const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("Списки")
    return ret
} */

const dataVrabote = () => {
  const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("В работе")
  return ret
}

const dataArriwal = () => {
  const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("Прочие поступления")
  return ret
}

const dataWaste = () => {
  const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("Прочие траты")
  return ret
}

const dataBase = () => {
  const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("База")
  return ret
}

const dataTerminal = () => {
  const ret = SpreadsheetApp.openByUrl(URLTERMINAL()).getSheetByName("Оплата")
  return ret
}

const dataKarantin = () => {
  const ret = SpreadsheetApp.openByUrl(URLKARANTIN()).getSheetByName("Оплата")
  return ret
}

const dataJob = () => {
  const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("job")
  return ret
}

const ssBuhSheet = () => {
  const ret = SpreadsheetApp.openByUrl(URLBUH()).getSheetByName('РАХУНКИ')
  return ret
}

const dataUpravlIA = () => {
  const ret = SpreadsheetApp.openByUrl(URLREESTR()).getSheetByName("Управление ИА СЧЕТА")
  return ret
}

function doGet() {
  return HtmlService.createTemplateFromFile('main-HTML').evaluate()
    //Responsive
    .addMetaTag('viewport', 'width=device-width, initial-scale=1 maximum-scale=1')
    .setTitle('Portal Friedman')
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)

    .getContent();
}

/* function doGet() {
  return HtmlService.createTemplateFromFile('main-HTML').evaluate()
    //Responsive
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('Portal Friedman')
} */

/* function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)

    .getContent();
} */


