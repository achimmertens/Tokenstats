const fs = require('fs');
const postContentToHive = require('./postContentToHive.js');
const moment = require('moment');
const config = require('./hiveConfig.js');  //Advertisingbot2
const privateKey = config.privateKey;

const now = moment();
const CW = now.isoWeek();
console.log(`Die aktuelle Kalenderwoche ist ${CW}.`);

const parentAuthor = ''; // Leer lassen, da es sich um einen eigenständigen Post handelt
const parentPermlink = 'hive-13323' // Community=Splinterlands
//'hive-150329' // Community = ProofOfBrain
//'hive-167922'; // Community = LeoFinance 
//'hive-155221'  // Community=Alive
//'hive-187719';  // Cummunity=Beer // hive-121566'; // Community = DACH
//const parentPermlink = 'hive-153112' // Community = API Testing
const author = 'advertisingbot2';
const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
const title = 'Statistics For The $SPT Token For Week '+CW;
console.log ('Title = ',title)
const bodyFilePath = './screenshots/SPT/SPTText.md';
const tags = ['splinterlands','spt','leofinance','token','stats','hivestats','hive','statistics'];
const beneficiaries = [{ account: 'anobel', weight: 10000 }];

// Den Inhalt der body.md-Datei lesen
const body = fs.readFileSync(bodyFilePath, 'utf-8');

postContentToHive(privateKey,parentAuthor,parentPermlink,author,permlink,title,body,tags, beneficiaries);

