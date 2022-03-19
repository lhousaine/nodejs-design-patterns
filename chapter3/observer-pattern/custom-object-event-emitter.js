import { EventEmitter } from 'events';
import { readFile, readFileSync } from 'fs';

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    for (const file of this.files) {
      readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err);
        }
        this.emit('fileread', file);
        const match = content.match(this.regex);
        if (match) {
          match.forEach(elem => this.emit('found', file, elem));
        }
      })
    }
    return this;
  }
  findSync () {
    for (const file of this.files) {
      let content
      try {
        content = readFileSync(file, 'utf8')
      } catch (err) {
      this.emit('error', err)
      }
      this.emit('fileread', file)
      const match = content.match(this.regex)
      if (match) {
        match.forEach(elem => this.emit('found', file, elem))
      } 
    }
    return this
  }
}

const findRegexInstance = new FindRegex(/hello \w+/)
// findRegexInstance
//   .addFile('fileA.txt')
//   .addFile('fileB.json')
//   .find()
//   .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
//   .on('error', err => console.error(`Error emitted ${err.message}`))
  findRegexInstance.setMaxListeners(10); // in order to avoid memory leaks 

findRegexInstance
  .addFile('fileA.txt')
  .addFile('fileB.json')
  .on('found', (file, match) => console.log(`[Before] Matched "${match}" in file ${file}`))
  .on('error', err => console.error(`[Before] Error emitted ${err.message}`))
  .findSync()
  .on('found', (file, match) => console.log(`[After] Matched "${match}" in file ${file}`))