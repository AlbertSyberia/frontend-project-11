import { subscribe } from 'valtio/vanilla'
import { state } from '../state.js'

export function feedback(i18nInstance) {
  const t = i18nInstance.t

  const input = document.querySelector('#rss-input')
  const message = document.querySelector('.message')

  const render = () => {

    const error = state.form.error


    if (!input || !message) return 

    message.replaceChildren()

    if (error) {
      const div = document.createElement('div')
      const p = document.createElement('p')
      p.textContent = t(error)
      p.classList.add('mt-4', 'text-red-500')
      div.appendChild(p)
      message.appendChild(div)

      input.classList.add('outline-3', 'outline-offset-3', 'outline-red-700')
    }
    else {
      input.classList.remove('outline-3', 'outline-offset-3', 'outline-red-700')
    }
  }

  subscribe(state.form, render)

  i18nInstance.on('languageChanged', render)
}
