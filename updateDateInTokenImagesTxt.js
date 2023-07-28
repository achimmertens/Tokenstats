const fs = require('fs');

// Funktion, um das aktuelle Datum im Format 'YYYY-MM-DD' zu erhalten
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate() - 3).padStart(2, '0');
    console.log("Das Datum in den Links wird gesetzt auf: ", `${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
}

// Funktion, um den Inhalt der Textdatei zu lesen und die Links zu aktualisieren
function updateLinksInTextFile(filePath, currentDate, token) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return;
        }

        // Ersatzfunktion zum Ersetzen des Datums und des Tokens in den Links
        function replaceLinksWithCurrentDateAndToken(match, text, link) {
            console.log("currentDate = ", currentDate);
            const updatedLink = link.replace(/screenshots_[\d-]+/, `screenshots_${currentDate}`);
            return `[${text}](${updatedLink.replace(/\/ALIVE\//, `/${token}/`)})`;
        }

        // Links im Text aktualisieren
        const updatedData = data.replace(/\[([^\]]+)\]\((https:\/\/f005\.backblazeb2\.com\/file\/Hive-Upload\/screenshots_[\d-]+\/ALIVE\/[^\)]+)\)/g, (match, text, link) => replaceLinksWithCurrentDateAndToken(match, text, link, token));
        console.log('updatedData', updatedData);

        // Aktualisierten Text in die Datei schreiben
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Fehler beim Schreiben der Datei:', err);
            } else {
                console.log('Links in ', filePath, ' erfolgreich aktualisiert!');
            }
        });
    });
}

const currentDate = getCurrentDate();
let tokens = ["ALIVE", "BEER", "LEO", "POB", "SPT"];
for (let token of tokens) {
    let textFilePath = `./${token}images.txt`;
    updateLinksInTextFile(textFilePath, currentDate, token);
}
