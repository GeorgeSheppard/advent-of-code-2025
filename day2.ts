import { readFileSync } from "fs";

const input = readFileSync("day2input.txt", "utf-8").trim();
const ranges = input.split(",").map((range) => range.split("-").map(Number));

const isValid = (value: number, ranges: [number, number][]) => {
  if (value)
}
