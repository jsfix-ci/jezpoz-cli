const fs = require('fs');
const path = require('path');

async function writeFiles(projectName, files) {
  for(let file of files) {
    const fileContent = await fs.promises.readFile(path.resolve(__dirname, file));
    const folder = path.resolve(process.cwd(), projectName, 'client', file.split('/')[0]);
    try {
      await fs.promises.access(folder);
    } catch (err) {
      await fs.promises.mkdir(folder);
    } finally {
      const filePath = path.resolve(process.cwd(), projectName, 'client', file);
      await fs.promises.writeFile(filePath, fileContent);
    }
  }
}

module.exports = async function(projectName) {
  try {
    await writeFiles(projectName, [
      // Components
      'components/BlockRender.js',
      'components/Navbar.js',

      // Context
      'contexts/siteConfigContext.js',

      // styles
      'styles/Navbar.module.css',

      // Pages
      'pages/_app.js',
      'pages/[page].js',
      'pages/index.js'
    ]);
  } catch (err) {
    console.error(err.message);
  }
}