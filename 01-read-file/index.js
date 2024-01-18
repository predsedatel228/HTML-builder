const fs = require('fs');

fs.readFile('./01-read-file/text.txt', 'utf8', function (error, fileContent) {
  if (error) throw error;
  console.log(fileContent);
});
