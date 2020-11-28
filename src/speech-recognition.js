class SpeechRecognitionModule {
  constructor() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
  }

  listen(callback) {
    this.recognition.addEventListener("result", (e) => {
      const { results } = e;
      const words = Array.from(results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      if (results[0].isFinal) {
        if (typeof callback === "function") {
          callback(words);
        }
      }
    });
    this.recognition.addEventListener("end", this.recognition.start);
    this.recognition.start();
  }
}

export const speechRecognitionModule = new SpeechRecognitionModule();
