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
    description.classList.add('m-0', 'block', 'small', 'text-black-50')
    description.textContent = feed.description
    li.appendChild(description)
  }

  return li
}

export function renderFeeds() {
  const feedsContainer = document.querySelector('.feeds-container')
  const feedsList = document.querySelector('.feeds')

  const render = () => {
    const { feeds } = snapshot(state)
    const loadedFeeds = feeds.filter((feed) => feed.title)

    feedsList.replaceChildren()
    feedsList.classList.toggle('invisible', loadedFeeds.length === 0)
    feedsContainer.classList.toggle('invisible', loadedFeeds.length === 0)

    const ul = document.createElement('ul')
    loadedFeeds.forEach((feed) => ul.appendChild(createFeedItem(feed)))
    feedsList.appendChild(ul)
  }

  subscribe(state, render)
  render()
}
