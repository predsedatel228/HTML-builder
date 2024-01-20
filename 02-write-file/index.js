const fs = require('fs');
const rl = require('readline');
const path = require('path');

const { stdin, stdout, exit } = process;

const filePath = path.join(__dirname, 'text.txt');
const input = rl.createInterface(stdin);
const output = fs.createWriteStream(filePath);

stdout.write('Please write text:\n');

input.on('line', (data) => {
  if (data === 'exit') {
    endProcess();
  }
  output.write(data + '\n');
});

function endProcess() {
  stdout.write('Goodbye!');
  exit();
}

process.on('SIGINT', endProcess);
