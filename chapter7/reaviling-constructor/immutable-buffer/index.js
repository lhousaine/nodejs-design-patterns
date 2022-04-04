import { ImmutableBuffer } from "./immutableBuffer.js";
const hello = "Hello!";
const immutable = new ImmutableBuffer(hello.length, ({ write }) => {
  write(hello);
}); // (1)
console.log(String.fromCharCode(immutable.readInt8(0))); // (2)
// the following line will throw
// "TypeError: immutable.write is not a function"
// immutable.write('Hello?')
// (3)


// example: Promise class (new Prmise((resolve, reject)=>{})