import { snapshot, subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function renderError(i18nInstance) {
  const input = document.querySelector('#rss-input')
  const message = document.querySelector('.message')

  let lastShownError = null

  const render = () => {
    const snap = snapshot(state)

    const failedFeed = snap.feeds.find((f) => f.error && !f.title)
    const shownError = snap.form.error || snap.feedErr.error || failedFeed?.error || ''

    if (shownError === lastShownError) return
    lastShownError = shownError

    if (shownError) {
      message.replaceChildren()
      const p = document.createElement('p')
      p.textContent = i18nInstance.t(shownError)
      p.classList.add('mt-4', 'text-red-500')
      message.appendChild(p)
      input.classList.add('outline-3', 'outline-offset-3', 'outline-red-700')
    } else {
      message.replaceChildren()
      input.classList.remove('outline-3', 'outline-offset-3', 'outline-red-700')
    }
  }

  subscribe(state, render)

  i18nInstance.on('languageChanged', () => {
    lastShownError = null
    render()
  })
}
