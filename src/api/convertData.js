export function convertData(input, category) {
  const categories = [...new Set(input.map((e) => e[category]))];
  const ans = categories.map((key) => {
    return {
      id: key,
      data: input
        .filter((item) => item[category] === key)
        .map((item) => {
          delete item[category];
          return item;
        }),
    };
  });
  return ans;
}
