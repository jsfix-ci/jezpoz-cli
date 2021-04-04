const {prompts} = require('prompts');
const {execSync} = require('child_process');
const fs = require('fs');

const createSanitySchemas = require('./sanitySchemas');
const configureNext = require('./nextConfig');

async function createSanityStudio(projectName, datasetName, visibility) {
  await execSync(`sanity init -y --create-project "${projectName}" --dataset ${datasetName} --visibility ${visibility} --template clean --output-path ${process.cwd()}/${projectName}/studio`,
    {stdio: 'inherit', encoding: 'utf-8'});
}

async function createNextApp(projectName) {
  const options = {
    stdio: 'inherit',
    encoding: 'utf-8',
    cwd: `${process.cwd()}/${projectName}`
  };
  await execSync(`npx create-next-app client`, options);
  await execSync(`npm i @sanity/client --save`, {
    ...options,
    cwd: `${process.cwd()}/${projectName}/client`
  });
}

async function createNextSanityConfig(projectName, datasetName) {
  await execSync(`cd ./${projectName} && npm i --save @sanity/client`, {stdio: 'inherit', encoding: 'utf-8'});
  const projectId = await prompts.text({
    type: 'text',
    name: 'projectId',
    message: 'Sanity Project Id (found in Sanity Console)'
  });
  const fileContents = `const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '${projectId}',
  dataset: '${datasetName}',
  useCdn: true,
  apiVersion: '2021-03-25',
});
export default client;`;
  await fs.writeFileSync(`${process.cwd()}/${projectName}/client/sanityClient.js`, fileContents);
}

async function deploySanityStudio(projectName) {
  await execSync(`cd ${process.cwd()}/${projectName}/studio && sanity deploy`,
    {stdio: 'inherit', encoding: 'utf-8'});
}

async function deployNextApp(projectName) {
  const options = {
    stdio: 'inherit',
    encoding: 'utf-8',
    cwd: `${process.cwd()}/${projectName}/client`
  };
  await execSync(`gh repo create ${projectName}`, options);
  await execSync(`git add --all`, options);
  await execSync(`git commit -m "Init project"`, options);
  await execSync(`git branch -M main`, options);
  await execSync(`git push -u origin main`, options);
  await execSync(`vercel`, options);
}


module.exports = async function() {
  try {
    const projectName = await prompts.text({
      type: 'text',
      name: 'projectName',
      message: 'Project name',
      validate: value => value.includes(" ") ? `Cannot contain spaces` : true
    });
    const datasetName = await prompts.text({
      type: 'text',
      name: 'projectDatasetName',
      message: 'Dataset name',
      initial: 'production'
    });
    const visibility = await prompts.select({
      type: 'select',
      name: 'projectVisibility',
      message: 'Project visibility',
      choices: [
        {title: 'Public', value: 'public'},
        {title: 'Private', value: 'private'}
      ],
      initial: 0,
    });
    await createSanityStudio(projectName, datasetName, visibility);
    await createNextApp(projectName);
    await createNextSanityConfig(projectName, datasetName);
    await createSanitySchemas(projectName);
    await deploySanityStudio(projectName);
    await configureNext(projectName);
    await deployNextApp(projectName);
  } catch (err) {
    console.error(err.message);
  }
}