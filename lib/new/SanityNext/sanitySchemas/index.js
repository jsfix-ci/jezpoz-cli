const fs = require('fs');
const path = require('path');

async function writeSchemaDocuments(projectName, files) {
  for(let file of files) {
    const fileContent = await fs.promises.readFile(path.resolve(__dirname, file));
    const folder = path.resolve(process.cwd(), projectName, 'studio', 'schemas', file.split('/')[0]);
    try {
      await fs.promises.access(folder);
    } catch (err) {
      await fs.promises.mkdir(folder);
    } finally {
      const filePath = path.resolve(process.cwd(), projectName, 'studio', 'schemas', file);
      await fs.promises.writeFile(filePath, fileContent);
    }
  }
}

async function writeRootSchema(projectName) {
  const fileContent = await fs.promises.readFile(path.resolve(__dirname, 'schema.js'));
  const filePath = path.resolve(process.cwd(), projectName, 'studio', 'schemas', 'schema.js');
  await fs.promises.writeFile(filePath, fileContent);
}


module.exports = async function(projectName) {
  try {
    await writeSchemaDocuments(projectName, [
      // Fields
      'fields/portableText.js',

      // Object
      'objects/heroBlock.js',
      'objects/textBlock.js',
      
      
      // Documents
      'documents/page.js',
      'documents/route.js',
      'documents/siteConfig.js',
    ]);
    await writeRootSchema(projectName);
  } catch (err) {
    console.error(err.message);
  }
}