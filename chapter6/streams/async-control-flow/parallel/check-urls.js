import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
import superagent from 'superagent'
import ParallelTransform from 'parallel-transform'; // use built-in library to take advantage of order in parallel execution

pipeline(
        createReadStream(process.argv[2]), // create readStream to a file containing Url, one in a line
        split(), // ② split the read content 
        new ParallelTransform( // ③ apply the parallel stream traitement to filter up urls
            2, async function(url, done) {
                if (!url) {
                    return done();
                }
                console.log(url)
                try {
                    await request.head(url, { timeout: 5 * 1000 });
                    this.push(`${url} is up\n`);
                } catch (err) {
                    this.push(`${url} is down\n`);
                }
                done();
            }
        ),
        createWriteStream('results.txt'), // ④ write result to destination file
        (err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            console.log('All urls have been checked')
        }
    );