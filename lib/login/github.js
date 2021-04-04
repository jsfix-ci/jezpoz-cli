const {execSync} = require('child_process');

module.exports = function() {
  execSync('gh auth login', {stdio: 'inherit', encoding: 'utf-8'})
}