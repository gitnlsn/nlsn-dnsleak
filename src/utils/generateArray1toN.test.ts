import { generateArray1toN } from "./generateArray1toN"

describe("generateArray1toN", () => {
  it("should generate array with desired length", () => {
    expect(generateArray1toN(10).length).toBe(10)
  })

  it("should start at 1", () => {
    expect(generateArray1toN(10)[0]).toBe(1)
  })

  it("should end at N", () => {
    expect(generateArray1toN(10)[9]).toBe(10)
  })
})
