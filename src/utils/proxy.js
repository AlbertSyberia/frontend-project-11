import axios from 'axios'

export async function getPage(url) {
  const encoded = encodeURIComponent(url)
  const resp = await axios.get(
    `https://allorigins.hexlet.app/get?url=${encoded}&charset=UTF-8&disableCache=true`
  )
  return resp.data.contents
}