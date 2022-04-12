import StackCalculator from "./stackCalculator.js";

function patchCalculator(calculator) { // we are mutating the original object
  // new method
  calculator.add = function () {
    const addend2 = calculator.getValue();
    const addend1 = calculator.getValue();
    const result = addend1 + addend2;
    calculator.putValue(result);
    return result;
  };
  // modified method
  const divideOrig = calculator.divide;
  calculator.divide = () => {
    // additional validation logic
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw Error("Division by 0");
    }
    // if valid delegates to the subject
    return divideOrig.apply(calculator);
  };
  return calculator;
}
const calculator = new StackCalculator();
const enhancedCalculator = patchCalculator(calculator);
enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());
// 4+3 = 7
enhancedCalculator.putValue(2);
console.log(enhancedCalculator.multiply()); // 7*2 = 14