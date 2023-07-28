const fs = require('fs');
let tokens = ["ALIVE", "BEER", "LEO", "POB", "SPT"];
let currentDate = new Date().toISOString().split('T')[0]; // Aktuelles Datum im Format "YYYY-MM-DD"
console.log("Das Datum wird gesetzt auf: ", currentDate);

for (let token of tokens) {
  let textFilePath = `./${token}images.txt`;
  updateLinksInTextFile(textFilePath, currentDate, token);
}

function updateLinksInTextFile(textFilePath, currentDate, token) {
  // Lese den Inhalt der Datei
  let fileContent = readFile(textFilePath);
  // Ersetze das Datum in den Textstrings
  let updatedContent = fileContent.replace(/(\d{4}-\d{2}-\d{2})/g, currentDate);
  // Schreibe den aktualisierten Inhalt zurück in die Datei
  writeFile(textFilePath, updatedContent);
  console.log(`Datum in ${textFilePath} wurde aktualisiert für Token ${token}`);
}

function readFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      console.log("Die Datei ",filePath," wurde gelesen.")
      return fileContent;
    } catch (error) {
      console.error(`Fehler beim Lesen der Datei ${filePath}: ${error}`);
      return null;
    }
  }  

  function writeFile(filePath, content) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Datei ${filePath} erfolgreich geschrieben.`);
    } catch (error) {
      console.error(`Fehler beim Schreiben der Datei ${filePath}: ${error}`);
    }
  }
