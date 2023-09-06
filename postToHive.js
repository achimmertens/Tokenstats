const fs = require('fs');
const hive = require('@hiveio/hive-js');
//const steem = require('steem');
const config = require('./steemConfig.js');

const privateKey = config.privateKey;
hive.api.setOptions({ url: 'https://api.hive.blog' });
//hive.api.setOptions({ url: 'https://api.steem.blog' });

const parentAuthor = ''; // Leer lassen, da es sich um einen eigenständigen Post handelt
const parentPermlink = 'hive-153112'; // Permlink des Elternbeitrags oder der Community, kann frei gewählt werden
const author = 'achimmertens';
const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
const title = 'Please ignore - Eine Test von achimmertens';
//const bodyFilePath = 'screenshots_2023-09-01/\BEER/\BEERText.txt';
const bodyFilePath = './test.md';
// Beneficiaries-Objekt erstellen
const beneficiaries = [{ account: 'anobel', weight: 10000 }];

// Den Inhalt der body.md-Datei lesen
const body = fs.readFileSync(bodyFilePath, 'utf-8');

//hive.broadcast.comment(
hive.broadcast.comment(  
  privateKey,
  parentAuthor,
  parentPermlink,
  author,
  permlink,
  title,
  body,
  { tags: ['test'], app: 'test/0.1', beneficiaries  },
  function(err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log('Post erfolgreich erstellt:', result);
    }
  }
);
