const URLS = {
  REESTR: 'https://docs.google.com/spreadsheets/d/1ewk6ahWyREzSUe985l3zm_LblKpdjXs6rAHd71hXzwQ/edit#gid=627167327',
  UPRAV: 'https://docs.google.com/spreadsheets/d/1xdJVfecdUCgtF_SHiC_IHbl8FP0Agl3slV_osyj6kxo/edit#gid=0',
  BUH: 'https://docs.google.com/spreadsheets/d/1bd-YnMzDO8An3pGAniQXbFAPC1IWq5SSBlHK0pW2hVI/edit#gid=1139650230',
  TERMINAL: 'https://docs.google.com/spreadsheets/d/1af9HbQ5cVnX_buV3rKjEvwuAVvSS-PuuDEHWrBqytcw/edit#gid=797242095',
  KARANTIN: 'https://docs.google.com/spreadsheets/d/1OWkpbCN9oDoWtUm52ZdcNGTwiXp7qNgMxBYC10PmAsY/edit#gid=797242095',
  CAHE: 'https://docs.google.com/spreadsheets/d/1Y6ukb_iQ0JpPt2nTGvZx0HjWMJ2ACWD0iQDlV9Rjr7s/edit?gid=928954653#gid=928954653'
};

const getSheet = (url, sheetName) => {
  return SpreadsheetApp.openByUrl(url).getSheetByName(sheetName);
};

// Функции для получения нужных листов
const dataInspektor = () => getSheet(URLS.REESTR, 'Инспектор');
const dataSheet = () => getSheet(URLS.UPRAV, 'База');
const dataFinance = () => getSheet(URLS.REESTR, 'Финансы');
const dataSpiskiReestr = () => getSheet(URLS.REESTR, 'Списки');
const dataVrabote = () => getSheet(URLS.REESTR, 'В работе');
const dataArriwal = () => getSheet(URLS.REESTR, 'Прочие поступления');
const dataWaste = () => getSheet(URLS.REESTR, 'Прочие траты');
const dataBase = () => getSheet(URLS.REESTR, 'База');
const dataTerminal = () => getSheet(URLS.TERMINAL, 'Оплата');
const dataKarantin = () => getSheet(URLS.KARANTIN, 'Оплата');
const dataJob = () => getSheet(URLS.REESTR, 'job');
const ssBuhSheet = () => getSheet(URLS.BUH, 'РАХУНКИ');
const dataUpravlIA = () => getSheet(URLS.REESTR, 'Управление ИА СЧЕТА');
const dataCashe = () => getSheet(URLS.CAHE, 'Лист1');
const dataCashe_2 = () => getSheet(URLS.CAHE, 'Аркуш1 (копия)');

// Функции для работы с HTML
function doGet() {
  return HtmlService.createTemplateFromFile('main-HTML').evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1 maximum-scale=1')
    .setTitle('Portal Friedman');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .getContent();
}
