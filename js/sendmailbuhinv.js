const sendEmailBuhInvoice = dataForMessage => {

  dataForMessage = {
    numProekt: 15555,
    summa: 1500,
    currency: 'грн',
    forma: 'фоп',
    contact: 'contact',
    vat: 'з ПДВ',
  }
  const { numProekt, summa, currency, forma, contact, vat } = dataForMessage;
  let body = "";
  if (!numProekt || !forma || !currency) return;
  body += `<p>Проєкт: пр${numProekt}<br>`;
  body += `Сума: ${summa} ${currency}`;
  if (forma.toLowerCase() != 'фоп') {
    body += ` ${vat}<br>`;
  }
  body += `Підприємство: ${forma}<br>`;
  if (contact) {
    body += `Контакт: ${contact}`;
  }

  MailApp.sendEmail("friedmanukraine@gmail.com", `Виставити рахунок до пр${numProekt}`, "тіло електронного листа", {
    name: 'Віталий Мельник (Фрідман-Україна)',
    htmlBody: body
  });
}