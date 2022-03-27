import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
import superagent from 'superagent'
import { LimitedParallelStream } from './parallel-stream-limit.js'

pipeline(
    createReadStream(process.argv[2]), // create readStream to a file containing Url, one in a line
    split(), // ② split the read content 
    new LimitedParallelStream( // ③ apply the parallel stream traitement to filter up urls
        2,
        async(url, enc, push, done) => {
            if (!url) {
                return done()
            }
            try {
                await superagent.head(url, { timeout: 5 * 1000 })
                push(`${url} is up\n`)
            } catch (err) {
                push(`${url} is down\n`)
            }
            done()
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
)