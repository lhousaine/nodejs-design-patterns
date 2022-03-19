import { EventEmitter } from 'events';
import { readFile } from 'fs';

function findRegex (files, regex) {
  const emitter = new EventEmitter()
  for (const file of files) {
    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err);//it is recommended to always register a listener for the error event to avoid eventEmitter throw exception and exit.        
      }
      emitter.emit('fileread', file)
      const match = content.match(regex)
      if (match) {
        match.forEach(elem => emitter.emit('found', file, elem))
      }
    })
  }
  return emitter
}

const emitter =findRegex(['fileA.txt', 'fileB.json','error_file.text'], /hello \w+/g);
  
emitter.on('fileread', file => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`));
