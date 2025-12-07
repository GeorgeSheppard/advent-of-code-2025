import { readFileSync } from "fs";

const input = readFileSync("day3input.txt", "utf-8").trim();

export const convertBank = (input: string): number[] => input.split('').map(Number)

export const parseBatteryBanks = (input: string): number[][] => {
  return input.split('\r\n').map(convertBank)
}

export const calculateLargestJoltage = (bank: number[]): number => {
  const length = bank.length
  let left = bank.at(-2)!
  let right = bank.at(-1)!

  const seen = new Set<number>([right, left])

  for (let i = length - 3; i >= 0; i--) {
    const value = bank[i]

    if (value >= left) {
      left = value
      const highestSeen = [...seen.values()].sort().at(-1)!
      right = highestSeen
      // console.log('new value: ', left, right)
    }
    // console.log('seen: ', i, value, seen)
    seen.add(value)
  }

  // Some sanity checks
  const highestNumber = [...new Set(bank.slice(0, -1)).values()].sort().at(-1)
  console.assert(highestNumber === left, "Highest number should always be chosen", bank, highestNumber, left, right)
  const rightIndex = bank.lastIndexOf(right)
  const leftIndex = bank.indexOf(left)
  console.assert(leftIndex < rightIndex, "Both numbers should exist separately")

  return left * 10 + right
}

export const calculateLargestJoltageInefficient = (bank: number[]): number => {
  const length = bank.length

  let highest = bank.at(-2)! * 10 + bank.at(-1)!
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      const value = bank[i] * 10 + bank[j]
      if (value > highest) highest = value
    }
  }

  return highest
}

export const calculateLargestJoltageAgain = (bank: number[]): number => {
  const left = Math.max(...bank.slice(0, -1))
  const index = bank.indexOf(left)
  const right = Math.max(...bank.slice(index + 1))
  const total = left * 10 + right
  return total
}

const banks = parseBatteryBanks(input)
const voltages = banks.map(bank => calculateLargestJoltage(bank))
const total = voltages.reduce((sum, val) => sum + val, 0)
console.log({ total })

export const calculateLargestJoltagePart2 = (bank: number[], battery: number): number => {
  if (battery === 1) return 0
  const newBank = bank.slice(0, bank.length - battery + 1)
  const max = Math.max(...newBank)
  const index = bank.indexOf(max)
  console.log('max', max, index)
  return Math.pow(10, battery - 1) * max + calculateLargestJoltagePart2(bank.slice(index + 1), battery - 1)
}

const banks2 = parseBatteryBanks(input)
const voltages2 = banks2.map(bank => calculateLargestJoltagePart2(bank, 12))
const total2 = voltages2.reduce((sum, val) => sum + val, 0)
console.log({ total2 })

const batteries = input.match(/\d+/g)!.map(bank => bank.split('').map(Number));

const maxJoltage = (bank: number[], battery = [2, 12][1], joltage = 0) => {
  if (!battery) return joltage;
  const rating = Math.max(...bank.slice(0, bank.length - battery + 1));
  return maxJoltage(bank.slice(bank.indexOf(rating) + 1), battery - 1, joltage * 10 + rating);
};

console.log(batteries.map(bank => maxJoltage(bank)).reduce((sum, val) => sum + val, 0));
