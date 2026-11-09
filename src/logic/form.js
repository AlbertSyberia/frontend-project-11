import { validate } from '../utils/validator.js'
import { state } from '../state.js'
import { loadFeed } from './feeds.js'

export function form() {
  const formEl = document.querySelector('.rss-form')
  const input = formEl.querySelector('#rss-input')
  const button = formEl.querySelector('button[type="submit"]')

  const setButton = (text, disabled) => {
    button.disabled = disabled
    button.textContent = text
  }

  input.addEventListener('input', () => {
    state.form.error = null
  })

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (state.form.status === 'validating') return

    const url = input.value.trim()

    state.form.status = 'validating'
    state.form.error = null
    input.value = ''
    setButton('Загрузка…', true)

    let errorKey
    try {
      errorKey = await validate(url)
    } catch {
      state.form.error = 'message.unknownError'
      state.form.status = 'failed'
      setButton('Добавить', false)
      return
    }

    if (errorKey) {
      state.form.error = errorKey
      state.form.status = 'failed'
      setButton('Добавить', false)
      return
    }

    const existing = state.feeds.find((f) => f.url === url)
    if (existing) {
      state.form.error = 'message.including'
      state.form.status = 'failed'
      setButton('Добавить', false)
      return
    }

    const newFeed = {
      id: crypto.randomUUID(),
      url,
      title: '',
      description: '',
      posts: [],
      loading: false,
      error: null,
    }

    await loadFeed(newFeed)

    if (newFeed.error) {
      state.form.error = newFeed.error
      state.form.status = 'failed'
      setButton('Добавить', false)
      return
    }

    state.feeds.push(newFeed)
    input.value = ''
    input.focus()
    state.form.status = 'success'
    setButton('Добавить', false)
  })
}
