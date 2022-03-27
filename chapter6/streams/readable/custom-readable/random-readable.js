import { Readable } from 'stream';
import Chance from 'chance'; //  a library for generating all sorts of random values, from numbers to strings to entire sentences.
const chance = new Chance();

/**
 * options: {
 * encoding argument
 * objectMode: A flag to enable object mode
 * highWaterMark : the upper limit of data stored in the internal buffer
 * }
 */
export class RandomStream extends Readable {
    constructor(options) {
        super(options);
        this.emittedBytes = 0;
    }
    _read(size) {
        const chunk = chance.string({ length: size }); // (1) generate a random string of length size 
        this.push(chunk, 'utf8'); // (2) push chunk to internal buffer and specify encoding if the chunk is not binary buffer
        this.emittedBytes += chunk.length;
        if (chance.bool({ likelihood: 5 })) { // (3)
            this.push(null); // this indicate EOF
        }
    }
}