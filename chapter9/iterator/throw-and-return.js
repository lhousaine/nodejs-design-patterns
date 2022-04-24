function* twoWayGenerator() {
  try {
    const what = yield null;
    yield "Hello " + what;
  } catch (err) {
    yield "Hello error: " + err.message;
  }
}
console.log("Using throw():");
const twoWayException = twoWayGenerator();
twoWayException.next();
console.log(twoWayException.throw(new Error("Boom!")));
console.log("Using return():");
const twoWayReturn = twoWayGenerator();
console.log(twoWayReturn.return("myReturnValue"));
/**
  As we can see, the twoWayGenerator() function will receive an exception as soon as
the first yield instruction returns. This works exactly as if an exception was thrown
from inside the generator, and this means that it can be caught and handled like
any other exception using a try...catch block. The return() method, instead, will
simply stop the execution of the generator causing the given value to be provided as
a return value by the generator.
 */