export function convertData(input, category) {
  const species = [...new Set(input.map((e) => e[category]))];
  // console.log(species);
  const ans = species.map((specie) => {
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
