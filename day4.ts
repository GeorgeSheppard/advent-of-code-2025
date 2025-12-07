import { readFileSync } from "fs";

const input = readFileSync("day4input.txt", "utf-8").trim();

export const convertPaper = (input: string) => input.split('') as ("." | "@")[]

export const parsePaperMap = (input: string): ("." | "@")[][] => {
  return input.split('\r\n').map(convertPaper)
}

export const countMoveablePaper = (grid: ("." | "@")[][]): number => {
  let count = 0
  
  const maxX = grid.length
  const maxY = grid[0].length

  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      if (grid[x][y] === ".") continue 

      let adjacentPaper = 0

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (j === 0 && i === 0) continue

          const adjacentX = x + i
          const adjacentY = y + j

          if (adjacentX < 0 || adjacentX >= maxX) continue
          if (adjacentY < 0 || adjacentY >= maxY) continue

          if (grid[adjacentX][adjacentY] === "@") adjacentPaper += 1
        }
      }

      if (adjacentPaper < 4) count += 1
    }
  }

  return count
}

export const removeMoveablePaper = (grid: ("." | "@")[][]): { count: number, grid: ("." | "@")[][]} => {
  let count = 0
  
  const maxX = grid.length
  const maxY = grid[0].length

  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      if (grid[x][y] === ".") continue 

      let adjacentPaper = 0

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (j === 0 && i === 0) continue

          const adjacentX = x + i
          const adjacentY = y + j

          if (adjacentX < 0 || adjacentX >= maxX) continue
          if (adjacentY < 0 || adjacentY >= maxY) continue

          if (grid[adjacentX][adjacentY] === "@") adjacentPaper += 1
        }
      }

      if (adjacentPaper < 4) {
        count += 1
        grid[x][y] = "."
      }
    }
  }

  return { count, grid }
}


const result = countMoveablePaper(parsePaperMap(input))
console.log({ result })

let grid = parsePaperMap(input)
let total = 0
while (true) { 
  const result = removeMoveablePaper(grid)
  grid = result.grid
  total += result.count
  if (result.count === 0) break
}

console.log({ total })
