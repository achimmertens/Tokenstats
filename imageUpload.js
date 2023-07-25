const { authHeader } = require('./config');
const fs = require('fs');
const crypto = require('crypto');
const bucketId = "d86af4770152d3218e8d0b1b";
const url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account';
var uploadAuthToken = '';
var apiUrl = '';
var uploadUrl = '';
var uploadAuthToken = '';

console.log('---------- Results of getAUthorizationToken ----------');

async function getAuthorizationToken() {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
      },
    });
    if (!response.ok) {
      throw new Error('Fehler bei der Anfrage: ' + response.status);
    }
    const data = await response.json();
    console.log("data = ", data);
    const authToken = data.authorizationToken;
    const apiUrl = data.apiUrl
    return { authToken, apiUrl };
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function getUploadURL(authToken, apiUrl) {
  const url = apiUrl + '/b2api/v2/b2_get_upload_url';
  console.log('---------- Results of getUploadURL ----------')
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authToken,
      },
      body: JSON.stringify({
        bucketId: bucketId
      })
    });
    if (!response.ok) {
      const data = await response.json();
      console.log("data = ", data);
      throw new Error('Fehler bei der Anfrage: ' + response.status);
    }
    const data = await response.json();
    console.log("data = ", data);
    const uploadUrl = data.uploadUrl;
    const uploadAuthToken = data.authorizationToken
    console.log("Die beiden Werte lauten: ", uploadUrl, uploadAuthToken);
    return { uploadUrl, uploadAuthToken };
  } catch (error) {
    console.error(error.message);
    return null;
  }
}



// Funktion, die den SHA-Wert berechnet
async function calculateSHA1(fileToUpload) {
  return new Promise((resolve, reject) => {
    const sha1sum = crypto.createHash('sha1');
    const stream = fs.createReadStream(fileToUpload);
    stream.on('data', (data) => {
      sha1sum.update(data);
    });
    stream.on('end', () => {
      const sha1 = sha1sum.digest('hex');
      resolve(sha1);
    });
    stream.on('error', (error) => {
      reject(error);
    });
  });
}

// Upload File to BackBlaze
async function uploadFile(fileToUpload, uploadAuthToken, uploadUrl, SHA1) {
  const mime_Type = "b2/x-auto";
  const author = 'AchimMertens'
  // curl -H "Authorization: %UPLOAD_AUTHORIZATION_TOKEN%" -H "X-Bz-File-Name: %FILE_TO_UPLOAD%" -H "Content-Type: %MIME_TYPE%" -H "X-Bz-Content-Sha1: %SHA1_OF_FILE%" -H "X-Bz-Info-Author: unknown" --data-binary "@%FILE_TO_UPLOAD%" %UPLOAD_URL%
  //const fileToUpload = fileFolder + '/' + encodeURIComponent(fileName);
  console.log('---------- Results of uploadFile ----------')
  console.log('fileToUpload = ', fileToUpload)
  console.log('uploadAuthToken = ', uploadAuthToken)
  const fileContent = fs.readFileSync(fileToUpload);
  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': uploadAuthToken,
        'X-Bz-File-Name': fileToUpload,
        'Content-Type': mime_Type,
        'X-Bz-Content-Sha1': SHA1,
        'X-Bz-Info-Author': author,

      },
      body: fileContent
    });
    if (!response.ok) {
      const data = await response.json();
      console.log("data upload = ", data);
      throw new Error('Fehler bei der Anfrage: ' + response.status);
    }
    const data = await response.json();
    console.log("data upload = ", data);
    //const uploadUrl = data.uploadUrl;
    //return uploadAuthToken;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function getTokenAndUrl(){
  const result = await getAuthorizationToken();
      if (result) {
        const { authToken, apiUrl } = result;
        console.log('Authorization-Token:', authToken);
        console.log('API-URL:', apiUrl);
        const uploadResult = await getUploadURL(authToken, apiUrl);
        if (uploadResult) {
          const {uploadUrl, uploadAuthToken} = uploadResult;
          console.log('UploadUrl = ', uploadUrl);
          console.log('uploadAuthToken innerhalb von getTokenAndUrl = ',uploadAuthToken);
          return {uploadAuthToken, uploadUrl}
        } else {
          console.log('Fehler beim Abrufen der Methote GetUploadURL');
        }
      } else {
        console.log('Fehler beim Abrufen des Authorization-Tokens');
      }  
}



// main
async function uploadFileToBackBlaze(fileFolder, fileName, authToken, uploadUrl) {
    // Dateiinhalt lesen
    const fs = require('fs');
    const fileToUpload = `${fileFolder}/${fileName}`;
    const fileContent = fs.readFileSync(fileToUpload);

    // SHA-1 Hash des Dateiinhalts berechnen
    const sha1Hash = crypto.createHash('sha1').update(fileContent).digest('hex');
    console.log("Der sha1Hash Wert in uploadFileToBackBlaze lautet: ", sha1Hash);

    uploadFile(fileToUpload, authToken, uploadUrl, sha1Hash)
}


  




module.exports = { uploadFileToBackBlaze, getTokenAndUrl };
  //main();

