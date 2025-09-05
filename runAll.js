const { spawn } = require('child_process');
const getChromeDriver = require('./downloadChromeDriver');

async function runScript(scriptName) {
    return new Promise((resolve, reject) => {
        console.log(`Starting ${scriptName}...`);
        const process = spawn('node', [scriptName]);
        
        process.stdout.on('data', (data) => {
            console.log(`${scriptName} stdout: ${data}`);
        });
        
        process.stderr.on('data', async (data) => {
            const errorMsg = data.toString();
            console.error(`${scriptName} stderr: ${errorMsg}`);
            
            if (errorMsg.includes('This version of ChromeDriver only supports Chrome')) {
                console.log('Detected outdated ChromeDriver. Attempting to update...');
                const success = await getChromeDriver();
                if (success) {
                    console.log('ChromeDriver updated successfully. Retrying script...');
                    resolve(await runScript(scriptName)); // Retry the script
                    return;
                }
            }
            // For other errors, continue normally
        });
        
        process.on('close', (code) => {
            console.log(`${scriptName} completed with code ${code}`);
            resolve(code);
        });
    });
}

async function runAll() {
    try {
        // Execute scripts in sequence
        await runScript('surfKibana.js');
        await runScript('getCoinMarketCap.js');
        await runScript('FileUploadToBackBlaze.js');
        await runScript('updateDateInTokenImagesTxt.js');
        await runScript('createText.js');
        console.log('Bitte überprüfen Sie die Text.mds der Token.');
        await runScript('copyScreenshotsFolder.js');
        
        console.log('All scripts completed successfully!');
    } catch (error) {
        console.error('Error in script execution:', error);
        process.exit(1);
    }
}

runAll();
