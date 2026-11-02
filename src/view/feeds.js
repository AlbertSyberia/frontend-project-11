import { getPage } from '../tools/proxy.js'
import { parseRss } from '../tools/parser.js'
import { state } from '../state.js'

export async function loadFeed() {
  const allContent = document.querySelector('.content')
  const divFeeds = allContent.querySelector('.feeds')
  const stateFeeds = state.feeds

  stateFeeds.map(async (feed) => {
    const url = feed.url
    const request = await getPage(url)
    try { 
      const response = parseRss(request)
      return response
    } catch (e) {
      state.form.error = e
    }
    
  })
}