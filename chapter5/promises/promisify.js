
import { randomBytes } from 'crypto';

function promisify(callbackBasedApi) {
    return function promisified(...args) {
        return new Promise((resolve, reject) => { // (1)
            const newArgs = [
                ...args,
                function(err, result) { // (2)
                    if (err) {
                        return reject(err)
                    }
                    resolve(result)
                }
            ]
            callbackBasedApi(...newArgs) // (3)
        })
    }
}

const randomBytesP = promisify(randomBytes)
randomBytesP(32)
    .then(buffer => {
        console.log(`Random bytes: ${buffer.toString()}`)
    });