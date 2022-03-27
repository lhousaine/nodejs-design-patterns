import { Transform } from 'stream';

export class LimitedParallelStream extends Transform {

    constructor(concurrency, userTransform, opts) { // (1)
        super({ objectMode: true, ...opts });
        this.concurrency = concurrency;
        this.userTransform = userTransform;
        this.running = 0;
        this.continueCb = null;
        this.terminateCb = null;
    }

    _transform(chunk, enc, done) { // (2)
        this.running++;
        this.userTransform(
            chunk,
            enc,
            this.push.bind(this),
            this._onComplete.bind(this) // get notified when the transform is done 
        );
        if (this.running < this.concurrency) {
            done();
        } else {
            this.continueCb = done; // save the done callback in the continuedCB to be called as soon as one task finish
        }
    }

    _flush(done) { // (3)
        if (this.running > 0) {
            this.terminateCb = done;
        } else {
            done();
        }
    }

    _onComplete(err) { // (4)
        this.running--;
        if (err) {
            return this.emit('error', err);
        }
        const tmpCb = this.continueCb; // Every time a task completes, we invoke any saved continueCb() that will cause the stream to unblock, triggering the processing of the next item.
        this.continueCb = null;
        tmpCb && tmpCb();
        if (this.running === 0) {
            this.terminateCb && this.terminateCb(); // call the terminate cb when all transform stream were done.
        }
    }
}