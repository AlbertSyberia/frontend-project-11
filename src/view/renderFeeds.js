import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

const createFeedItem = (feed) => {
  const li = document.createElement('li')
  const h3 = document.createElement('h3')

  li.classList.add('mb-4')
  h3.classList.add('small', 'font-bold', 'm-0')
  h3.textContent = feed.title
  li.appendChild(h3)

  if (feed.description) {
    const description = document.createElement('p')
    description.classList.add('m-0', 'small', 'text-black-50')
    description.textContent = feed.description
    li.appendChild(description)
  }

  return li
}

export function renderFeeds(i18nInstance) {
  const divFeeds = document.querySelector('.feeds')

  const render = () => {
    const { feeds } = snapshot(state)
    const loadedFeeds = feeds.filter((feed) => feed.title)

    if (!divFeeds) return

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
    loadedFeeds.forEach((feed) => ul.appendChild(createFeedItem(feed)))
    divFeeds.appendChild(ul)
  }

  subscribe(state, render)
  render()
  i18nInstance.on('languageChanged', render)
}
