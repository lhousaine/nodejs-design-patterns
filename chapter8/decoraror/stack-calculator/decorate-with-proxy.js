import StackCalculator from "./stackCalculator.js";

const enhancedCalculatorHandler = {
  get(target, property) {
    if (property === "add") {
      // new method
      return function add() {
        const addend2 = target.getValue();
        const addend1 = target.getValue();
        const result = addend1 + addend2;
        target.putValue(result);
        return result;
      };
    } else if (property === "divide") {
      // modified method
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
    return target[property];
  },
};
const calculator = new StackCalculator();
const enhancedCalculator = new Proxy(calculator, enhancedCalculatorHandler);
enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());
// 4+3 = 7
calculator.putValue(2);
console.log(enhancedCalculator.multiply()); // 7*2 = 14