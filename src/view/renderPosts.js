import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function renderPosts(i18nInstance) {
  const postsContainer = document.querySelector('.posts-container')
  const postsList = document.querySelector('.posts')

  const render = () => {
    const { posts } = snapshot(state)

    postsList.replaceChildren()
    postsContainer.classList.toggle('invisible', posts.length === 0)

    const list = document.createElement('ul')
    posts.forEach((post) => {
      const li = document.createElement('li')
      const a = document.createElement('a')
      const btn = document.createElement('button')

      a.textContent = post.title
      a.href = post.link
      a.classList.add('text-lg', 'mr-70', 'font-bold', 'text-blue-500', 'hover:text-blue-700', 'active:text-gray-800')

      btn.textContent = i18nInstance.t('buttons.view')
      btn.classList.add('bg-transparent', 'hover:bg-blue-500', 'text-blue-700', 'font-semibold', 'hover:text-white', 'py-0.5', 'px-1', 'border', 'border-blue-500', 'hover:border-transparent', 'rounded')

      li.appendChild(a)
      li.appendChild(btn)
      li.classList.add('mb-10')
      list.appendChild(li)
    })
    postsList.appendChild(list)
  }

  subscribe(state, render)
  render()
  i18nInstance.on('languageChanged', render)
}
