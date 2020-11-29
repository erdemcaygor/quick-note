import "./index.css";
import { speechRecognitionModule } from "./speech-recognition.js";
import { fileExport } from "./file-export.js";

class QuickNote {
  constructor() {
    this.startSpeechRecognition();
    this.showHelperText = true;
  }

  startSpeechRecognition = () => {
    const wordsContainer = document.querySelector(".notes_words-container");
    speechRecognitionModule.listen((words) => {
      const p = document.createElement("p");
      p.textContent = words;
      if (this.showHelperText) this.showHelperText = false;
      wordsContainer.appendChild(p);
    });
  };

  init() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.addEventListener("result", (e) => {
      const { results } = e;
      const words = Array.from(results)
        .map((result) => result[0])
        .map((result) => result.transcript);
      console.log(words);
    });
    this.recognition.start();
  }
}

const quickNote = new QuickNote();