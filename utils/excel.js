// Utility to write registration data to Excel using exceljs
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs").promises;

const dataDir = path.join(__dirname, "..", "data");
const excelFile = path.join(dataDir, "registrations.xlsx");

async function writeRegistrationToExcel(entry) {
  try {
    await fs.mkdir(dataDir, { recursive: true });

    let workbook, worksheet;
    try {
      await fs.access(excelFile);
      workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(excelFile);
      worksheet = workbook.getWorksheet("Registrations");
      if (!worksheet) {
        worksheet = workbook.addWorksheet("Registrations");
        worksheet.addRow([
          "ID",
          "Full Name",
          "Email",
          "Affiliation",
          "Category",
          "Mode",
          "Comments",
          "Created At",
        ]);
      }
    } catch (e) {
      workbook = new ExcelJS.Workbook();
      worksheet = workbook.addWorksheet("Registrations");
      worksheet.addRow([
        "ID",
        "Full Name",
        "Email",
        "Affiliation",
        "Category",
        "Mode",
        "Comments",
        "Created At",
      ]);
    }
    worksheet.addRow([
      entry.id,
      entry.fullName,
      entry.email,
      entry.affiliation,
      entry.category,
      entry.mode,
      entry.comments,
      entry.createdAt,
    ]);
    await workbook.xlsx.writeFile(excelFile);
  } catch (error) {
    throw error;
  }
}

module.exports = { writeRegistrationToExcel };
