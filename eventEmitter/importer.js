import * as fs from 'fs';
import { parse } from 'csv-parse';

const changeFileHandler = filename => {
  const data = [];

  try {
    fs.createReadStream(filename)
      .pipe(parse({ delimiter: ',', columns: true }))
      .on('data', row => {
          data.push(row);
      })
      .on('end', () => {
        console.log(data.length ? JSON.stringify(data) : '');
      })
      .on('error', (err) => {
        console.error(`Oops: ${err.message}`)
      });
    } catch (err) {
      console.log('');
    }
};

export function Importer (appEventEmitter) {
  appEventEmitter.on('changeFileEvent', changeFileHandler);
};
