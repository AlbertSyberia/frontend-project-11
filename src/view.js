import { proxy, subscribe } from 'valtio/vanilla'
import { validate } from './validation/validator.js'

export const state = proxy({
  feeds: [], // массив фидов
  posts: [], // массив постов
  uiState: false, // статус интерфейса
  formError: '', // ошибка формы / состояние валидации
})

export function validator() {
  const form = document.querySelector('.rss-form')
  const input = form.querySelector('#rss-input')
  const message = document.querySelector('.message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let valid = await validate(input.value)

    if (valid) {
      state.feeds.push(input.value)
      input.value = ''
      input.focus()
    }
  })

  const render = () => {
    if (message) {
      message.replaceChildren()
    }
    else { return }

    if (state.formError) {
      const div = document.createElement('div')
      const p = document.createElement('p')

      p.textContent = state.formError
      p.classList.add('mt-4')
      p.classList.add('text-red-500')
      div.appendChild(p)
      message.appendChild(div)

      input.classList.add('outline-3', 'outline-offset-3', 'outline-red-700')
    }
    else {
      input.classList.remove('outline-3', 'outline-offset-3', 'outline-red-700')
    }
  }

  subscribe(state, render)
  render()
}
