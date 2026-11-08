import { validate } from '../utils/validator.js'
import { state } from '../state.js'
import { loadFeed } from './feeds.js'

export async function form() {
  const formEl = document.querySelector('.rss-form')
  const input = formEl.querySelector('#rss-input')
  const submitButton = formEl.querySelector('.add')

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault()

    state.form.error = ''

    const url = input.value.trim()
    const errorKey = await validate(url)

    if (errorKey) {
      state.form.error = errorKey
      return
    }

    const existing = state.feeds.find((f) => f.url === url)
    if (existing) {
      if (existing.error || !existing.title) {
        await loadFeed(existing.id)
      } else {
        state.form.error = 'message.including'
      }
      return
    }

    submitButton.disabled = true

    const newFeed = {
      id: crypto.randomUUID(),
      url,
      title: null,
      description: null,
      loading: true,
      error: '',
    }

    state.feeds.push(newFeed)

    input.value = ''
    input.focus()

    try {
      await loadFeed(newFeed.id)
    } finally {
      submitButton.disabled = false
    }
  })
}
