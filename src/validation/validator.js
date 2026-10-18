import { string } from 'yup'
import { state } from '../view.js'

const rssSchema = string()
  .url()
  .required()

export const validate = async (inputValue) => {
  state.formError = ''

  if (inputValue.trim().length === 0) {
    state.formError = 'Не должно быть пустым'
    return false
  }

  if (state.feeds.includes(inputValue.trim())) {
    state.formError = 'Такой RSS уже добавлен'
    return false
  }

  try {
    await rssSchema.validate(inputValue.trim())
    return true
  }
  catch {
    state.formError = 'Ссылка должна быть валидным URL'
    return false
  }
}
