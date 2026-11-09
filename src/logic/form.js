import { validate } from '../utils/validator.js'
import { state } from '../state.js'
import { loadFeed } from './feeds.js'

export async function form() {
  const formEl = document.querySelector('.rss-form')
  const input = formEl.querySelector('#rss-input')

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (state.form.status === 'validating') return

    state.form.status = 'validating'
    state.form.error = null
    const url = input.value.trim()
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

    try {
      const existing = state.feeds.find((f) => f.url === url)
      if (existing) {
        if (existing.error) {
          await loadFeed(existing.id)
          state.form.status = existing.error ? 'failed' : 'success'
        } else {
          state.form.error = 'message.including'
          state.form.status = 'failed'
        }
        return
      }

      const newFeed = {
        id: crypto.randomUUID(),
        url,
        title: '',
        description: '',
        loading: false,
        error: null,
      }

      state.feeds.push(newFeed)
      input.value = ''
      input.focus()
      await loadFeed(newFeed.id)
      state.form.status = newFeed.error ? 'failed' : 'success'
    } catch {
      state.form.error = 'message.unknownError'
      state.form.status = 'failed'
    }
  })
}
