import SafeCalculator from "./safeCalculator.js";
import StackCalculator from "./stackCalculator.js";

const calculator = new StackCalculator();
calculator.putValue(3);
calculator.putValue(2);
console.log(calculator.multiply()); // 3*2 = 6
calculator.putValue(2);
console.log(calculator.multiply()); // 6*2 = 12
calculator.putValue(0);
console.log(calculator.divide()); // 6*2 = 12

// The safeCalculator is the proxy of stackCalculator used for data validation,
// It will throw an error in case of division by 0.
const safeCalculator = new SafeCalculator(calculator);
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

// we could think to use the modern and native package `delegates` to create a proxy