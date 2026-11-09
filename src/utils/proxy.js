import axios from 'axios'

export async function getPage(url) {
  const params = new URLSearchParams({
    url,
    disableCache: 'true',
  })
  const resp = await axios.get(`https://allorigins.hexlet.app/get?${params}`)
  if (typeof resp.data?.contents !== 'string') {
    throw new Error('Invalid response from RSS proxy')
  }
  return resp.data.contents
}