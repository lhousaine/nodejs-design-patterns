import { createWriteStream } from 'fs'
import { createServer } from 'net'

function demultiplexChannel(source, destinations) {
    let currentChannel = null
    let currentLength = null
    source
        .on('readable', () => { // (1) use non-flowing mode for reading
            let chunk
            if (currentChannel === null) { // (2)
                chunk = source.read(1) // read 1 byte to be used as the channel ID if it is NULL
                currentChannel = chunk && chunk.readUInt8(0)
            }
            if (currentLength === null) { // (3)
                chunk = source.read(4) // read the length of the data. We need 4 bytes for that,
                currentLength = chunk && chunk.readUInt32BE(0)
                if (currentLength === null) {
                    return null
                }
            }
            chunk = source.read(currentLength) // (4)
            if (chunk === null) {
                return null
            }
            console.log(`Received packet from: ${currentChannel}`)
            destinations[currentChannel].write(chunk) // (5)
            currentChannel = null
            currentLength = null
        })
        .on('end', () => { // (6) we make sure to end all the destination channels when the source channel ends.
            destinations.forEach(destination => destination.end())
            console.log('Source channel closed')
        })
}

const server = createServer((socket) => {
 const stdoutStream = createWriteStream('stdout.log')
 const stderrStream = createWriteStream('stderr.log')
 demultiplexChannel(socket, [stdoutStream, stderrStream])
})
server.listen(3000, () => console.log('Server started'))