import { randomAlphaNumString } from "./randomAlphanumString"

describe("randomAlphanumString", () => {
  it("should get random string", async () => {
    await Promise.all(
      Array.from(Array(300).keys()).map((_) => {
        randomAlphaNumString().then((ramdomString) =>
          expect(/[a-z0-9]{40}/.test(ramdomString)).toBeTruthy()
        )
      })
    )
  })
})
