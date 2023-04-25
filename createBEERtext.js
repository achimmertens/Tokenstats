const fs = require('fs');
let template = fs.readFileSync('tokenStatsTemplate.txt', 'utf-8');
let otherTokens = fs.readFileSync('otherTokensTemplate.txt', 'utf-8');
let otherTokenImages = fs.readFileSync('otherTokenImages.txt', 'utf-8');

const OT1 = /\!\[01(.*?)\)/;
console.log("OT1 = ",OT1);
const matchOT1 = OT1.exec(otherTokenImages);
console.log("matchOT1 = ",matchOT1);
const otherTokenImage01 = matchOT1 ? matchOT1[0] : null;
console.log("otherTokenImage01 = ",otherTokenImage01); // gibt "01_HivePerToken.png" aus

const OT2 = /\!\[02(.*?)\)/;
console.log("OT2 = ",OT2);
const matchOT2 = OT2.exec(otherTokenImages);
console.log("matchOT2 = ",matchOT2);
const otherTokenImage02 = matchOT2 ? matchOT2[0] : null;
console.log("otherTokenImage02 = ",otherTokenImage02); // gibt "02_USDPerToken.png" aus

const OT3 = /\!\[03(.*?)\)/;
console.log("OT3 = ",OT3);
const matchOT3 = OT3.exec(otherTokenImages);
console.log("matchOT3 = ",matchOT3);
const otherTokenImage03 = matchOT3 ? matchOT3[0] : null;
console.log("otherTokenImage03 = ",otherTokenImage03); // gibt "03_TableOfTokenPrices.png" aus


let token="BEER"
let tagToken=token.toLowerCase();
let timeFrame = 7;
let currentDate = new Date();
let currentDateString = currentDate.toISOString().slice(0, 10);
// Datum von vor einer Woche
let oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - timeFrame);
let oneWeekAgoString = oneWeekAgo.toISOString().slice(0, 10);
let dateFrame = `${oneWeekAgoString} to ${currentDateString}`;


let replacedTemplate = template.replace('[DATE_FRAME]', dateFrame)
                                .replace('[OTHERTOKENS]', otherTokens)
                                .replace('[OT01]',otherTokenImage01)
                                .replace('[OT02]',otherTokenImage02)
                                .replace('[OT03]',otherTokenImage03)
                                .replace('[TAG]', tagToken)
                                .split('[TOKEN]').join('$'+token)
fs.writeFile("./screenshots/Beer/tokentext.txt", replacedTemplate, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Die Datei ./screenshots/Beer/tokenText.txt wurde erfolgreich erstellt!");
    }
});





