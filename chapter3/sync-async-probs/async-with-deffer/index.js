import { readFile } from 'fs'
const cache = new Map()
function consistentReadAsync (filename, callback) {
  if (cache.has(filename)) {
  // deferred callback invocation to guarantee that the function will be invoked asynchronously
    process.nextTick(() => callback(cache.get(filename)));
    // Callbacks deferred with process.nextTick() are called microtasks and they are executed just after the current operation completes, even before any other I/O event is fired.
    // that is what it different that setImmediate
  } else {
    // asynchronous function
    readFile(filename, 'utf8', (err, data) => {
    cache.set(filename, data)
    callback(data)
    })
  }
}