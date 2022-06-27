import path from 'path'
import { fs } from '@grundstein/commons'

const dbFile = '/home/grundstein/db.txt'

export default async (req) => {
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


  if (req.url.includes('?') && req.url.endsWith('verbose=1')) {
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
