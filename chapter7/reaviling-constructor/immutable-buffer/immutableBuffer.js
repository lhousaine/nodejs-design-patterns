const MODIFIER_NAMES = ["swap", "write", "fill"];

export class ImmutableBuffer {
  constructor(size, executor) {
    const buffer = Buffer.alloc(size);
    const modifiers = {};
    for (const prop in buffer) {
      if (typeof buffer[prop] !== "function") { // skip buffer non functions properties
        continue;
      }
      if (MODIFIER_NAMES.some((m) => prop.startsWith(m))) {
        modifiers[prop] = buffer[prop].bind(buffer); // modifiers : will hold all the methods that can mutate the buffer.
      } else {
        this[prop] = buffer[prop].bind(buffer); // add non modifier methods directly to the current instance
      }
      // (1)
      // (2)
      // (3)
      // (4)
      // (5)
    }
    executor(modifiers); // call the executor with all the buffer mutating functions
    // (6)
  }
}
