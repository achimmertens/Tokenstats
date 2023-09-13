const fs = require('fs');
//const hive = require('@hiveio/hive-js');
//const config = require('./steemConfig.js');
const postContentToHive = require('./postContentToHive.js');
const moment = require('moment');

const now = moment();
const CW = now.isoWeek();
console.log(`Die aktuelle Kalenderwoche ist ${CW}.`);

//const privateKey = config.privateKey;
const parentAuthor = ''; // Leer lassen, da es sich um einen eigenständigen Post handelt
// const parentPermlink = 'hive-187719';  // Cummunity=Beer // hive-121566'; // Community = DACH
const parentPermlink = 'hive-153112' // Community = API Testing
const author = 'achimmertens';
const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
const title = 'Test - Statistics For The $BEER Token For Week '+CW;
console.log ('Title = ',title)
const bodyFilePath = './screenshots/BEER/BEERText.md';
const tags = ['beer','leofinance','token','stats','hivestats','hive','statistics'];
const beneficiaries = [{ account: 'hive.fund', weight: 10000 }];

// Den Inhalt der body.md-Datei lesen
const body = fs.readFileSync(bodyFilePath, 'utf-8');

postContentToHive(parentAuthor,parentPermlink,author,permlink,title,body,tags, beneficiaries);

// ------------
// Senden der Daten nach Hive
//hive.api.setOptions({ url: 'https://api.hive.blog' });



// // Erstellen des Posts mit Beneficiaries
// hive.broadcast.send(
//   {
//     operations: [
//       ['comment', {
//         parent_author: parentAuthor,
//         parent_permlink: parentPermlink,
//         author: author,
//         permlink: permlink,
//         title: title,
//         body: body,
//         json_metadata: JSON.stringify({ tags: tags, app: 'test/0.1' }),
//       }],
//       ['comment_options', {
//         author: author,
//         permlink: permlink,
//         allow_votes: true,
//         allow_curation_rewards: true,
//         max_accepted_payout: '1000000.000 HBD', // Setzen Sie das Asset-Symbol auf SBD oder ein anderes gültiges Asset-Symbol
//         percent_hbd: 10000,
//         percent_hive_dollars: 0,
//         extensions: [[0, { beneficiaries }]],
//       }]
//     ]
//   },
//   { posting: privateKey },
//   function(err, result) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Post erfolgreich erstellt:', result);
//     }
//   }
// );
