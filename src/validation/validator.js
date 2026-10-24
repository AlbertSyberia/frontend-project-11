import { string, setLocale } from 'yup'
import { formState } from './view.js'

setLocale({
  mixed: {
    default: () => ({ key:'message.invalidUrl'}),
    required: () => ({ key: 'message.empty' }),
  },
  string: {
    url: () => ({ key: 'message.invalidUrl' }),
  }
})

const rssSchema = string().url().required()

export const validate = async (inputValue) => {
  formState.formError = ''

  if (formState.url.includes(inputValue.trim())) {
    formState.formError = 'message.including'
    return false
  }

  try {
    await rssSchema.validate(inputValue.trim())
    return true
  }
  catch (error){
    if(error.name === 'ValidationError'){
      const err = error.errors[0]
      if (typeof err === 'object') {
        formState.formError = err.key
      } else {
          formState.formError = 'message.invalidUrl'
        }
      return false
    }
  }
}
