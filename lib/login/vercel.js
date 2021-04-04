const {execSync} = require('child_process');

module.exports = function() {
  execSync('vercel login', {stdio: 'inherit', encoding: 'utf-8'})
}