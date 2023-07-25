const { uploadFileToBackBlaze, getTokenAndUrl } = require('./imageUpload');

async function file00(){
  const fileFolder = 'screenshots_2023-07-21/Alive';
  const fileName = '01_BoughtALiveByTime.png';




  console.log("---------- Aufruf der Methode uploadFileToBackBlaze ---------");
  const uploadAuthToken = await uploadFileToBackBlaze(fileFolder, fileName, authToken, uploadUrl);

  if (!uploadAuthToken) {
    console.log('Fehler beim Hochladen der Datei.');
    return;
  }

  console.log('UploadAuthToken aus der tempFileUpload Methode lautet: ', uploadAuthToken);
  return uploadAuthToken, uploadUrl
}

async function file01 (uploadAuthToken){
  fileName = '02_TopTenBeerBuyers.png'; // Hier den gewünschten Dateinamen eintragen
  fileFolder = "screenshots_2023-07-21\/BEER";
  uploadAuthToken2 = await uploadFileToBackBlaze(fileFolder, fileName, uploadAuthToken);
  if (uploadAuthToken2) {
    console.log('Datei wurde wahrscheinlich erfolgreich hochgeladen.');
    console.log('UploadAuthToken2 aus der tempFileUpload Methode lautet: ', uploadAuthToken2);
  } else {
    console.error('Fehler beim Hochladen der Datei');
  }
}



async function main() {
  // Rufe die Funktion mit dem Dateinamen als Übergabeparameter auf

  const result = await getTokenAndUrl();
  console.log("Der result in der main Methode sieht so aus: ", result);
 
  var fileFolder = 'screenshots_2023-07-21/Alive';
  var fileName = '01_BoughtALiveByTime.png';

  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)

  fileName = '02_TopTenBeerBuyers.png'; // Hier den gewünschten Dateinamen eintragen
  fileFolder = "screenshots_2023-07-21\/BEER";
    
  await uploadFileToBackBlaze(fileFolder, fileName, result.uploadAuthToken, result.uploadUrl)

}



main();
