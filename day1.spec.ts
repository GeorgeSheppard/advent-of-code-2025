import { describe, it, expect } from "vitest";
import { processLine } from "./day1";

describe("Day 1", () => {
  it("1", () => {
    expect(processLine({ counter: 0, current: 50 }, "R50")).toStrictEqual({
      counter: 1,
      current: 0,
    });
  });

  it("2", () => {
    expect(processLine({ counter: 5, current: 99 }, "L312")).toStrictEqual({
      counter: 8,
      current: 87,
    });
  });

  it("3", () => {
    expect(processLine({ counter: 57, current: 0 }, "R300")).toStrictEqual({
      counter: 60,
      current: 0,
    });
  });

  it("4", () => {
    expect(processLine({ counter: 600, current: 28 }, "L198")).toStrictEqual({
      counter: 602,
      current: 30,
    });
  });

  it("5", () => {
    expect(processLine({ counter: 1025, current: 7 }, "L3")).toStrictEqual({
      counter: 1025,
      current: 4,
    });
  });

  it("6", () => {
    expect(processLine({ counter: 1025, current: 93 }, "R6")).toStrictEqual({
      counter: 1025,
      current: 99,
    });
  });

  it("7", () => {
    expect(processLine({ counter: 1025, current: 93 }, "R7")).toStrictEqual({
      counter: 1026,
      current: 0,
    });
  });

  it("8", () => {
    expect(processLine({ counter: 1025, current: 93 }, "R107")).toStrictEqual({
      counter: 1027,
      current: 0,
    });
  });

  it("wrapping right: R1000 from 50 should pass 0 ten times", () => {
    expect(processLine({ counter: 0, current: 50 }, "R1000")).toStrictEqual({
      counter: 10,
      current: 50,
    });
  });

  it("wrapping left: L1000 from 50 should pass 0 ten times", () => {
    expect(processLine({ counter: 0, current: 50 }, "L1000")).toStrictEqual({
      counter: 10,
      current: 50,
    });
  });

  it("small move right that doesn't cross 0", () => {
    expect(processLine({ counter: 0, current: 30 }, "R20")).toStrictEqual({
      counter: 0,
      current: 50,
    });
  });

  it("small move left that doesn't cross 0", () => {
    expect(processLine({ counter: 0, current: 30 }, "L20")).toStrictEqual({
      counter: 0,
      current: 10,
    });
  });

  it("move left from 10 by 10 to land on 0", () => {
    expect(processLine({ counter: 0, current: 10 }, "L10")).toStrictEqual({
      counter: 1,
      current: 0,
    });
  });

  it("move right from 90 by 10 to land on 0", () => {
    expect(processLine({ counter: 0, current: 90 }, "R10")).toStrictEqual({
      counter: 1,
      current: 0,
    });
  });

  it("move left from 5 by 10 to wrap to 95", () => {
    expect(processLine({ counter: 0, current: 5 }, "L10")).toStrictEqual({
      counter: 1,
      current: 95,
    });
  });

  it("move right from 95 by 10 to wrap to 5", () => {
    expect(processLine({ counter: 0, current: 95 }, "R10")).toStrictEqual({
      counter: 1,
      current: 5,
    });
  });

  describe("Full example from task", () => {
    it("step 1: L68 from 50", () => {
      const result = processLine({ counter: 0, current: 50 }, "L68");
      expect(result.current).toBe(82);
      expect(result.counter).toBe(1); // crosses 0 once during rotation
    });

    it("step 2: L30 from 82", () => {
      const result = processLine({ counter: 1, current: 82 }, "L30");
      expect(result.current).toBe(52);
      expect(result.counter).toBe(1); // no crossing
    });

    it("step 3: R48 from 52", () => {
      const result = processLine({ counter: 1, current: 52 }, "R48");
      expect(result.current).toBe(0);
      expect(result.counter).toBe(2); // lands on 0
    });

    it("step 4: L5 from 0", () => {
      const result = processLine({ counter: 2, current: 0 }, "L5");
      expect(result.current).toBe(95);
      expect(result.counter).toBe(2); // no additional crossing (starts at 0)
    });

    it("step 5: R60 from 95", () => {
      const result = processLine({ counter: 2, current: 95 }, "R60");
      expect(result.current).toBe(55);
      expect(result.counter).toBe(3); // crosses 0 once
    });

    it("step 6: L55 from 55", () => {
      const result = processLine({ counter: 3, current: 55 }, "L55");
      expect(result.current).toBe(0);
      expect(result.counter).toBe(4); // lands on 0
    });

    it("step 7: L1 from 0", () => {
      const result = processLine({ counter: 4, current: 0 }, "L1");
      expect(result.current).toBe(99);
      expect(result.counter).toBe(4); // no additional crossing (starts at 0)
    });

    it("step 8: L99 from 99", () => {
      const result = processLine({ counter: 4, current: 99 }, "L99");
      expect(result.current).toBe(0);
      expect(result.counter).toBe(5); // lands on 0
    });

    it("step 9: R14 from 0", () => {
      const result = processLine({ counter: 5, current: 0 }, "R14");
      expect(result.current).toBe(14);
      expect(result.counter).toBe(5); // no additional crossing (starts at 0)
    });

    it("step 10: L82 from 14", () => {
      const result = processLine({ counter: 5, current: 14 }, "L82");
      expect(result.current).toBe(32);
      expect(result.counter).toBe(6); // crosses 0 once
    });

    it("stepping off zero", () => {
      expect(processLine({ counter: 0, current: 0 }, "L1")).toStrictEqual({
        counter: 0,
        current: 99,
      });
    });
  });
});
