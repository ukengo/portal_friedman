const sendEmailBuhInvoice = (sendbuhproekt, sendMail) => {
  /* 
    let { sendbuhcurrency, sendbuhprim, sendbuhforma, sendbuhvat, sendbuhproekt, sendbuhsumma, sendbuhcont } = sendMail; */
  /*
    let body = "";
  
    body += `<p style="font-size: 14px;">Проєкт: пр${sendbuhproekt}`;
    if (!sendbuhsumma) {
      body += `<br>${sendbuhcont}`;
      // sendbuhproekt = '';
    } else {
      body += `<br>${sendbuhsumma} ${sendbuhcurrency} з ${sendbuhforma}`;
      if (sendbuhforma.toLowerCase() != 'фоп') {
        body += ` ${sendbuhvat}`;
      }
    }
    if (sendbuhprim) {
      body += `<br>${sendbuhprim}`;
    }
    if (sendbuhcont) {
      body += `<br>${sendbuhcont}`;
    }
    body += `</p>`; */

  /* MailApp.sendEmail("friedmanukraine@gmail.com", `Виставити рахунок до пр${sendbuhproekt}`, "тіло електронного листа", {
    name: 'Віталий Мельник (Фрідман-Україна)',
    htmlBody: sendMail
  }); */
  if (sendbuhproekt) {
    MailApp.sendEmail("friedmanukraine@gmail.com, vat.friedman@gmail.com", `Виставити рахунок до пр${sendbuhproekt}`, "тіло електронного листа", {
      name: 'Віталий Мельник (Фрідман-Україна)',
      htmlBody: sendMail
    })
  }
}