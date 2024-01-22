const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const projectFolder = path.join(__dirname, 'project-dist');
const styleFile = path.join(projectFolder, 'bundle.css');

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
