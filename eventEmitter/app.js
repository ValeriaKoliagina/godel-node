import { EventEmitter } from 'events';
import { readdir } from 'fs/promises';

import { Watcher } from './watcher.js';
import { Importer } from './importer.js';

const appEventEmitter = new EventEmitter();

try {
  const files = await readdir('./csv');

  for (const file of files) {
    new Watcher(appEventEmitter, file);
  }

  new Importer(appEventEmitter);
} catch (err) {
  console.error(err);
} 
