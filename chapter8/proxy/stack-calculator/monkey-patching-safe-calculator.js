import StackCalculator from "./stackCalculator.js";

function patchToSafeCalculator(calculator) {
  const divideOrig = calculator.divide; // save the original method
  calculator.divide = () => {      // replace the original method
    // additional validation logic
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw Error("Division by 0");
    }
    // if valid delegates to the subject
    return divideOrig.apply(calculator);    // call the original method
  };
  return calculator;
}
const calculator = new StackCalculator();
const safeCalculator = patchToSafeCalculator(calculator);
calculator.putValue(3);
calculator.putValue(2);
console.log(calculator.multiply());
// 3*2 = 6
safeCalculator.putValue(2);
console.log(safeCalculator.multiply()); // 6*2 = 12
calculator.putValue(0);
console.log(calculator.divide()); // monkey patching has side effects in the original object, so this line will throw an error
safeCalculator.clear();
safeCalculator.putValue(4);
safeCalculator.putValue(0);
console.log(safeCalculator.divide()); // 4/0 -> Error