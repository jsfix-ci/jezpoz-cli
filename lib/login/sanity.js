const {execSync} = require('child_process');

module.exports = function() {
  execSync('sanity login', {stdio: 'inherit', encoding: 'utf-8'})
}