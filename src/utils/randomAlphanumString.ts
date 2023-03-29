import { exec } from "child_process"
import { promisify } from "util"

const promisedExec = promisify(exec)

export const randomAlphaNumString = async (length = 40): Promise<string> =>
  promisedExec(
    `head /dev/urandom -n 100 | 
        tr -dc 'a-z0-9' | 
        fold -w ${length} | 
        head -n 1`
  ).then(({ stdout }) =>
    // remove skip line at the end
    stdout.replace("\n", "")
  )
