import StackCalculator from "./stackCalculator.js";

const safeCalculatorHandler = {
  get: (target, property) => { 
    if (property === "divide") {
      // proxied method
      return function () {
        // additional validation logic
        const divisor = target.peekValue();
        if (divisor === 0) {
          throw Error("Division by 0");
        }
        // if valid delegates to the subject
        return target.divide();
      };
    }
    // delegated methods and properties
    return target[property]; // return the original property if not a proxied method (divide)
  },
};
const calculator = new StackCalculator()
const safeCalculator = new Proxy(
calculator,
safeCalculatorHandler
); // this allows us to avoid mutating the subject while giving us an easy way to proxy only the bits that we need to enhance
calculator.putValue(3);
calculator.putValue(2);
console.log(calculator.multiply());
// 3*2 = 6
safeCalculator.putValue(2);
console.log(safeCalculator.multiply()); // 6*2 = 12
calculator.putValue(0);
console.log(calculator.divide()); // 12/0 = Infinity
safeCalculator.clear();
safeCalculator.putValue(4);
safeCalculator.putValue(0);
console.log(safeCalculator.divide()); // 4/0 -> Error