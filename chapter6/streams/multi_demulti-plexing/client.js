import { fork } from 'child_process';
import { connect } from 'net';

function multiplexChannels(sources, destination) {
    let openChannels = sources.length;
    for (let i = 0; i < sources.length; i++) {
        sources[i]
            .on('readable', function() { // (1)
                let chunk;
                while ((chunk = this.read()) !== null) {
                    const outBuff = Buffer.alloc(1 + 4 + chunk.length); // (2)
                    outBuff.writeUInt8(i, 0);
                    outBuff.writeUInt32BE(chunk.length, 1);
                    chunk.copy(outBuff, 5);
                    console.log(`Sending packet to channel: ${i}`);
                    destination.write(outBuff); // (3)
                }
            })
            .on('end', () => { // (4)
                if (--openChannels === 0) {
                    destination.end();
                }
            })
    }
}

const socket = connect(3000, () => { // (1) create TCP Client to the given address 
    const child = fork( // (2)
        process.argv[2], // 
        process.argv.slice(3), // child process args
        { silent: true } // The child process will not inherit stdout and stderr of the parent.
    )
    multiplexChannels([child.stdout, child.stderr], socket) // (3) multiplex stdout and stderr of the child process to writable socket
})