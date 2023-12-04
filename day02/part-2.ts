import fs from "fs";

const input = fs.readFileSync("data.txt", "utf-8");
const data = input.split("\n");

let setPower = 0;

for (const line in data) {
  // separate games and game data
  const gameData = data[line].split(": ")[1].split("; ");

  const result = findMinimumCubeNumsRequired(gameData);

  setPower += result.reduce((a, b) => a * b, 1);
}

console.log(setPower);

function findMinimumCubeNumsRequired(input: string[]): number[] {
  let results = [];
  let blueResults = [];
  let redResults = [];
  let greenResults = [];

  for (const game in input) {
    const cubes = input[game].split(", ");

    const blueCubes = cubes.filter((cube) => cube.includes("blue"))[0];
    const redCubes = cubes.filter((cube) => cube.includes("red"))[0];
    const greenCubes = cubes.filter((cube) => cube.includes("green"))[0];

    const blueResult = getCubeNumber(blueCubes);
    const redResult = getCubeNumber(redCubes);
    const greenResult = getCubeNumber(greenCubes);

    blueResults.push(blueResult);
    redResults.push(redResult);
    greenResults.push(greenResult);
  }

  const blueMax = Math.max(...blueResults);
  const redMax = Math.max(...redResults);
  const greenMax = Math.max(...greenResults);

  results.push(blueMax);
  results.push(redMax);
  results.push(greenMax);

  return results;
}

function getCubeNumber(cubes: string): number {
  if (cubes === undefined) return 0;

  return parseInt(cubes.split(" ")[0]);
}
