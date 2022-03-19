// main.js
import { count, increment } from './counter.js';
console.log(count) // prints 0
increment()
console.log(count) // prints 1
count++ // TypeError: Assignment to constant variable!
// => imported modules are effectively read-only live bindings to their exported values.