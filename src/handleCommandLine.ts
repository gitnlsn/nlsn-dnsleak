import axios from "axios"
import getOptions from "get-options"
import { IpLeakAdapter } from "./network/IpLeakAdapter"

export const handleCommamndLine = async () => {
  const axiosInstance = axios.create()
  const ipLeakAdapter = new IpLeakAdapter(axiosInstance)

  let ip: string | undefined = undefined
  let dns: string[] | undefined = undefined

  const { options } = getOptions(process.argv, {
    "-i, --ip": "",
    "-d, --dns": "[quantity of dns server tests]",
  })

  if (Object.keys(options).includes("ip")) {
    ip = await ipLeakAdapter.getIp()
  }

  if (Object.keys(options).includes("dns")) {
    const limit =
      Number(options["dns"]) !== 0 ? Number(options["dns"]) : undefined
    dns = await ipLeakAdapter.getDnsIps(limit)
  }

  if (Object.keys(options).length === 0) {
    // If no flag is passed, get both data
    const foo = await Promise.all([
      await (async () => {
        ip = await ipLeakAdapter.getIp()
      })(),
      await (async () => {
        dns = await ipLeakAdapter.getDnsIps()
      })(),
    ])
  }

  printResults(ip, dns)
}

const printResults = (ip: string | undefined, dns: string[] | undefined) => {
  if (ip !== undefined && dns !== undefined) {
    console.log(JSON.stringify({ ip, dns }, null, 2))
    return
  }

  if (ip !== undefined) {
    console.log(JSON.stringify({ ip }, null, 2))
    return
  }

  if (dns !== undefined) {
    console.log(JSON.stringify({ dns }, null, 2))
    return
  }
}
