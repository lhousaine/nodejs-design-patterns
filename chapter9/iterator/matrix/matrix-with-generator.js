export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix;
  }
  get(row, column) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError("Out of bounds");
    }
    return this.data[row][column];
  }
  set(row, column, value) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError("Out of bounds");
    }
    this.data[row][column] = value;
  }
  *[Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;

    while (nextRow !== this.data.length) {
      yield this.data[nextRow][nextCol];
      if (nextCol === this.data[nextRow].length - 1) {
        nextRow++;
        nextCol = 0;
      } else {
        nextCol++;
      }
    }
  }
}

const matrix2x2 = new Matrix([
  ["11", "12"],
  ["21", "22"],
]);


for (const element of matrix2x2) {
  console.log(element);
}
const flattenedMatrix = [...matrix2x2]
console.log(flattenedMatrix);
