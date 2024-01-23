const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');

const projectFolder = path.join(__dirname, 'project-dist');

const componentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const indexPath = path.join(projectFolder, 'index.html');
const stylesFolder = path.join(__dirname, 'styles');
const styleFile = path.join(projectFolder, 'style.css');
const assetsFolder = path.join(__dirname, 'assets');
const copyAssets = path.join(projectFolder, 'assets');
async function createFolder() {
  try {
    await fsPromises.mkdir(projectFolder, { recursive: true });
  } catch (error) {
    console.log(error);
  }
  copyDir(assetsFolder, copyAssets);
  writeStyles();
  createHtml();
}
createFolder();

async function copyDir(folder, copyFolder) {
  const files = await fsPromises.readdir(folder, { withFileTypes: true });
  files.map(async (file) => {
    const startPath = path.join(folder, file.name);
    const copyPath = path.join(copyFolder, file.name);
    if (file.isFile()) {
      await fsPromises.copyFile(startPath, copyPath);
    } else {
      await fsPromises.mkdir(`${copyFolder}/${file.name}`, { recursive: true });
      await copyDir(startPath, copyPath);
    }
  });
}
async function writeStyles() {
  fs.readdir(stylesFolder, { withFileTypes: true }, (error, files) => {
    if (!error) {
      const writeStream = fs.createWriteStream(styleFile);
      files.forEach((file) => {
        let extension = file.name.slice(
          file.name.lastIndexOf('.') + 1,
          file.name.length,
        );
        if (file.isFile() && extension === 'css') {
          const newFile = path.join(stylesFolder, file.name);
          let readStream = fs.createReadStream(newFile, 'utf-8');
          readStream.pipe(writeStream);
        }
      });
    } else {
      console.log(error);
    }
  });
}

async function createHtml() {
  const files = await fsPromises.readdir(componentsPath, {
    withFileTypes: true,
  });
  let template = await fsPromises.readFile(templatePath, 'utf-8');
  files.map(async (file) => {
    let componentName = file.name.slice(0, file.name.lastIndexOf('.'));
    let componentPath = path.join(componentsPath, file.name);
    const component = await fsPromises.readFile(componentPath, 'utf-8');
    template = template.replace(`{{${componentName}}}`, component);
    fsPromises.writeFile(indexPath, template);
  });
}
