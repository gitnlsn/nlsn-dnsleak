export const generateArray1toN = (length: number): Array<number> =>
  Array.from(Array(length).keys()).map((_, index) => index + 1)
