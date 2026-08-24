import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName = "transactions") => {
  if (!data || data.length === 0) {
    alert("Nothing to export!");
    return;
  }

  try {
    const worksheet = XLSX.utils.json_to_sheet(data);

    //   Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    //   Generate a Excel file and trigger download
    XLSX.writeFile(workbook, `${fileName}.xlsx`, {
      bookType: "xlsx",
      type: "array",
    });
  } catch (error) {
    console.error("Export error:", error);
    alert("Failed to export data. Give it another shot.");
  }
};
