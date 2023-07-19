const { authHeader } = require('./config'); // Pfade entsprechend anpassen

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
    // Extrahiere den Autorisierungs-Token aus der Antwort
    const authToken = data.authorizationToken;

    // Gib den Autorisierungs-Token zurück
    return authToken;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Funktion aufrufen und das Ergebnis in eine Variable laden
async function main() {
  const authToken = await getAuthorizationToken();
  console.log('Authorization-Token:', authToken);
}

main();
