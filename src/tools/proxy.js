import axios from 'axios'

export async function getPage(url) {
  const encoded = encodeURIComponent(url)
  const resp = await axios.get(
    `https://allorigins.hexlet.app/get?url=${encoded}&cache=no`
  )
  return resp.data.contents
}