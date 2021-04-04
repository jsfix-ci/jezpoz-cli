const {Command} = require('commander');

const package = require('../package.json');

const program = new Command();

const loginIndex = require('../lib/login');
const sanityLogin = require('../lib/login/sanity');
const vercelLogin = require('../lib/login/vercel');

const newIndex = require('../lib/new');
const newSanityNext = require('../lib/new/sanityNext');

program
  .version(package.version)

program
  .command('login [provider]')
  .description('Log into sanity. Required that the Sanity CLI is installed.')
  .action((provider) => {
    if (!provider) {
      loginIndex()
    }
    if (provider === 'sanity') {
      sanityLogin()
    }
    if (provider === 'vercel') {
      vercelLogin()
    }
  });

program
  .command('new [appTemplate]')
  .description('Create a new app using app templates.')
  .action((appTemplate) => {
    if (!appTemplate) {
      newIndex();
    }
    if (appTemplate === 'sanity-next') {
      newSanityNext();
    }
  })

program.parse(process.argv);