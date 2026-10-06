// ID bảng tính chứa hai tab LoiChuc và XacNhanThamDu.
const SHEET_ID = '1LlDPcFT4VTtYQ6RsHpSQ_EeUJOTBEH1mNkcqoOulTCk';

function doGet(e) {
  if (!e || e.parameter.action !== 'list') {
    return ContentService.createTextOutput('Sổ lưu bút đã sẵn sàng');
  }
  const callback = String(e.parameter.callback || '');
  if (!/^weddingWishes_\d+_\d+$/.test(callback)) {
    return ContentService.createTextOutput('Callback không hợp lệ');
  }
  let result;
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('LoiChuc');
    let wishes = [];
    if (sheet && sheet.getLastRow() > 1) {
      const lastRow = sheet.getLastRow();
      const startRow = Math.max(2, lastRow - 49);
      wishes = sheet.getRange(startRow, 1, lastRow - startRow + 1, 3).getValues()
        .reverse().filter(row => row[1] && row[2]).map(row => ({
          createdAt: row[0] instanceof Date ? row[0].toISOString() : '',
          name: String(row[1]), message: String(row[2]),
        }));
    }
    result = { ok: true, wishes };
  } catch (error) {
    console.error(error);
    result = { ok: false, wishes: [] };
  }
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(result) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || 'wish');
  const name = String(params.name || '').trim();
  const message = String(params.message || '').trim();
  const attendance = String(params.attendance || '');
  if (!name || name.length > 80 ||
      (action !== 'wish' && action !== 'rsvp') ||
      (action === 'wish' && (!message || message.length > 1000)) ||
      (action === 'rsvp' && attendance !== 'yes' && attendance !== 'no')) {
    return ContentService.createTextOutput('Dữ liệu không hợp lệ');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const file = SpreadsheetApp.openById(SHEET_ID);
    const isRsvp = action === 'rsvp';
    const tabName = isRsvp ? 'XacNhanThamDu' : 'LoiChuc';
    let sheet = file.getSheetByName(tabName);
    if (!sheet) {
      sheet = file.insertSheet(tabName);
      sheet.appendRow(isRsvp
        ? ['Thời gian gửi', 'Tên khách', 'Tham dự', 'Số người']
        : ['Thời gian gửi', 'Tên khách', 'Lời chúc']);
    }
    const asText = value => /^[=+\-@]/.test(value) ? "'" + value : value;
    sheet.appendRow(isRsvp
      ? [new Date(), asText(name), attendance === 'yes' ? 'Có' : 'Không', attendance === 'yes' ? 1 : 0]
      : [new Date(), asText(name), asText(message)]);
    SpreadsheetApp.flush();
    return ContentService.createTextOutput('OK');
  } finally {
    lock.releaseLock();
  }
}
