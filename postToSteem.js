const fs = require('fs');
const steem = require('steem');
const config = require('./steemConfig.js');

const privateKey = config.privateKey;
const parentAuthor = ''; // Leer lassen, da es sich um einen eigenständigen Post handelt

const parentPermlink = 'ein-test-von-achimmertens05'; // Permlink des Elternbeitrags, kann frei gewählt werden

const author = 'achimmertens';
const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
const title = 'Ein Test von achimmertens';
const bodyFilePath = 'test.md';

// Beneficiaries-Objekt erstellen
const beneficiaries = [{ account: 'jaraumoses', weight: 5000 }];

// Den Inhalt der body.md-Datei lesen
const body = fs.readFileSync(bodyFilePath, 'utf-8');

// Konfiguration der STEEM-API
steem.api.setOptions({ url: 'https://api.steemit.com' });

// Erstellen des Posts mit Beneficiaries
steem.broadcast.send(
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
      }],
      ['comment_options', {
        author: author,
        permlink: permlink,
        allow_votes: true,
        allow_curation_rewards: true,
        max_accepted_payout: '1000000.000 SBD', // Setzen Sie das Asset-Symbol auf SBD oder ein anderes gültiges Asset-Symbol
        percent_hbd: 10000,
        percent_steem_dollars: 0,
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
