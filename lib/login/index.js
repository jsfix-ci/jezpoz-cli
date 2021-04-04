const {prompts} = require('prompts');
const sanityLogin = require('./sanity.js');
const vercelLogin = require('./vercel.js');
const githubLogin = require('./github.js');

module.exports = async function() {
  const loginProvider = await prompts.select({
    type: 'select',
    name: 'loginProvider',
    message: 'Pick a service to log in',
    choices: [
      {title: 'Sanity', value: 'sanity'},
      {title: 'Vercel', value: 'vercel'},
      {title: 'Github', value: 'github'}
    ]
  });
  switch(loginProvider) {
    case 'sanity': {
      await sanityLogin();
      break;
    }
    case 'vercel': {
      await vercelLogin();
      break;
    }
    case 'github': {
      await githubLogin();
    }
  }
}