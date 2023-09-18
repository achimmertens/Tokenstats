const { uploadFileToBackBlaze, getTokenAndUrl } = require('./imageUpload');

// Funktion, um eine Pause einzufügen
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ToDo: Wenn eine Datei fehlt, stürzt das Programm ab. Fehlertolerenaz einbauen.

async function main() {
  let currentDate = new Date();
  let currentDateString = currentDate.toISOString().slice(0, 10)
  //const folderDate = '2023-07-21';
  const folderDate=currentDateString
  console.log ("FolderDate = ", folderDate);
  const result = await getTokenAndUrl();
  console.log("Der result von getTokenAndUrl in der main Methode sieht so aus: ", result);
  const duration=3000;
  // ------ ALIVE -----
  var fileFolder = 'screenshots_'+folderDate+'\/Alive';
  var fileName = '01_BoughtAliveByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);
  
  var fileName = '02_TopTenAliveBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '03_CommulatedAmountOfBoughtAlive.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '04_CommulatedAmountOfSoldAlive.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '05_PriceOfAlive.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);
  
  //----- BEER   ---
  var fileFolder = 'screenshots_'+folderDate+'\/BEER';
  var fileName = '01_BoughtBeerByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);
  
  var fileName = '02_TopTenBeerBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '03_CommulatedAmountOfBoughtBeer.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '04_CommulatedAmountOfSoldBeer.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '05_PriceOfBeer.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);



  // --- LEO ---
   var fileFolder = 'screenshots_'+folderDate+'\/LEO';
  var fileName = '01_BoughtLeoByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);
  
  var fileName = '02_TopTenLeoBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '03_CommulatedAmountOfBoughtLeo.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '04_CommulatedAmountOfSoldLeo.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '05_PriceOfLeo.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  // --- POB ---
  var fileFolder = 'screenshots_'+folderDate+'\/POB';
  var fileName = '01_BoughtPobByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);
  
  var fileName = '02_TopTenPobBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '03_CommulatedAmountOfBoughtPob.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '04_CommulatedAmountOfSoldPob.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '05_PriceOfPob.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  // --- SPT ---
  var fileFolder = 'screenshots_'+folderDate+'\/SPT';
  var fileName = '01_BoughtSptByTime.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);
  
  var fileName = '02_TopTenSptBuyers.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '03_CommulatedAmountOfBoughtSpt.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '04_CommulatedAmountOfSoldSpt.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);

  var fileName = '05_PriceOfSpt.png';
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
  console.log('Warte 2 Sekunden...');
  await sleep(duration);


// --- OtherTokens ---
var fileFolder = 'screenshots_'+folderDate+'\/Token';

var fileName = '01_HivePerToken.png';
await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
console.log('Warte 2 Sekunden...');
await sleep(duration);

var fileName = '02_USDPerToken.png';
await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
console.log('Warte 2 Sekunden...');
await sleep(duration);

var fileName = '03_TableOfTokenPrices.png';
await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
console.log('Warte 2 Sekunden...');
await sleep(duration);

// var fileName = '04_HivePrice.png';
// await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)
// console.log('Warte 2 Sekunden...');
// await sleep(duration);

}

main();
