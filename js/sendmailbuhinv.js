const sendEmailBuhInvoice = dataForMessage => {

  let { sendbuhcurrency, sendbuhprim, sendbuhforma, sendbuhvat, sendbuhproekt, sendbuhsumma, sendbuhcont } = dataForMessage;

  let body = "";
  if (!sendbuhsumma) {
    body += `<br>${sendbuhcont}`;
    sendbuhproekt = '';
  } else {

    body += `<p style="font-size: 14px;">Проєкт: пр${sendbuhproekt}`;
    body += `<br>${sendbuhsumma} ${sendbuhcurrency} з ${sendbuhforma}`;
    if (sendbuhforma.toLowerCase() != 'фоп') {
      body += ` ${sendbuhvat}`;
    }
    if (sendbuhprim) {
      body += `<br>${sendbuhprim}`;
    }
    if (sendbuhcont) {
      body += `<br>${sendbuhcont}`;
    }
    body += `</p>`;
  }
  MailApp.sendEmail("friedmanukraine@gmail.com, vat.friedman@gmail.com", `Виставити рахунок до пр${sendbuhproekt}`, "тіло електронного листа", {
    name: 'Віталий Мельник (Фрідман-Україна)',
    htmlBody: body
  });
}