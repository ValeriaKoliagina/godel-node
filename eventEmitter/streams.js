import { Command } from 'commander';
import * as fs from 'fs';
import { stderr, stdin, stdout } from 'process';
import { resolve } from 'path';
import { parse } from 'csv-parse';
import { Transform } from 'stream';


const program = new Command();

const readMyFile = async (path) => {
  const readStream = fs.createReadStream(resolve(path), { encoding: 'utf-8' });

  readStream.pipe(stdout);

  readStream.on('error', err => {
    stderr.write(`Something went wrong: ${err.message}`)
  })
};

const readConsole = async () => {
  const toUpperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      // is it possible to use encoding instead of toString()?
      callback(null, chunk.toString().toUpperCase())
    }
  })

  stdin.pipe(toUpperCaseTransform).pipe(stdout);
};

const readCsvFile = async (path) => {
  const pathname = resolve(path);
  const extension = pathname.split('.').at(-1).toLowerCase();

  const stringifyTransform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      callback(null, JSON.stringify(chunk))
    }
  })

  if (extension !== 'csv') {
    return stdout.write('');
  }

  try {
    fs.createReadStream(pathname)
      .pipe(parse({ delimiter: ',', columns: true }))
      // with such approach we see incorrect JSON format or should we push info again to array
      .pipe(stringifyTransform)
      .pipe(stdout)
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
  const data = [];

  if (extension.toLowerCase() !== 'csv') {
    return stdout.write('');
  }

  try {
    const newJsonFile = fs.createWriteStream(`${name}.json`);

    newJsonFile.on('finish', () => {
      stdout.write('File was created');
    })

    fs.createReadStream(pathname)
      .pipe(parse({ delimiter: ',', columns: true }))
      .on('data', row => {
          data.push(row);;
      })
      .on('end', () => {
        newJsonFile.write(data.length ? JSON.stringify(data) : '');
        newJsonFile.end();
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
