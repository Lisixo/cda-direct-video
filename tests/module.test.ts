import { getDirectLinks } from '../src'

test('check module is returning sources', async () => {
  const data: any = await getDirectLinks('https://www.cda.pl/video/10359422ad')

  expect(data.success).toBeTruthy()
  expect(data.videos.length).toEqual(4)

  console.log(data)
})

describe('check `getDirectLinks` function', () => {
  it('returns error due to an invalid URL', async () => {
    const data: any = await getDirectLinks('https://eb/dcda.pl/620x368/10359422ad')

    expect(data.success).toBeFalsy()
    expect(data.code).toBe('E_INVALID_URL')
  })

  it('returns error due to an other URL', async () => {
    const data: any = await getDirectLinks('https://google.com')

    expect(data.success).toBeFalsy()
    expect(data.code).toBe('E_INVALID_URL')
  })

  it('returns error due to invalid video ID in link', async () => {
    const data: any = await getDirectLinks('https://ebd.cda.pl/620x368/667sdf56')

    expect(data.success).toBeFalsy()
    expect(data.code).toBe('E_INVALID_ID')
  })

  
})