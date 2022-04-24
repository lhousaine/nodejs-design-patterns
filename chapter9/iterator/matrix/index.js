import { Matrix } from "./matrix.js";
const matrix2x2 = new Matrix([
  ["11", "12"],
  ["21", "22"],
]);

for (const element of matrix2x2) {
  console.log(element);
}
const flattenedMatrix = [...matrix2x2]
console.log(flattenedMatrix);

/* 
let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log(iterationResult.value);
  iterationResult = iterator.next();
}
*/
