const https = require('https');

const data = JSON.stringify({
  title: 'Test - please ignore',
  body: 'xxxyyy',
  tags: 'test',
  permlink: 'test-please-ignore',
  jsonOperations: '[[\"comment\",{\"parent_author\":\"\",\"parent_permlink\":\"hive-149312\",\"author\":\"achimmertens\",\"permlink\":\"test-please-ignore\",\"title\":\"Test - please ignore\",\"body\":\"xxxyyy\",\"json_metadata\":\"{\\\"app\\\":\\\"peakd/2023.8.1\\\",\\\"format\\\":\\\"markdown\\\",\\\"description\\\":\\\"Test, please ignore\\\",\\\"tags\\\":[\\\"test\\\"],\\\"users\\\":[],\\\"image\\\":[]}\"}],[\"comment_options\",{\"author\":\"achimmertens\",\"permlink\":\"test-please-ignore\",\"allow_votes\":true,\"allow_curation_rewards\":true,\"max_accepted_payout\":\"1000000.000 HBD\",\"percent_hbd\":10000,\"extensions\":[[0,{\"beneficiaries\":[{\"account\":\"anobel\",\"weight\":10000}]}]]}]]',
  reblog: false,
  scheduledTime: '2023-09-12T15:05:00.000Z',
  markdown: true
});

const options = {
  hostname: 'peakd.com',
  port: 443,
  path: '/api/new_post',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
