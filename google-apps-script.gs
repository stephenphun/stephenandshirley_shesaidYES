function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP");
    if (!sheet) throw new Error('Sheet tab "RSVP" was not found.');

    var data = e.parameter;
    var phone = String(data.phone || "").trim();

    // Keep phone numbers as text so leading zeroes and +country codes are preserved.
    sheet.appendRow([
        data.name || "",
        phone ? "'" + phone : "",
        data.pax || "0",
        data.attendance || "",
        data.church || "No",
        data.cafe || "No",
        new Date()
    ]);

    return ContentService.createTextOutput("Success");
}
