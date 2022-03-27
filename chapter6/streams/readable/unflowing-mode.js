process.stdin
    .on('readable', () => {
        let chunk;
        console.log('New data available');
        while ((chunk = process.stdin.read()) !== null) { // pulls a data chunk from the internal buffers of the Readable stream
            console.log(
                `Chunk read (${chunk.length} bytes): "${chunk.toString()}"`
            );
            // the  returned chunk is, by default, a Buffer because the stream is working in the binary mode.
            // to read strings instead of buffers call setEncoding(valid encoding) on the stream
        }
    })
    .on('end', () => console.log('End of stream'))