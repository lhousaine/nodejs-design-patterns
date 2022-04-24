## There are many native javascript interface that accept an iterable in their constructor:

- the for...of loop: `for (const element of matrix2x2) {}`

- the assignment operation destructuor: `const [one, two]=matrix2x2`
- spread operator : `const flattenedMatrix = [...matrix2x2]`
- ...

### On the Node.js side, one notable API accepting an iterable is stream.Readable.from(iterable, [options]) ( nodejsdp.link/readable-from ), which creates a readable stream out of an iterable object.

**_JavaScript itself defines many iterables that can be used with the APIs and constructs
we've just seen. The most notable iterable is Array , but also other data structures,
such as Map and Set , and even String all implement the @@iterable method. In
Node.js land, Buffer is probably the most notable iterable._**

# Generaor:

The generator delegation instruction, yield \* iterable,
is another example of a JavaScript built-in syntax accepting
an iterable as an argument. The instruction will loop over the
elements of the iterable and yield each element one by one.

```Javascript
function * myGenerator () {
// generator body
}
```

- => the generator object is also an iterable, so, we can use it in a for...of loop as we already done withe created iterables:

```JS
for (const fruit of fruitGenerator()) {
console.log(fruit)
}
```

# Async Iterator:

- is an iterator that return a promise.
- The `for await...of` syntax is a very intuitive way to iterate over an
  async iterable.

# wild:

- **_@databases packages:_**
  They all expose a function called queryStream() , which returns an async iterable,
  which can be used to easily iterate over the results of a query.
- **_npm-zeromq:_**
  It is heavily related on async iterators in its API.
