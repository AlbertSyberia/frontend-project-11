import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function renderPosts(i18nInstance) {
  const render = () =>{
  const divPost = document.querySelector('.posts')
  const { posts } = snapshot(state)

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

  subscribe(state, render)
  i18nInstance.on('languageChanged', render)
}
