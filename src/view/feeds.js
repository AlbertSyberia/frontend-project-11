import { getPage } from '../tools/proxy.js'
import { parseRss } from '../tools/parser.js'
import { state } from '../state.js'

export async function loadFeed() {
  const allContent = document.querySelector('.content')
  const divFeeds = allContent.querySelector('.feeds')
  const stateFeeds = state.feeds

  for (feed of stateFeeds){
    const url = feed.url
    try { 
      const request = await getPage(url)
      return request
    } catch (e) {
      state.form.error = e
    }
    
    try { 
      const response = parseRss(request)
      return response
    } catch (e) {
      state.form.error = e
    }
  }

    
   //allContent.classList.replace('invisible', 'visible')
  })
}