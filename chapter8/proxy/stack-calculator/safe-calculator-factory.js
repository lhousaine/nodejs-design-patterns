import StackCalculator from "./stackCalculator.js";

function createSafeCalculator(calculator) {
  return {
    // proxied method
    divide() {
      // additional validation logic
      const divisor = calculator.peekValue();
      if (divisor === 0) {
        throw Error("Division by 0");
      }
      // if valid delegates to the subject
      return calculator.divide();
    },
    // delegated methods
    putValue(value) {
      return calculator.putValue(value);
    },
    getValue() {
      return calculator.getValue();
    },
    peekValue() {
      return calculator.peekValue();
    },
    clear() {
      return calculator.clear();
    },
    multiply() {
      return calculator.multiply();
    },
  };
}
const calculator = new StackCalculator();
const safeCalculator = createSafeCalculator(calculator);
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
