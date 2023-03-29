import axios, { AxiosInstance } from "axios"
import { IpLeakAdapter } from "./IpLeakAdapter"

describe("IpLeakAdapter", () => {
  let axiosInstance: AxiosInstance
  let ipLeakAdapter: IpLeakAdapter

  beforeAll(() => {
    axiosInstance = axios.create()
    ipLeakAdapter = new IpLeakAdapter(axiosInstance)
  })

  it("should get ip", async () => {
    const ip = await ipLeakAdapter.getIp()

    expect(ip).toBeTruthy()
  })

  it("should get dnsIps", async () => {
    const dnsIps = await ipLeakAdapter.getDnsIps()

    console.log({ dnsIps })
    expect(dnsIps).toBeTruthy()
  }, 60000)
})
