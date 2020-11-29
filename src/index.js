import "./index.css";
import { speechRecognitionModule } from "./speech-recognition.js";
import { fileExport } from "./file-export.js";

class QuickNote {
  constructor() {
    this.startSpeechRecognition();
    this.showHelperText = true;
    this.showDownloadButton = false;
    document.getElementById("download-icon").addEventListener("click", () => {
      this.exportToFile();
    });
  }

  startSpeechRecognition = () => {
    const wordsContainer = document.querySelector(".notes_words-container");
    speechRecognitionModule.listen((words) => {
      const p = document.createElement("p");
      p.textContent = words;
      wordsContainer.appendChild(p);
      this.toggleHelperText(false);
      this.toggleDownloadButton(true);
    });
  };

  init() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.addEventListener("result", (e) => {
      const { results } = e;
      const words = Array.from(results).map((result) => result[0]);
      console.log(words);
    });
    this.recognition.start();
  }

  toggleDownloadButton = (status) => {
    const downloadButton = document.querySelector(".download-icon-container");
    if (this.showDownloadButton === false && status === true) {
      downloadButton.style.visibility = "visible";
      this.showDownloadButton = true;
    } else if (this.showDownloadButton === true && status === false) {
      downloadButton.style.visibility = "hidden";
      this.showDownloadButton = false;
    }
  };

  toggleHelperText = (status) => {
    const helperTextContainer = document.querySelector(
      ".notes_helper-text-container"
    );
    if (this.showHelperText === false && status === true) {
      helperTextContainer.style.display = "flex";
      this.showHelperText = true;
    } else if (this.showHelperText === true && status === false) {
      helperTextContainer.style.display = "none";
      this.showHelperText = false;
    }
  };

  exportToFile = () => {
    const notes = Array.from(
      document.querySelector(".notes_words-container").children
    );
    let notesString = "";
    notes.map((note) => {
      notesString += `\n${note.innerHTML}`;
    });
    fileExport.createDoc(notesString);
  };
}

const quickNote = new QuickNote();
