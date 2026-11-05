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
      const id = post.guid || post.link

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

 function renderFeeds (i18nInstance) {
   const divFeeds = document.querySelector('.feeds')
   const feeds = state.feeds

   if (!divFeeds) return
   divFeeds.innerHTML = ''

   if(feeds.length > 0){
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
       p.textContent = feed.description

       li.appendChild(h3)
       li.appendChild(p)
       ul.appendChild(li)
     })
     divFeeds.appendChild(ul)
   }
  }

function renderError(i18nInstance) {
  const err = state.feedErr.error
  const message = document.querySelector('.message')
  
  if (!message) return
  message.innerHTML = ''
  
  if(err) {
    const p = document.createElement('p')
    p.classList.add('mt-4', 'text-red-500')
    p.textContent = i18nInstance.t(state.feedErr.error)
    
    message.appendChild(p)
  }
}

function renderPosts(i18nInstance) {
   const divPost = document.querySelector('.posts')
   const posts = state.posts

   if (!divPost) return
   divPost.innerHTML = ''

   if(posts.length > 0){
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

       li.appendChild(a)
       ul.appendChild(li)
     })
     divPost.appendChild(ul)
   }
  }

subscribe(state.feeds, loadAndRenderFeeds)

async function loadAndRenderFeeds(i18nInstance){
  await loadFeed()
  renderFeeds(i18nInstance)
  renderPosts(i18nInstance)
  renderError(i18nInstance)
}
