const {prompts} = require('prompts');
const sanityNext = require('./SanityNext');

module.exports = async function() {
  const appTemplate = await prompts.select({
    type: 'select',
    name: 'appTemplate',
    message: 'Choose an app template',
    choices: [
      {title: 'Sanity + Next.js', value: 'sanityNext'}
    ]
  });
  switch (appTemplate) {
    case 'sanityNext': {
      await sanityNext();
      break;
    }
  }
}