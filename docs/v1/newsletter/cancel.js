import { constants, fs } from '@grundstein/commons'

const dbFile = '/home/grundstein/subscribers.txt'

const { HTTP2_HEADER_PATH } = constants

export default async ({ headers }) => {
  const url = headers[HTTP2_HEADER_PATH]
  console.log({ url })

  if (!url.includes('?')) {
    return {
      code: 400,
      body: 'request url needs to include a question mark.',
    }
  }

  const email = url.searchParams.get('email')
  const tosAccepted = url.searchParams.get('tos')
  const name = url.searchParams.get('name')

  if (!tosAccepted) {
    return {
      code: 400,
      body: 'You need to accept the Terms of Service.',
    }
  }

  const signupTime = new Date().toUTCString()
  await fs.appendFile(dbFile, `${email},${name},${signupTime}`)

  return {
    code: 200,
    body: 'OK',
  }
}
