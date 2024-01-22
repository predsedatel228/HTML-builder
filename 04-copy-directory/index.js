const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const directory = path.join(__dirname, 'files');
  const copyDerictory = path.join(__dirname, 'files-copy');

  await fs.mkdir(copyDerictory, { recursive: true });
  const files = await fs.readdir(directory);
  files.map(async (file) => {
    const startPath = path.join(directory, file);
    const copyPath = path.join(copyDerictory, file);
    await fs.copyFile(startPath, copyPath);
    //console.log('скопировано');
  });
  //console.log('1');
}

copyDir();
// console.log('2');
// console.log('3');
