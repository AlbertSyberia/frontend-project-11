import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

const createPostItem = (post) => {
  const li = document.createElement('li')
  const link = document.createElement('a')
  link.textContent = post.link
  link.href = post.link
  link.classList.add('text-lg', 'font-bold', 'text-blue-500', 'hover:text-blue-700', 'active:text-gray-800')
  li.appendChild(link)
  return li
}

export function renderPosts(i18nInstance) {
  const postsContainer = document.querySelector('.posts')

  const render = () => {
    const { posts } = snapshot(state)
    postsContainer.replaceChildren()
    postsContainer.classList.toggle('invisible', posts.length === 0)

    if (posts.length === 0) return

    const heading = document.createElement('h2')
    heading.classList.add('posts-heading', 'text-xl', 'font-bold', 'mb-4', 'text-gray-800')
    heading.textContent = i18nInstance.t('titles.postsTitle')
    postsContainer.appendChild(heading)

    const list = document.createElement('ul')
    posts.forEach((post) =>  {      
        const li = document.createElement('li')
        const a = document.createElement('a')

        a.textContent = post.title
        a.href = post.link
        a.classList.add('text-lg', 'font-bold', 'text-blue-500', 'hover:text-blue-700', 'active:text-gray-800')

        li.appendChild(a)
        list.appendChild(li)
      })
    postsContainer.appendChild(list)
  }

  subscribe(state, render)
  render()
  i18nInstance.on('languageChanged', render)
}
