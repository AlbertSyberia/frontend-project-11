import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function renderPosts() {
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

      a.textContent = post.title
      a.href = post.link
      a.classList.add('text-lg', 'font-bold', 'text-blue-500', 'hover:text-blue-700', 'active:text-gray-800')

      li.appendChild(a)
      list.appendChild(li)
    })
    postsList.appendChild(list)
  }

  subscribe(state, render)
  render()
}
