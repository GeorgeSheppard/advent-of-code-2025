import { readFileSync } from "fs";

const input = readFileSync("day1input.txt", "utf-8").trim();
const lines = input.split("\n");

export const processLine = (
  { counter, current }: { counter: number; current: number },
  line: string
) => {
  const direction = line.at(0) === "L" ? -1 : 1;
  const amount = parseInt(line.slice(1));

  const remainder = amount % 100;
  const times = Math.floor(amount / 100);

  counter += times;

  const nonZero = current !== 0;
  current += remainder * direction;

  if ((current <= 0 && nonZero) || current > 99) counter += 1;

  if (current < 0) current += 100;
  if (current > 99) current -= 100;

  console.assert(
    current >= 0 && current <= 99,
    "current must be between 0 and 99"
  );

  return { counter, current };
};

let counter = 0;
let current = 50;

lines.forEach((line) => {
  const result = processLine({ counter, current }, line);
  counter = result.counter;
  current = result.current;
});

console.log("input", counter, current);
