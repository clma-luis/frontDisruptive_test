import { autoFillMatrix, generateInitialMatrix, rotateToTheLeft } from "./matrixtUils";

describe("generateInitialMatrix", () => {
  it("Should return an array of arrays with all values in empty string", () => {
    const matrixLength = 2;
    const expectedResult = [
      ["", ""],
      ["", ""],
    ];
    const result = generateInitialMatrix(matrixLength);

    expect(result).toEqual(expectedResult);
  });
});

const fourLengthMatrix = [
  ["1", "2", "3", "4"],
  ["5", "6", "7", "8"],
  ["9", "10", "11", "12"],
  ["13", "14", "15", "16"],
];

describe("autoFillMatrix", () => {
  it("Should return an array with ascending values", () => {
    const matrixLength = 4;
    const expectedResult = fourLengthMatrix;
    const result = autoFillMatrix(matrixLength);

    expect(result).toEqual(expectedResult);
  });
});

describe("Rotate edges boxes to the left", () => {
  it("Should return matrix rotated to the left 90 degrees, only edges boxes", () => {
    const result = rotateToTheLeft(fourLengthMatrix);

    const expectedResult = [
      ["4", "8", "12", "16"],
      ["3", "6", "7", "15"],
      ["2", "10", "11", "14"],
      ["1", "5", "9", "13"],
    ];

    expect(result).toEqual(expectedResult);
  });
});

describe("rotate all to the Left", () => {
  it("Should return matrix all rotated to the left 90 degrees", () => {
    const expectedResult = [
      ["4", "8", "12", "16"],
      ["3", "7", "11", "15"],
      ["2", "6", "10", "14"],
      ["1", "5", "9", "13"],
    ];

    const result = rotateToTheLeft(fourLengthMatrix, true);

    expect(result).toEqual(expectedResult);
  });
});
