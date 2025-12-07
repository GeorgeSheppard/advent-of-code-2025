import { readFileSync } from "fs";

const input = readFileSync("day2input.txt", "utf-8").trim();

export const readRangesFromInput = (input: string) => {
  return input.split(",").map((range) => {
    const rangeSplit = range.split("-").map(Number)
    console.assert(rangeSplit.length === 2, "Should be a start and an end to the range")
    return [rangeSplit[0], rangeSplit[1]] as [number, number]
  } );
}

export const isValid = (value: number, repeats: number) => {
  const strValue = `${value}`
  const length = strValue.length
  if (length % repeats !== 0) return true

  let previous = undefined
  for (let i = 0; i < length / repeats; i++) {
    const valueToTest = strValue.slice(i * repeats, (i + 1) * repeats)
    // console.log({ valueToTest, value, repeats })
    if (previous === undefined) {
      previous = valueToTest
      continue
    }

    if (valueToTest !== previous) return true
  }
  console.log({ invalidNumber: value })
  return false
}

export const sumInvalidNumbers = (ranges: [number, number][]) => {
  return ranges.reduce((total, [start, end]) => {
    for (let i = start; i <= end; i++) {
      const length = `${i}`.length
      if (length % 2 === 1) continue
      if (!isValid(i, length / 2)) total += i
    }
    return total
  }, 0)
}

export const sumInvalidNumbersPart2 = (ranges: [number, number][]) => {
  return ranges.reduce((total, [start, end]) => {
    for (let i = start; i <= end; i++) {
      for (let j = 1; j <= `${i}`.length / 2; j++) {
        if (!isValid(i, j)) {
          total += i
          break
        }
      }
    }
    return total
  }, 0)
}

// Part 1
// const sum = sumInvalidNumbers(readRangesFromInput(input))
// console.log({ sum })

// Part 2
const sum = sumInvalidNumbersPart2(readRangesFromInput(input))
console.log({ sum })
