import { Command } from 'commander';
import * as fs from 'fs';
import * as readline from 'readline';
import { stderr, stdin, stdout } from 'process';
import { resolve } from 'path';
import { parse } from 'csv-parse';
// import{ readFile } from 'fs/promises';

const program = new Command();

const readMyFile = async (path) => {
// 1 approach
//   try {
//     const filePath = resolve(path);
//     const info = await readFile(filePath, { encoding: 'utf8' });
//     console.log(info);
//   } catch (error) {
//     console.error(`There is an error reading the file: ${error.message}`);
//  }

// 2 approach
  const readStream = fs.createReadStream(resolve(path), { encoding: 'utf-8' });

  readStream.on('data', chunk => {
    stdout.write(chunk);
  })

  readStream.on('error', err => {
    stderr.write(`Something went wrong: ${err.message}`)
  })
};

const readConsole = async () => {
  const consoleInterface = readline.createInterface({ input: stdin, output: stdout });

  consoleInterface.question('Could you please explain better this task ', answer => {
    stdout.write(answer.toUpperCase());

    consoleInterface.close();
  });
};

const readCsvFile = async (path) => {
  const pathname = resolve(path);
  const extension = pathname.split('.').at(-1).toLowerCase();
  const data = [];

  if (extension !== 'csv') {
    return stdout.write('');
  }

  try {
    fs.createReadStream(pathname)
      .pipe(parse({ delimiter: ',', columns: true }))
      .on('data', row => {
          data.push(row);
      })
      .on('end', () => {
        stdout.write(data.length ? JSON.stringify(data) : '');
      })
      .on('error', (err) => {
        stderr.write(`Oops: ${err.message}`)
      });
    } catch (err) {
      stdout.write('');
    }
};

const convertFile = async (path) => {
  const pathname = resolve(path);
  const [name, extension] = pathname.split('.');

  if (extension.toLowerCase() !== 'csv') {
    return stdout.write('');
  }

  try {
    const newJsonFile = fs.createWriteStream(`${name}.json`);

    fs.createReadStream(pathname)
      .pipe(parse({ delimiter: ',', columns: true }))
      .on('data', row => {
          newJsonFile.write(JSON.stringify(row));
      })
      .on('end', () => {
        stdout.write('File was created');
      })
      .on('error', (err) => {
        stderr.write(`Oops: ${err.message}`)
    });
  } catch (error) {
    stdout.write('');
  }
};

program.command('readMyFile <path>').action(path => readMyFile(path));
program.command('readConsole').action(() => readConsole());
program.command('readCsvFile <path>').action(path => readCsvFile(path));
program.command('convertFile <path>').action(path => convertFile(path));

program.parse();
