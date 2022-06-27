import path from 'path'
// import dgram from 'node:dgram'

// import osc from 'osc-min'
import { fs } from '@grundstein/commons'

// const udp = dgram.createSocket('udp4')

// const host = '192.168.50.173'
// const port = 6000

const dbFile = path.join(process.cwd(), 'db.txt')

export default async (req) => {
  if (!req.url.includes('?')) {
    return {
      code: 400,
      body: 'request url needs to include a question mark.',
    }
  }

  const [_p, vote] = req.url.split('?')

  if (vote !== '0' && vote !== '1') {
    return {
      code: 400,
      body: `Request needs to vote for 0 or 1, received: ${vote}`,
    }
  }

  // const buf = osc.toBuffer({
  //   address: '/vote',
  //   args: [{
  //     value: parseInt(vote),
  //     type: 'integer',
  //   }],
  // })

  // udp.send(buf, 0, buf.length, port, host, (err, res) => {
  //     if (err) {
  //       console.log(err)
  //       return
  //     }

  //   console.log('successfully sent', res)
  // })

  await fs.appendFile(dbFile, vote)

  return {
    code: 200,
    body: `You voted for ${vote === '0' ? 'GameOver' : 'Replay'}`,
  }
}
