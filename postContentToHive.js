//const fs = require('fs');
const hive = require('@hiveio/hive-js');

module.exports = async function postContentToHive(privateKey,parentAuthor,parentPermlink,author,permlink,title,body,tags,beneficiaries)
{
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
            json_metadata: JSON.stringify({ tags: tags, app: 'test/0.1' }),
          }],
          ['comment_options', {
            author: author,
            permlink: permlink,
            allow_votes: true,
            allow_curation_rewards: true,
            max_accepted_payout: '1000000.000 HBD', // Setzen Sie das Asset-Symbol auf SBD oder ein anderes gültiges Asset-Symbol
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
}
