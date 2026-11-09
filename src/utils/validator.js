import { string, setLocale, ValidationError } from 'yup'

setLocale({
  mixed: {
    default: () => ({ key: 'message.invalidUrl' }),
    required: () => ({ key: 'message.empty' }),
  },
  string: {
    url: () => ({ key: 'message.invalidUrl' }),
  },
})

const rssSchema = string().url().required()

export const validate = async (inputValue) => {
  const trimmed = inputValue.trim()

  if (!trimmed) {
    return 'message.empty'
  }

  try {
    await rssSchema.validate(trimmed)
    return null
  } catch (error) {
    if (error instanceof ValidationError) {
      const err = error.errors?.[0]
      if (err && typeof err === 'object' && err.key) {
        return err.key
      }
      return 'message.invalidUrl'
    }
    throw error
  }
}