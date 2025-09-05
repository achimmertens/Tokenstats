const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

async function downloadFile(url, targetFile) {
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            const file = fs.createWriteStream(targetFile);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', error => {
            fs.unlink(targetFile, () => reject(error));
        });
    });
}

async function getChromeDriver() {
    console.log('Starting Chrome Driver download process...');
    
    // Create Chromedriver directory if it doesn't exist
    const chromedriverDir = path.join(__dirname, 'Chromedriver');
    if (!fs.existsSync(chromedriverDir)) {
        console.log('Creating Chromedriver directory...');
        fs.mkdirSync(chromedriverDir);
    }

    try {
        // Get latest version info
        console.log('Fetching latest Chrome Driver version...');
        const versionUrl = 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json';
        const versionInfo = await new Promise((resolve, reject) => {
            https.get(versionUrl, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(data);
                        console.log('Latest stable version:', parsedData.channels.Stable.version);
                        resolve(parsedData);
                    } catch (e) {
                        reject(e);
                    }
                });
            }).on('error', reject);
        });

        // Explicitly look for chromedriver download URL
        const chromedriverDownload = versionInfo.channels.Stable.downloads.chromedriver;
        if (!chromedriverDownload) {
            throw new Error('ChromeDriver download information not found');
        }

        const win64Download = chromedriverDownload.find(item => item.platform === 'win64');
        if (!win64Download) {
            throw new Error('Windows 64-bit ChromeDriver not found');
        }

        const downloadUrl = win64Download.url;
        console.log(`Found ChromeDriver download URL: ${downloadUrl}`);

        // Download zip file
        const zipFile = path.join(chromedriverDir, 'chromedriver.zip');
        console.log('Downloading Chrome Driver...');
        await downloadFile(downloadUrl, zipFile);

        // Extract zip file
        console.log('Extracting Chrome Driver...');
        const extractCommand = `powershell -command "Expand-Archive -Path '${zipFile}' -DestinationPath '${chromedriverDir}' -Force"`;
        await new Promise((resolve, reject) => {
            exec(extractCommand, (error, stdout, stderr) => {
                if (error) reject(error);
                else resolve(stdout);
            });
        });

        // Move chromedriver.exe to correct location
        const chromedriverWin64Dir = path.join(chromedriverDir, 'chromedriver-win64');
        if (fs.existsSync(chromedriverWin64Dir)) {
            const files = fs.readdirSync(chromedriverWin64Dir);
            files.forEach(file => {
                fs.renameSync(
                    path.join(chromedriverWin64Dir, file),
                    path.join(chromedriverDir, file)
                );
            });
            fs.rmdirSync(chromedriverWin64Dir);
        }

               // Clean up zip file
        fs.unlinkSync(zipFile);

        // Backup and replace ChromeDriver in WindowsApps directory
        const windowsAppsDir = 'C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps';
        const oldDriverPath = path.join(windowsAppsDir, 'chromedriver.exe');
        const newDriverPath = path.join(chromedriverDir, 'chromedriver.exe');

        if (fs.existsSync(oldDriverPath)) {
            // Get current date in YYYYMMDD format
            const date = new Date();
            const dateString = date.getFullYear().toString() +
                             (date.getMonth() + 1).toString().padStart(2, '0') +
                             date.getDate().toString().padStart(2, '0');
            
            // Rename existing chromedriver.exe
            const backupPath = path.join(windowsAppsDir, `chromedriver.exe.${dateString}`);
            console.log(`Backing up existing ChromeDriver to ${backupPath}`);
            fs.renameSync(oldDriverPath, backupPath);
        }

        // Copy new chromedriver.exe to WindowsApps directory
        console.log('Copying new ChromeDriver to WindowsApps directory...');
        fs.copyFileSync(newDriverPath, oldDriverPath);

        console.log('Chrome Driver successfully downloaded, extracted and installed!');
        return true;
    } catch (error) {
        console.error('Error downloading Chrome Driver:', error);
        return false;
    }
}


if (require.main === module) {
    getChromeDriver();
} else {
    module.exports = getChromeDriver;
}