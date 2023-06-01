export async function fetchIris(breed) {
  const response = await fetch(
    `https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json`
  );
  const data = await response.json();
  //   console.log(data);
  return data;
}
