import glob from 'glob';

// the glob emit an event Match when the pattern passed as first argument is verified
glob('data/*.txt', (err, files) => {
  if (err) {
    return console.error(err);
  }
  console.log(`All files found: ${JSON.stringify(files)}`);
}).on('match', match => console.log(`Match found: ${match}`));