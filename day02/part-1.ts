import fs from "fs";

// max number of cubes in the bag
const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

type Color = "blue" | "red" | "green";

const input = fs.readFileSync("data.txt", "utf-8");
const data = input.split("\n");

let idSum = 0;

for (const line in data) {
  // separate games and game data
  const gameId = parseInt(data[line].split(": ")[0].split(" ")[1]);
  const gameData = data[line].split(": ")[1].split("; ");

  const result = checkGameValidity(gameData);

  if (result) {
    idSum += gameId;
  }
}

console.log(idSum);

function checkGameValidity(input: string[]): boolean {
  let blueResults = [];
  let redResults = [];
  let greenResults = [];

  for (const game in input) {
    const cubes = input[game].split(", ");

    const blueCubes = cubes.filter((cube) => cube.includes("blue"))[0];
    const redCubes = cubes.filter((cube) => cube.includes("red"))[0];
    const greenCubes = cubes.filter((cube) => cube.includes("green"))[0];

    const blueResult = checkCubeNumberValidity(blueCubes);
    const redResult = checkCubeNumberValidity(redCubes);
    const greenResult = checkCubeNumberValidity(greenCubes);

    blueResults.push(blueResult);
    redResults.push(redResult);
    greenResults.push(greenResult);
  }

  if (blueResults.filter((result) => !result).length > 0) return false;
  if (redResults.filter((result) => !result).length > 0) return false;
  if (greenResults.filter((result) => !result).length > 0) return false;

  return true;
}

function checkCubeNumberValidity(cubes: string) {
  if (cubes === undefined) return true;

  const cubeNum = parseInt(cubes.split(" ")[0]);
  const color = cubes.split(" ")[1] as Color;

  if (color === "blue") {
    return cubeNum > MAX_BLUE_CUBES ? false : true;
  }

  if (color === "red") {
    return cubeNum > MAX_RED_CUBES ? false : true;
  }

  if (color == "green") {
    return cubeNum > MAX_GREEN_CUBES ? false : true;
  }

  return true; // should never be reached
}
