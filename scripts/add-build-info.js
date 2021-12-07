const replace = require('replace-in-file');
const package = require('../package.json');

const results = replace.sync({
  files: 'www/assets/build-info.json',
  from: ['{version}', '{buildDate}'],
  to: [package.version, new Date().toISOString()],
});
console.log('Replacement results:', results);
