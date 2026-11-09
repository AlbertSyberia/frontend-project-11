import { proxy } from 'valtio/vanilla'

export const state = proxy({
  form: {
    status: 'idle',
    error: null,
  },
  feeds: [],
  posts: [],
  ui: {
    selectedPostId: null,
  },
})

window.state = state