import { createServer } from 'http';
import Chance from 'chance';

const chance = new Chance();

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    function generateMore() { // (1)
        while (chance.bool({ likelihood: 95 })) {
            const randomChunk = chance.string({ // (2)
                length: (16 * 1024) - 1
            })
            const shouldContinue = res.write(`${randomChunk}\n`) // (3)
            if (!shouldContinue) {  // check if internal buffer is full
                console.log('back-pressure')
                return res.once('drain', generateMore); // When the buffer is emptied, the drain event is emitted, then we could write again
            }
        }
        res.end('\n\n')
    }
    generateMore()
    res.on('finish', () => console.log('All data sent'))
})

server.listen(8080, () => {
    console.log('listening on http://localhost:8080')
})