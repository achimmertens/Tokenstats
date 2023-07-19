const { authHeader } = require('./config'); 

async function getAuthorizationToken() {
  const url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account';
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
    return {authToken, apiUrl};
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function getUploadURL() {
  const url = 'https://api005.backblazeb2.com/b2api/v2/b2_get_upload_url';
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
    return authToken;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Funktion aufrufen und das Ergebnis in eine Variable laden
async function main() {
  const result = await getAuthorizationToken();
  
  if (result) {
    const { authToken, apiUrl } = result;
    console.log('Authorization-Token:', authToken);
    console.log('API-URL:', apiUrl);
  } else {
    console.log('Fehler beim Abrufen des Authorization-Tokens');
  }
}

main();
