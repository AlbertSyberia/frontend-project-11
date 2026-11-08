import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function renderFeeds(i18nInstance) {
  const divFeeds = document.querySelector('.feeds')

  const render = () => {
    const { feeds } = snapshot(state)

    if (!divFeeds) return


    const loadedFeeds = feeds.filter((feed) => feed.title)

    divFeeds.replaceChildren()

    if (loadedFeeds.length === 0) {
      divFeeds.classList.add('invisible')
      return
    }

    divFeeds.classList.remove('invisible')

    const h2 = document.createElement('h2')
    h2.classList.add('feeds-heading', 'text-xl', 'font-bold', 'mb-4', 'text-gray-800')
    h2.textContent = i18nInstance.t('titles.feedsTitle')
    divFeeds.appendChild(h2)

    const ul = document.createElement('ul')
    loadedFeeds.forEach((feed) => {
      const li = document.createElement('li')
      const h3 = document.createElement('h3')
      const p = document.createElement('p')

      li.classList.add('mb-4')
      h3.classList.add('small', 'font-bold', 'm-0')
      p.classList.add('m-0', 'small', 'text-black-50')

      h3.textContent = feed.title
      if (feed.description) {
        p.textContent = feed.description
        li.appendChild(p)
      }

      li.prepend(h3)
      ul.appendChild(li)
    })
    divFeeds.appendChild(ul)
  }

  subscribe(state, render)
  i18nInstance.on('languageChanged', render)
}
