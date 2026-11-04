import { getPage } from '../utils/proxy.js'
import { parseRss } from '../utils/parser.js'
import { state } from '../state.js'
import { subscribe } from 'valtio/vanilla'

const loadRSS = async (url) => {
  try {
    const content = await getPage(url)
    const parsed = parseRss(content)
    if (parsed.error) {
      throw new Error(parsed.error)
    }
    return parsed
  } catch (e) {
    return { error: e.message || 'message.networkError' }
  }
}

async function loadFeed() {
  state.feedErr.error = ''
  const updatedFeeds = []
  const updatedPosts = []

  for (const feed of state.feeds){
    const url = feed.url
    const result = await loadRSS(url)

    if(result.error){
      state.feedErr.error = result.error
      return
    }

    const newFeed = {
      ...feed, 
      title: result.feed.title, 
      description: result.feed.description
    }

    for (const post of result.posts) {
      const id = guid || link

      const newPost = { 
        id: id,
        feedId: newFeed.id,
        title: post.title, 
        link: post.link
      }
      updatedPosts.push(newPost)
    }

    updatedFeeds.push(newFeed)
  }

  state.feeds = updatedFeeds
  state.posts = updatedPosts
}

 const render = (i18nInstance) => {
  const message = document.querySelector('.message')
  const allContent = document.querySelector('.content')
  if (!message || !allContent) return

  message.replaceChildren()
  const err = state.feedErr.error

  if (err) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    p.textContent = i18nInstance.t(err)
    p.classList.add('mt-4', 'text-red-500')
    div.appendChild(p)
    message.appendChild(div)
  }

  const divFeeds = allContent.querySelector('.feeds')
  if (!divFeeds) return

  allContent.classList.replace('invisible', 'visible')
  divFeeds.innerHTML = ''

  const h2 = document.createElement('h2')
  h2.classList.add('feeds-heading', 'text-lg', 'font-bold', 'mb-3', 'text-gray-800')
  h2.textContent = i18nInstance.t('titles.feedsTitle')
  divFeeds.appendChild(h2)

}

export async function loadAndRenderFeeds(i18nInstance) {
  await loadFeed()
  subscribe(state.feedErr, render)
  render(i18nInstance)
}
