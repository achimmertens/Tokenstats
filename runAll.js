const { exec } = require('child_process');

// 1. "node surfKibana.js" ausführen. (Achtung: Die Tokenordner werden alle gelöscht!)
console.log('node surfKibana.js wird gestartet.');
exec('node surfKibana.js', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${err}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    // 2. "node getCoinMarketCap.js" ausführen.
    console.log('node getCoinMarketCap.js wird gestartet.');
    exec('node getCoinMarketCap.js', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${err}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        // 3. "node FileUploadToBackBlaze.js" ausführen.
        console.log('node FileUploadToBackBlaze.js wird gestartet.');
        exec('node FileUploadToBackBlaze.js', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${err}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            // 4. "node updateDateInTokenImagesTxt.js" ausführen, um das Datum in den jeweiligen TokenImages.txt zu aktualisieren.
            console.log('node updateDateInTokenImagesTxt.js wird gestartet.');
            exec('node updateDateInTokenImagesTxt.js', (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error: ${err}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);

                // 5. "node createText.js" hier ausführen, um die Textbausteine für die jeweiligen Token zu erstellen.
                console.log('node createText.js wird gestartet.');
                exec('node createText.js', (err, stdout, stderr) => {
                    if (err) {
                        console.error(`Error: ${err}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.error(`stderr: ${stderr}`);

                    // 6. Die Text.mds der Token überprüfen.
                    console.log('Bitte überprüfen Sie die Text.mds der Token.');

                    // 7. "node copyScreenshotsFolder.js" um den aktuellen Screenshots-Ordner nach "screenshots" zu kopieren. (Achtung! screenshots wird überschrieben!)
                    console.log('node copyScreenshotsFolder.js wird gestartet.');
                    exec('node copyScreenshotsFolder.js', (err, stdout, stderr) => {
                        if (err) {
                            console.error(`Error: ${err}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                        console.error(`stderr: ${stderr}`);

                        // Konsole-Ausgaben der einzelnen Skripte anzeigen
                        console.log('--- Ausgabe von surfKibana.js ---');
                        console.log(stdout);
                        console.error(stderr);

                        console.log('--- Ausgabe von getCoinMarketCap.js ---');
                        console.log(stdout);
                        console.error(stderr);

                        console.log('--- Ausgabe von FileUploadToBackBlaze.js ---');
                        console.log(stdout);
                        console.error(stderr);

                        console.log('--- Ausgabe von updateDateInTokenImagesTxt.js ---');
                        console.log(stdout);
                        console.error(stderr);

                        console.log('--- Ausgabe von createText.js ---');
                        console.log(stdout);
                        console.error(stderr);

                        console.log('--- Ausgabe von copyScreenshotsFolder.js ---');
                        console.log(stdout);
                        console.error(stderr);

                    });
                });
            });
        });
    });
});
