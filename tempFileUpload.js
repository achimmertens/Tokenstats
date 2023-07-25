const { uploadFileToBackBlaze, getTokenAndUrl } = require('./imageUpload');

// Funktion, um eine Pause einzufügen
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  // Rufe die Funktion mit dem Dateinamen als Übergabeparameter auf
  const result = await getTokenAndUrl();
  console.log("Der result in der main Methode sieht so aus: ", result);
 
  var fileFolder = 'screenshots_2023-07-21/Alive';
  var fileName = '01_BoughtALiveByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);
  
  fileName = '02_TopTenBeerBuyers.png'; // Hier den gewünschten Dateinamen eintragen
  fileFolder = "screenshots_2023-07-21\/BEER";
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  fileName = '05_PriceOfLeo.png'; // Hier den gewünschten Dateinamen eintragen
  fileFolder = "screenshots_2023-07-21\/LEO";
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

}



main();
