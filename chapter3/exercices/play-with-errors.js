import { EventEmitter } from 'events';

function emitError(emitter, callback) {
    const now = Date.now();
    if (now % 5 === 0) {
        callback('[callback] now date milliseconds is divided by 5');
        emitter.emit('error', now);
    }
}

function ticker(myNumber, callback) {
    const emitter = new EventEmitter();
    let index = 0;
    emitter.emit('tick', index);
    emitError(callback);

    const timeout = setTimeout(() => {
        emitter.emit('tick', index);
        if (index * 50 < myNumber) {
            index++;
            emitError(emitter, callback);
            timeout.refresh();
        } else {
            callback(index);
        }
    }, 50);

    return emitter;
}

const emitter = ticker(1000, (totalTicks) => {
    console.log(totalTicks);
})
emitter.on('tick', (index) => console.log(' tick number =>  ' + index));
emitter.on('error', (now) => console.log('[event emitter] now date milliseconds is divided by 5 =>  ' + now));