import { watch } from 'fs';
import { join } from 'path';

export function Watcher (appEventEmitter, filename, dirname = './csv') {
  const path = join(dirname, filename);

  watch(path, event => {
    if (event === 'change') {
      appEventEmitter.emit('changeFileEvent', path);
    }
  });
};
