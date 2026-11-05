import { getPage } from '../utils/proxy.js'
import { parseRss } from '../utils/parser.js'
import { state } from '../state.js'
import { subscribe } from 'valtio/vanilla'


const loadRSS = async (url) => {
  const content = await getPage(url)
  const parsed = parseRss(content)
  if (parsed.error) throw new Error('message.parseError')
  return parsed
}

export async function loadFeed() {
  state.feedErr.loading = true
  state.feedErr.error = ''

  try {
    const updatedFeeds = []
    const updatedPosts = []

    for (const feed of state.feeds) {
      const content = await getPage(feed.url)
      const parsed = parseRss(content)
      if (parsed.error) throw new Error(parsed.error)

      updatedFeeds.push({
        ...feed,
        title: parsed.feed.title,
        description: parsed.feed.description,
      })

      parsed.posts.forEach((post) => {
        updatedPosts.push({
          id: post.guid || post.link,
          feedId: feed.id,
          title: post.title,
          link: post.link,
        })
      })
    }

    state.feeds = updatedFeeds
    state.posts = updatedPosts
  } catch (e) {
    state.feedErr.error = e.message.startsWith('message.')
      ? e.message
      : 'message.networkError'
  } finally {
    state.feedErr.loading = false
  }
}

 function renderFeeds (i18nInstance) {
   const divFeeds = document.querySelector('.feeds')
   const feeds = state.feeds

   if (!divFeeds) return
   divFeeds.innerHTML = ''

   if(feeds.length > 0){
     divFeeds.classList.replace('invisible', 'visible')
     const h2 = document.createElement('h2')
     h2.classList.add('feeds-heading', 'text-xl', 'font-bold', 'mb-4', 'text-gray-800')
     h2.textContent = i18nInstance.t('titles.feedsTitle')
     divFeeds.appendChild(h2)

     const ul = document.createElement('ul')
     feeds.forEach(feed => {
       const li = document.createElement('li')
       const h3 = document.createElement('h3')
       const p = document.createElement('p')

       h3.textContent = feed.title
       h3.classList.add('small', 'font-bold', 'md-3')
       p.textContent = feed.description
       p.classList.add('m-0', 'small', 'text-black-50')

       li.appendChild(h3)
       li.appendChild(p)
       ul.appendChild(li)
     })
     divFeeds.appendChild(ul)
   }
  }

function renderPosts(i18nInstance) {
   const divPost = document.querySelector('.posts')
   const posts = state.posts

   if (!divPost) return
   divPost.innerHTML = ''

   if(posts.length > 0){
     divPost.classList.replace('invisible', 'visible')
     const h2 = document.createElement('h2')
     h2.classList.add('posts-heading', 'text-xl', 'font-bold', 'mb-4', 'text-gray-800')
     h2.textContent = i18nInstance.t('titles.postsTitle')
     divPost.appendChild(h2)

     const ul = document.createElement('ul')
     posts.forEach(post => {
       const li = document.createElement('li')
       const a = document.createElement('a')

       a.textContent = post.title
       a.href = post.link
       a.classList.add('text-lg', 'font-bold', 'text-blue-500', 'hover:text-blue-700', 'active:text-gray-800')

       li.appendChild(a)
       ul.appendChild(li)
     })
     divPost.appendChild(ul)
   }
  }

export const initRssView = (i18nInstance) => {
  subscribe(state, () => {
    renderFeeds(i18nInstance)
    renderPosts(i18nInstance)
  })
}
