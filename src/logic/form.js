import { validate } from '../utils/validator.js'
import { state } from '../state.js'
import { loadFeed } from './feeds.js'

export function form() {
  const formEl = document.querySelector('.rss-form')
  const input = formEl.querySelector('#rss-input')

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (state.form.status === 'validating') return

    const url = input.value.trim()

    state.form.status = 'validating'
    state.form.error = null
    input.value = ''

    let errorKey
    try {
      errorKey = await validate(url)
    } catch {
      state.form.error = 'message.unknownError'
      state.form.status = 'failed'
      return
    }

    if (errorKey) {
      state.form.error = errorKey
      state.form.status = 'failed'
      return
    }

    const existing = state.feeds.find((f) => f.url === url)
    if (existing) {
      state.form.error = 'message.including'
      state.form.status = 'failed'
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
      return
    }

    state.feeds.push(newFeed)
    input.value = ''
    input.focus()
    state.form.status = 'success'
  })
}
