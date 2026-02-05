// Given a spreadsheet with student data, this script generates report cards by copying a Google Doc template, 
// replacing placeholders with actual student data, and saving the generated report cards in a specified folder.

function generateReportCards() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[3];
  const class_ = data[0][1];
  const namesStartAt = 5;
  const academicYear = data[2][1].toString();
  
  // Open the Google Doc template
  const templateId = ""; // Replace with your Doc ID

  //Folder
  // const folderId = ""; // Replace with your folder ID

  // Loop through each student (skip header row)
  for (let i = namesStartAt; i < data.length; i++) { // 
    const row = data[i];
    // Make a copy of the template
    const newReport = DriveApp.getFileById(templateId).makeCopy(`Report Card ${class_} - ${row[1]}`);
    const reportDoc = DocumentApp.openById(newReport.getId());
    const body = reportDoc.getBody();
    // Formatting date
    const dob = Utilities.formatDate(row[2], "IST", "dd-MMM-yyyy");
    // Adding the date of birth and academic year to file
    body.replaceText(`{{DOB}}`, dob || "");
    body.replaceText(`{{Academic_Year}}`, academicYear || "");
    // Replace placeholders with actual data
    for (let j = 1; j < headers.length; j++) {
      body.replaceText(`{{${headers[j]}}}`, row[j] || ""); // Handles empty cells
    }
    // Move to final destination
    const folder = DriveApp.getFoldersByName("Report Cards");
    newReport.moveTo(folder.next());
    
  }
  
  SpreadsheetApp.getUi().alert("Report cards generated successfully!");
}
/*
function convertFilesToPDF(){
  // Make a PDF
    const pdf = newReport.getAs(MimeType.PDF);
    DriveApp.createFile(pdf).setName("Name");
    const pdfFolder = DriveApp.getFolderById("1zTCJZCds4JfRiTdjOz9vSWWUB6LSbIMU");
    //DriveApp.createFile(pdf).setName(`Report Card ${class_} - ${row[1]}.pdf`).moveTo(pdfFolder);
}
*/