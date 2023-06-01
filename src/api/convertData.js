export function convertData(input) {
  const species = [...new Set(input.map((e) => e.species))];
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
