import { readFile } from 'fs';

function readJSONThrows (filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data))
  })
}

process.on('uncaughtException', (err) => {
  console.error(`This will catch at last the JSON parsing exception: 
  ${err.message}`)
  // Terminates the application with 1 (error) as exit code.
  // Without the following line, the application would continue
  process.exit(1)
}); 

// try {
  readJSONThrows('invalid_data.json', (err) => console.error(err));
//  } catch (err) {
//   console.log('This will NOT catch the JSON parsing exception')
//  }