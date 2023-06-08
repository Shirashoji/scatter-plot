export function convertData(input, category) {
  const categories = [...new Set(input.map((e) => e[category]))];
  const ans = categories.map((specie) => {
    return {
      id: specie,
      data: input
        .filter((item) => item.species === specie)
        .map(({ sepalLength, sepalWidth, petalLength, petalWidth }) => ({
          sepalLength,
          sepalWidth,
          petalLength,
          petalWidth,
        })),
    };
  });
  return ans;
}
