import fs from "fs";

const data = fs.readFileSync("data.txt", "utf-8");
const lineList = data.split("\n");

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const digitMapping: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const regexPattern = new RegExp(`(?:${digits.join("|")})|[0-9]`, "gi");

const sum = lineList.reduce((acc, line) => {
  const arrayOfMatches: string[] = [];
  let currentLine = line;

  while (currentLine) {
    const matches = currentLine.match(regexPattern);
    if (matches) {
      arrayOfMatches.push(matches[0]);
    }
    currentLine = currentLine.slice(1);
  }

  const firstMatch = arrayOfMatches[0];
  const lastMatch = arrayOfMatches[arrayOfMatches.length - 1];

  const first = firstMatch
    ? (isNaN(parseInt(firstMatch))
        ? digitMapping[firstMatch.toLowerCase()]
        : parseInt(firstMatch)) % 10
    : -1;
  const last = lastMatch
    ? (isNaN(parseInt(lastMatch))
        ? digitMapping[lastMatch.toLowerCase()]
        : parseInt(lastMatch)) % 10
    : -1;

  return acc + (first >= 0 && last >= 0 ? Number(`${first}${last}`) : 0);
}, 0);

console.log(sum);
