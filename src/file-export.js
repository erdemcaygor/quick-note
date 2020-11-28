import { jsPDF } from "jspdf";

class FileExport {
  createDoc = (textArr, fileName) => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  };
}

export const fileExport = new FileExport();
