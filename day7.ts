import { readFileSync } from "fs";

const input = readFileSync("day7input.txt", "utf-8").trim();
const rows = input.split("\n");

let beamIndices = new Map([[rows[0].indexOf("S"), 1]]);

rows.forEach((row) => {
  const splitIndices = new Set<number>();
  for (let i = 0; i < row.length; i++) {
    if (row[i] === "^") splitIndices.add(i);
  }

  const newBeamIndices = new Map<number, number>();

  beamIndices.forEach((paths, index) => {
    const getsSplit = splitIndices.has(index);
    if (!getsSplit) {
      const existingValue = newBeamIndices.get(index);
      newBeamIndices.set(index, (existingValue ?? 0) + paths);
      return;
    }

    if (index + 1 < row.length) {
      const existingValue = newBeamIndices.get(index + 1);
      newBeamIndices.set(index + 1, (existingValue ?? 0) + paths);
    }
    if (index - 1 >= 0) {
      const existingValue = newBeamIndices.get(index - 1);
      newBeamIndices.set(index - 1, (existingValue ?? 0) + paths);
    }
  });

  beamIndices = newBeamIndices;
});

console.log({ total: [...beamIndices.values()].reduce((a, b) => a + b, 0) });
