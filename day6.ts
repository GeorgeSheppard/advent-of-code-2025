import { readFileSync } from "fs";

const input = readFileSync("day6input.txt", "utf-8").trim();

const lines = input.split("\n").map((line) => line.split(""));

const zippedLines = lines[0].map((_, index) =>
  lines.map((line) => line[index])
);

const calculatedLines = zippedLines.map((line) => {
  const operation =
    line.at(-1) === "+"
      ? (numbers: number[]) => numbers.reduce((a, b) => a + b, 0)
      : (numbers: number[]) => numbers.reduce((a, b) => a * b, 1);
  const numbers = line.slice(0, -1).map(Number);
  return operation(numbers);
});

const total = calculatedLines.reduce((a, b) => a + b, 0);
console.log({ total, zippedLines, lines });

const convertToPart1Format = (lines: string[][]) => {
  let operation = undefined;

  const convertedLines: string[][] = [];
  let progress: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const newOperation = line.at(-1);
    if (newOperation !== " " && newOperation !== undefined) {
      operation = newOperation;
    }

    const number = line.slice(0, -1).join("");
    progress.push(number);

    if (i === lines.length - 1 || lines[i + 1].every((val) => val === " ")) {
      convertedLines.push([...progress, operation ?? ""]);
      progress = [];
      i += 1;
    }
  }

  return convertedLines;
};

const converted = convertToPart1Format(zippedLines);

const total2 = converted
  .map((line) => {
    const operation =
      line.at(-1) === "+"
        ? (numbers: number[]) => numbers.reduce((a, b) => a + b, 0)
        : (numbers: number[]) => numbers.reduce((a, b) => a * b, 1);
    const numbers = line.slice(0, -1).map(Number);
    return operation(numbers);
  })
  .reduce((a, b) => a + b, 0);

console.log({ converted, total2 });
