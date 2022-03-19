import { EventEmitter } from 'events';

function helloEvents () {
  const eventEmitter = new EventEmitter();
  setTimeout(() => eventEmitter.emit('complete', 'hello world'), 100);
  return eventEmitter;
} // allows us to register multiple listeners for the same event. it is used when the same event can occur multiple times.

function helloCallback (cb) {
  setTimeout(() => cb(null, 'hello world'), 100); 
} // It has some limitations when it comes to supporting different types of events.
// will notify One callback
helloEvents().on('complete', message => console.log(message));
helloCallback((err, message) => console.log(message));