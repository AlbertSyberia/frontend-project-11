import { proxy } from 'valtio/vanilla'

export const state = proxy({
  form: {
    error: '', // ошибка формы / состояние валидации
  },
  feeds: [],
  posts: [],
  feedErr: {
    error: '',
    loading: false,
  },
})

window.__state = state
