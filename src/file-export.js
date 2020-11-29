import { jsPDF } from "jspdf";

class FileExport {
  createDoc = (note) => {
    const doc = new jsPDF();
    doc.text(note, 10, 10);
    doc.save("notes.pdf");
  };
}

export const fileExport = new FileExport();
