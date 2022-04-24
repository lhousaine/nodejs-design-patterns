function* twoWayGenerator() {
  const what = yield null;
  yield "Hello " + what;
}

const twoWay = twoWayGenerator();
twoWay.next();
console.log(twoWay.next("world"));

/**
1. The first time the next() method is invoked, the generator reaches the
first yield statement and is then put on pause.
2. When next('world') is invoked, the generator resumes from the point where
it was put on pause, which is on the yield instruction, but this time we have
a value that is passed back to the generator. This value will then be set to
the what variable. The generator then appends the what variable to the string
'Hello ' and yields the result.
 */