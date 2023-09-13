const fs = require('fs');
const hive = require('@hiveio/hive-js');
const config = require('./steemConfig.js');

const privateKey = config.privateKey;
const parentAuthor = ''; // Leer lassen, da es sich um einen eigenständigen Post handelt
const parentPermlink = 'hive-121566'; // Community = DACH
const author = 'achimmertens';
const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
const title = 'Wann ist es genug?';
const bodyFilePath = 'test.md';

// Beneficiaries-Objekt erstellen
const beneficiaries = [{ account: 'anobel', weight: 1000 }];

// Den Inhalt der body.md-Datei lesen
const body = fs.readFileSync(bodyFilePath, 'utf-8');

// Konfiguration der STEEM-API
hive.api.setOptions({ url: 'https://api.hive.blog' });

// Erstellen des Posts mit Beneficiaries
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
        json_metadata: JSON.stringify({ tags: ['deutsch','dach','geld','philosophie'], app: 'test/0.1' }),
      }],
      ['comment_options', {
        author: author,
        permlink: permlink,
        allow_votes: true,
        allow_curation_rewards: true,
        max_accepted_payout: '1000000.000 SBD', // Setzen Sie das Asset-Symbol auf SBD oder ein anderes gültiges Asset-Symbol
        percent_hbd: 10000,
        percent_hive_dollars: 0,
        extensions: [[0, { beneficiaries }]],
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
