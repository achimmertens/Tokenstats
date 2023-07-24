const {  uploadFileToBackBlaze } = require('./imageUpload');

async function main() {
// Rufe die Funktion mit dem Dateinamen als Übergabeparameter auf
var fileName = '01_BoughtALiveByTime.png'; // Hier den gewünschten Dateinamen eintragen
var fileFolder = "screenshots_2023-07-21\/Alive"
await uploadFileToBackBlaze(fileFolder, fileName)
  .then(() => {
    console.log('Datei wurde wahrscheinlich erfolgreich hochgeladen.');
  })
  .catch((error) => {
    console.error('Fehler beim Hochladen der Datei:', error.message);
  });

fileName = '02_TopTenBeerBuyers.png'; // Hier den gewünschten Dateinamen eintragen
fileFolder = "screenshots_2023-07-21\/BEER"
await uploadFileToBackBlaze(fileFolder, fileName)
  .then(() => {
    console.log('Datei wurde wahrscheinlich erfolgreich hochgeladen.');
  })
  .catch((error) => {
    console.error('Fehler beim Hochladen der Datei:', error.message);
  });
}

main();