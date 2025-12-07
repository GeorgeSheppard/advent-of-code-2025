import { describe, expect, it } from "vitest"
import { readRangesFromInput, sumInvalidNumbers, sumInvalidNumbersPart2 } from "./day2"

describe("works", () => {
  it("passes the example solution", () => {
    expect(
      sumInvalidNumbers(
        readRangesFromInput('11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124')
      )
    ).toBe(1227775554)
  })

  it.only("passes the second example solution", () => {
    expect(
      sumInvalidNumbersPart2(
        readRangesFromInput('11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124')
      )
    ).toBe(4174379265)
  })
})
