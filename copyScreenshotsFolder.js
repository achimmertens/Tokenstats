// Java-Script, welches den Ordner .screenshots löscht und danach den Ordner ./screenshots_[YYYY-MM-DD] kopiert zu Ordner "./screenshots".

const fs = require('fs-extra');
const path = require('path');

// Lösche den Ordner "./screenshots"
console.log('Lösche den Ordner "./screenshots"...');
fs.removeSync('./screenshots');

// Kopiere den Ordner "./screenshots_[YYYY-MM-DD]" nach "./screenshots"
console.log('Kopiere den Ordner "./screenshots_[YYYY-MM-DD]" nach ');

const screenshotsDir = './screenshots';
const screenshotsDateDir = `./screenshots_${new Date().toISOString().slice(0, 10)}`;

// kopiere den Ordner `./screenshots_${new Date().toISOString().slice(0, 10)}` nach .screenshots
fs.copySync(screenshotsDateDir, screenshotsDir, { overwrite: true });
//fs.moveSync(screenshotsDateDir, screenshotsDir, { overwrite: true });


