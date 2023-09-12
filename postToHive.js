const fs = require('fs');
const hive = require('@hiveio/hive-js');
//const steem = require('steem');
const config = require('./steemConfig.js');

const privateKey = config.privateKey;
hive.api.setOptions({ url: 'https://peakd.com' });
//hive.api.setOptions({ url: 'https://api.hive.blog' });
//hive.api.setOptions({ url: 'https://api.steem.blog' });

const parentAuthor = ''; // Leer lassen, da es sich um einen eigenständigen Post handelt
const parentPermlink = 'hive-153112'; // Permlink des Elternbeitrags oder der Community, kann frei gewählt werden
const author = 'achimmertens';
const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
const title = 'Please ignore - Ein Schedule Test von achimmertens 11.09.2023';
//const bodyFilePath = 'screenshots_2023-09-01/\BEER/\BEERText.txt';
const bodyFilePath = './test.md';
// Beneficiaries-Objekt erstellen
const beneficiaries = [{ account: 'anobel', weight: 10000 }];

// Den Inhalt der body.md-Datei lesen
const body = fs.readFileSync(bodyFilePath, 'utf-8');

// Extensions-Array erstellen
const extensions = [[0, { beneficiaries }]];

// Comment-Operation erstellen
const commentOperation = ['comment', {
  parent_author: parentAuthor,
  parent_permlink: parentPermlink,
  author: author,
  permlink: permlink,
  title: title,
  body: body,
  json_metadata: JSON.stringify({ tags: ['test'], app: 'test/0.1' })
}];

const scheduledTime = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 Tag später
const scheduledTimeStr = scheduledTime.toISOString().slice(0, -5);

// Comment-Optionen-Operation erstellen
const commentOptionsOperation = ['comment_options', {
  author: author,
  permlink: permlink,
  allow_votes: true,
  allow_curation_rewards: true,
  max_accepted_payout: '1000000.000 HBD',
  percent_hbd: 10000,
  extensions: extensions,
  start: scheduledTime.toISOString().slice(0, -5)
}];

commentOptionsOperation[1].extensions.push([1, { start: scheduledTimeStr }]);

// Transaktion erstellen
const operations = [commentOperation, commentOptionsOperation];
hive.broadcast.send(
  { extensions: [] },
  { operations: operations, extensions: [] },
  privateKey,
  function(err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log('Post erfolgreich erstellt:', result);
    }
  }
);





/*
hive.broadcast.send(
  {
    operations: [
      ['comment', {
        parent_author: parentAuthor,
        parent_permlink: parentPermlink,
        author: author,
        permlink: permlink,
        title: title,
        body: body,
        json_metadata: JSON.stringify({ tags: ['test'], app: 'test/0.1' }),
        scheduledTime:	['2023-09-11T15:10:00.000Z'],
      }],
      ['comment_options', {
        author: author,
        permlink: permlink,
        allow_votes: true,
        allow_curation_rewards: true,
        max_accepted_payout: '1000000.000 HBD', // Setzen Sie das Asset-Symbol auf HBD oder ein anderes gültiges Asset-Symbol
        percent_hbd: 10000,
        percent_hive_dollars: 0,
        // Geplante Zeit hinzufügen
        extensions: [[1, { "beneficiaries": [], "allowed_vote_accounts": [], "scheduled_time": "2023-09-11T15:05:00.000Z" }]]
 
      }]
    ]
  },
  { posting: privateKey },
  function(err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log('Post erfolgreich erstellt:', result);
    }
  }
);
*/
