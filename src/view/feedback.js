import { subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function feedback(i18nInstance) {
  const input = document.querySelector('#rss-input')
  const message = document.querySelector('.message')

  const render = () => {
     if (!input || !message) return

  const formError = state.form.error
  const feedError = state.feedErr.error

  message.replaceChildren()

  const shownError = formError || feedError

  if (shownError) {
    const p = document.createElement('p')
    p.textContent = i18nInstance.t(shownError)
    p.classList.add('mt-4', 'text-red-500')
    message.appendChild(p)
      input.classList.add('outline-3', 'outline-offset-3', 'outline-red-700')
    } else {
      const p = document.createElement('p')
      p.textContent = i18nInstance.t('message.success')
      p.classList.add('md-0', 'small', 'text-success', 'text-green-500')
      message.appendChild(p)
      input.classList.remove('outline-3', 'outline-offset-3', 'outline-red-700')
    }
  }

  subscribe(state, render)
  i18nInstance.on('languageChanged', render)
}
