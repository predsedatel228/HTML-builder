const fs = require('fs');
const path = require('path');
const { stdout } = process;

const folderPath = path.join(__dirname, 'secret-folder');

function fileInfo(file) {
  if (file.isFile()) {
    let name = file.name.slice(0, file.name.lastIndexOf('.'));
    let extension = file.name.slice(
      file.name.lastIndexOf('.') + 1,
      file.name.length,
    );
    let filePath = path.join(folderPath, file.name);
    fs.stat(filePath, (error, stat) => {
      if (error) {
        console.log(error.message);
      }
      stdout.write(
        `${name} - ${extension} - ${(stat.size / 1024).toFixed(2)} kb\n`,
      );
    });
  }
}

fs.readdir(folderPath, { withFileTypes: true }, function (error, files) {
  if (error) {
    return console.log(error);
  }
  files.forEach((file) => {
    fileInfo(file);
  });
  // console.log(files);
});
