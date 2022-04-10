export function createObservable(target, observer) { // it allows to observe the changes of the target object
  const observable = new Proxy(target, {
    set(obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = value;
        observer({ prop, prev, curr: value });
      }
      return true;
    },
  });
  return observable;
}

// wild: (loopback): is a popular Node.js web framework that uses the Proxy pattern to provide 
// the capability to intercept and enhance method calls on controllers.
