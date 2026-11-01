import { proxy } from 'valtio/vanilla'

export const state = proxy({
  form: {
    error: '', // ошибка формы / состояние валидации
  },
  feeds: [],
  posts: [],
})
