const fs = require('fs');
let template = fs.readFileSync('tokenStats.txt', 'utf-8');

let token="BEER"
let timeFrame = 7;
let currentDate = new Date();
let currentDateString = currentDate.toISOString().slice(0, 10);
// Datum von vor einer Woche
let oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - timeFrame);
let oneWeekAgoString = oneWeekAgo.toISOString().slice(0, 10);
let dateFrame = `${currentDateString} to ${oneWeekAgoString}`;


let replacedTemplate = template.replace('[DATE_FRAME]', dateFrame)
                                .split('[TOKEN]').join('$'+token)
fs.writeFile("./screenshots/tokentext.txt", replacedTemplate, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Die Datei wurde erfolgreich erstellt!");
    }
});



