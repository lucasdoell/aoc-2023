// requirements:
// grab input via text file
// iterate through each line and combine the first and last digit into a single two-digit number
// finally, sum all of the values together
// ex: `1input2test3` => 13
import fs from "fs";

const data = fs.readFileSync("data.txt", "utf-8");
const lineList = data.split("\n");

let sum = 0;

function reverse(input: string) {
  return input.split("").reverse().join("");
}

for (const line in lineList) {
  // find first digit
  const first = lineList[line].match(/\d/)?.toString() ?? "";

  // find last digit
  const last = reverse(lineList[line]).match(/\d/)?.toString() ?? "";

  // combine into two-digit number
  const combined = first + last;
  sum += parseInt(combined);
}

console.log(sum);
