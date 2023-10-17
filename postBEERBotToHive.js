const fs = require('fs');
const postContentToHive = require('./postContentToHive.js');
const moment = require('moment');

const now = moment();
const CW = now.isoWeek();
console.log(`Die aktuelle Kalenderwoche ist ${CW}.`);

const parentAuthor = ''; // Leer lassen, da es sich um einen eigenständigen Post handelt
const parentPermlink = 'hive-187719';  // Cummunity=Beer // hive-121566'; // Community = DACH
//const parentPermlink = 'hive-153112' // Community = API Testing
const author = 'achimmertens';
const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
const title = 'Statistics For The $BEER Token For Week '+CW;
console.log ('Title = ',title)
const bodyFilePath = './screenshots/BEERBot/BEERBotText.md';
const tags = ['beer','beerbot','leofinance','token','stats','hivestats','hive','statistics'];
const beneficiaries = [{ account: 'hive.fund', weight: 10000 }];

// Den Inhalt der body.md-Datei lesen
const body = fs.readFileSync(bodyFilePath, 'utf-8');

postContentToHive(parentAuthor,parentPermlink,author,permlink,title,body,tags, beneficiaries);

