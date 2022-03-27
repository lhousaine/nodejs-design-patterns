import { createGzip, createGunzip } from 'zlib'; // (1)
import { Transform, pipeline } from 'stream';

const uppercasify = new Transform({ // (2)
    transform(chunk, enc, cb) {
        this.push(chunk.toString().toUpperCase())
        cb()
    }
})

pipeline( // (3)  will take care of cleaning up after the error and destroy all the streams in the pipeline.
    process.stdin,
    createGunzip(),
    uppercasify,
    createGzip(),
    process.stdout,
    (err) => { // (4)
        if (err) {
            console.error(err)
            process.exit(1)
        }
    }
)
// to test this function you should run a command line with this format
// echo 'Hello World!' | gzip | node uppercasify-gzipped.js | gunzip