import { readFileSync } from "fs";

const input = readFileSync("day5input.txt", "utf-8").trim();

export const parseDatabase = (input: string): { ranges: [number, number][], ingredients: number[]} => {
  const [ranges, ingredients] = input.split('\r\n\r\n')

  return {
    ranges: ranges.split("\r\n").map(range => range.split("-").map(Number) as [number, number]),
    ingredients: ingredients.split("\r\n").map(Number)
  }
}

export const filterIngredients = (ingredients: number[], freshIngredientRanges: [number, number][]) => {
  return ingredients.filter(ingredient => {
    for (const [start, end] of freshIngredientRanges) {
      if (ingredient >= start && ingredient <= end) return true
    }
    return false
  })
}

const { ranges, ingredients } = parseDatabase(input)
console.log(filterIngredients(ingredients, ranges).length)

export const combineFreshIngredientRanges = (freshIngredientRanges: [number, number][]) => {
  const orderedRanges = freshIngredientRanges.sort((rangeA, rangeB) => rangeA[0] - rangeB[0])

  const newRanges: [number, number][] = []
  for (let i = 0; i < orderedRanges.length; i++) {
    console.log('i', i, orderedRanges.length)
    let newRange = orderedRanges[i]
    while (i + 1 < orderedRanges.length && orderedRanges[i + 1][0] <= orderedRanges[i][1]) {
      newRange[1] = newRange[1] > orderedRanges[i + 1][1] ? newRange[1] : orderedRanges[i + 1][1]
      i++
    }
    newRanges.push(newRange)
  }
  return newRanges
}

const total = combineFreshIngredientRanges(ranges).reduce((prev, [start, end]) => {
  console.log('range', start, end)
  return prev + (end - start + 1)
}, 0)
console.log(total)
