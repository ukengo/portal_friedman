function loadPartialHTML_(partial) {
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent();
}

function loadArriwalWasteView() {
  return loadPartialHTML_('arriwalwaste/arriwalWaste');
}


function loadAddPrivateCommissionView() {
  return loadPartialHTML_('privateCommission');
}

function loadNewProektView() {
  return loadPartialHTML_('newproekt/newProekt');
}

function loadBuhgalterView() {
  return loadPartialHTML_('BUHGALTER/BUHGALTER');
}

/* function loadTableUpravlenieView() {
  return loadPartialHTML_('tableUpravlenie');
} */

function loadTableFinanceView() {
  return loadPartialHTML_('finance/finance');
}

function loadTableReestrView() {
  return loadPartialHTML_('reestr/tableReestr');
}

function loadTableJobView() {
  return loadPartialHTML_('job/job');
}