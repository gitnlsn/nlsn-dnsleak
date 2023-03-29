import { AxiosInstance } from "axios"
import { generateArray1toN } from "../utils/generateArray1toN"
import { randomAlphaNumString } from "../utils/randomAlphanumString"
import { GetDnsIps } from "./GetDnsIps.interface"
import { GetIpResponse } from "./GetIpResponse.interface"

export class IpLeakAdapter {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async getIp() {
    return this.axiosInstance
      .get<GetIpResponse>("https://api.ipify.org?format=json")
      .then((response) => response.data.ip)
  }

  async getDnsIps(limit = 100) {
    // ipleak api requires a random string with length 40
    const randomString = await randomAlphaNumString(40)

    return generateArray1toN(limit)
      .map<Promise<GetDnsIps>>((index) =>
        this.axiosInstance
          .get<GetDnsIps>(
            `https://${randomString}-${index}.ipleak.net/dnsdetection/`
          )
          .then((response) => response.data)
      )
      .reduce<Promise<GetDnsIps>>((acc, next, index) => {
        if (index === 0) {
          return next
        }

        return acc.then((_) => next)
      }, Promise.resolve({} as GetDnsIps))
      .then(({ ip }) => Object.keys(ip))
      .then((ips) => [...ips].sort((left, right) => left.localeCompare(right)))
  }
}
