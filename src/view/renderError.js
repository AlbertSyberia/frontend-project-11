import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function renderError(i18nInstance) {
  const input = document.querySelector('#rss-input')
  const message = document.querySelector('.message')

  const render = () => {
    const { form, feeds } = snapshot(state)
    const errors = []

    if (form.error) {
      errors.push(i18nInstance.t(form.error))
    }

    feeds
      .filter((feed) => feed.error)
      .forEach((feed) => {
        errors.push(i18nInstance.t(feed.error))
      })

    message.replaceChildren()
    errors.forEach((error) => {
      const paragraph = document.createElement('p')
      paragraph.textContent = error
      paragraph.classList.add('mt-4', 'text-red-500')
      message.appendChild(paragraph)
    })
    input.classList.toggle('outline-3', errors.length > 0)
    input.classList.toggle('outline-offset-3', errors.length > 0)
    input.classList.toggle('outline-red-700', errors.length > 0)
  }

  render()
  subscribe(state, render)
  i18nInstance.on('languageChanged', render)
}
