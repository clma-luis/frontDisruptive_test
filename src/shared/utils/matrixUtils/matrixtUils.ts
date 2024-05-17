export const generateInitialMatrix = (length: number): string[][] | [] => {
  if (!length) return [];
  const value = Array.from({ length }, () => Array(length).fill(""));

  return value;
};

export const rotateToTheLeft = (matrix: string[][], rotateAll: boolean = false) => {
  const matrixLength = matrix.length;
  const currentMatrix = generateInitialMatrix(matrixLength) as string[][];

  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < matrixLength; j++) {
      const currentLength = matrixLength - 1;
      const rest = currentLength - j;
      if (i > 0 && i < currentLength && j > 0 && j < currentLength && !rotateAll) {
        currentMatrix[i][j] = matrix[i][j];
      } else {
        currentMatrix[rest][i] = matrix[i][j];
      }
    }
  }

  return currentMatrix;
};

export const autoFillMatrix = (matrixLength: number) => {
  const matrix = generateInitialMatrix(matrixLength);

  const value = matrix.reduce(
    (acc: { matrix: string[][]; lastValue: number }, el) => {
      const newElement = el.map((_) => {
        const value = acc.lastValue + 1;
        acc.lastValue = acc.lastValue + 1;

        return String(value);
      });

      return { matrix: [...acc.matrix, newElement], lastValue: acc.lastValue };
    },
    { matrix: [], lastValue: 0 }
  );

  return value.matrix;
};
