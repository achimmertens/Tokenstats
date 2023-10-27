const { spawn } = require('child_process');

// 1. "node surfKibana.js" ausführen. (Achtung: Die Tokenordner werden alle gelöscht!)
const surfKibana = spawn('node', ['surfKibana.js']);
surfKibana.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
surfKibana.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
surfKibana.on('close', (code) => {
  console.log(`surfKibana.js beendet mit Exit-Code ${code}`);
  
  // 2. "node getCoinMarketCap.js" ausführen.
  const getCoinMarketCap = spawn('node', ['getCoinMarketCap.js']);
  getCoinMarketCap.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  getCoinMarketCap.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  getCoinMarketCap.on('close', (code) => {
    console.log(`getCoinMarketCap.js beendet mit Exit-Code ${code}`);
    
    // 3. "node FileUploadToBackBlaze.js" ausführen.
    const FileUploadToBackBlaze = spawn('node', ['FileUploadToBackBlaze.js']);
    FileUploadToBackBlaze.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    FileUploadToBackBlaze.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    FileUploadToBackBlaze.on('close', (code) => {
      console.log(`FileUploadToBackBlaze.js beendet mit Exit-Code ${code}`);
      
      // 4. "node updateDateInTokenImagesTxt.js" ausführen, um das Datum in den jeweiligen TokenImages.txt zu aktualisieren.
      const updateDateInTokenImagesTxt = spawn('node', ['updateDateInTokenImagesTxt.js']);
      updateDateInTokenImagesTxt.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      updateDateInTokenImagesTxt.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      updateDateInTokenImagesTxt.on('close', (code) => {
        console.log(`updateDateInTokenImagesTxt.js beendet mit Exit-Code ${code}`);
        
        // 5. "node createText.js" hier ausführen, um die Textbausteine für die jeweiligen Token zu erstellen.
        const createText = spawn('node', ['createText.js']);
        createText.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        createText.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        createText.on('close', (code) => {
          console.log(`createText.js beendet mit Exit-Code ${code}`);
          
          // 6. Die Text.mds der Token überprüfen.
          console.log('Bitte überprüfen Sie die Text.mds der Token.');
          
          // 7. "node copyScreenshotsFolder.js" um den aktuellen Screenshots-Ordner nach "screenshots" zu kopieren. (Achtung! screenshots wird überschrieben!)
          const copyScreenshotsFolder = spawn('node', ['copyScreenshotsFolder.js']);
          copyScreenshotsFolder.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
          });
          copyScreenshotsFolder.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
          });
          copyScreenshotsFolder.on('close', (code) => {
            console.log(`copyScreenshotsFolder.js beendet mit Exit-Code ${code}`);
          });
        });
      });
    });
  });
});
