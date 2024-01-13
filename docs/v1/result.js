import path from 'node:path'

import { constants, fs } from '@grundstein/commons'

const { HTTP2_HEADER_PATH } = constants

const dbFile =
  process.env.NODE_ENV === 'production'
    ? '/home/grundstein/db.txt'
    : path.join(process.cwd(), 'db.txt')

export default async ({ headers }) => {
  const chars = await fs.readFile(dbFile, 'utf8')

  const charArray = chars.split('')

  let results = 0
  for (let char of chars) {
    if (char === '1') {
      results++
    }
  }

  const gVotes = charArray.length - results
  const rVotes = charArray.length - gVotes

  const rPercent = ((results / charArray.length) * 100).toFixed(1) / 1
  const gPercent = (100 - rPercent).toFixed(1) / 1

  const url = headers[HTTP2_HEADER_PATH]
  if (url.includes('?') && url.endsWith('verbose=1')) {
    return {
      code: 200,
      body: `{"g":"${gVotes}","r":"${rVotes}","gp":"${gPercent}","rp":"${rPercent}","t": "${charArray.length}"}`,
    }
  } else {
    return {
      code: 200,
      body: `{"g":"${gVotes}","r":"${rVotes}"}`,
    }
  }
}
