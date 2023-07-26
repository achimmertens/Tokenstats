const { uploadFileToBackBlaze, getTokenAndUrl } = require('./imageUpload');
const folderDate = '2023-07-21';

// Funktion, um eine Pause einzufügen
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ToDo: Wenn eine Datei fehlt, stürzt das Programm ab. Fehlertolerenaz einbauen.

async function main() {
  // Rufe die Funktion mit dem Dateinamen als Übergabeparameter auf
  const result = await getTokenAndUrl();
  console.log("Der result in der main Methode sieht so aus: ", result);
  // ------ ALIVE -----
  var fileFolder = 'screenshots_'+folderDate+'\/Alive';
  var fileName = '01_BoughtALiveByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);
  
  var fileName = '02_TopTenAliveBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '03_CommulatedAmountOfBoughtAlive.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '04_CommulatedAmountOfSoldAlive.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '05_PriceOfAlive.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);
  
  //----- BEER   ---
  var fileFolder = 'screenshots_'+folderDate+'\/BEER';
  var fileName = '01_bought_beer_by_time.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);
  
  var fileName = '02_TopTenBeerBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '03_CommulatedAmountOfBoughtBeer.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '04_CommulatedAmountOfSoldBeer.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '05_PriceOfBeer.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);



  // --- LEO ---
   var fileFolder = 'screenshots_'+folderDate+'\/LEO';
  var fileName = '01_BoughtLeoByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);
  
  var fileName = '02_TopTenLeoBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '03_CommulatedAmountOfBoughtLeo.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '04_CommulatedAmountOfSoldLeo.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '05_PriceOfLeo.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  // --- POB ---
  var fileFolder = 'screenshots_'+folderDate+'\/POB';
  var fileName = '01_BoughtPobByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);
  
  var fileName = '02_TopTenPobBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '03_CommulatedAmountOfBoughtPob.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '04_CommulatedAmountOfSoldPob.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '05_PriceOfPob.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  // --- SPT ---
  var fileFolder = 'screenshots_'+folderDate+'\/SPT';
  var fileName = '01_BoughtSptByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);
  
  var fileName = '02_TopTenSptBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '03_CommulatedAmountOfBoughtSpt.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '04_CommulatedAmountOfSoldSpt.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);

  var fileName = '05_PriceOfSpt.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(2000);


// --- OtherTokens ---
var fileFolder = 'screenshots_'+folderDate+'\/Token';

var fileName = '01_HivePerToken.png';
await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
console.log('Warte 2 Sekunden...');
await sleep(2000);

var fileName = '02_USDPerToken.png';
await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
console.log('Warte 2 Sekunden...');
await sleep(2000);

var fileName = '03_TableOfTokenPrices.png';
await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
console.log('Warte 2 Sekunden...');
await sleep(2000);

// var fileName = '04_HivePrice.png';
// await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
// console.log('Warte 2 Sekunden...');
// await sleep(2000);

}

main();