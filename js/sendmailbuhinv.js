/* const sendEmailBuhInvoice = (sendbuhproekt, sendMail) => {
    if (sendbuhproekt) {
    MailApp.sendEmail("friedmanukraine@gmail.com, vat.friedman@gmail.com", `Виставити рахунок до пр${sendbuhproekt}`, "тіло електронного листа", {
      name: 'Віталий Мельник (Фрідман-Україна)',
      htmlBody: sendMail
    })
  }
} */

function sendEmailBuhInvoice(sendbuhproekt, sendMail) {
  Logger.log('start')
  try {
    if (sendbuhproekt) {
      GmailApp.sendEmail("friedmanukraine@gmail.com", `Виставити рахунок до пр${sendbuhproekt}`, "тіло електронного листа", {
        name: 'Віталий Мельник (Фрідман-Україна)',
        htmlBody: sendMail,
       // cc: "vat.friedman@gmail.com"
      });
      Logger.log("Лист успішно надіслано через GmailApp");
    }
  } catch (e) {
    Logger.log("Помилка: " + e.message + "\nStack: " + e.stack);
    throw e;
  }
}