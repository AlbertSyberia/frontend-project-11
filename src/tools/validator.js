import { string, setLocale } from 'yup'
import { state } from '../state.js'

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

  const existingFeed = state.feeds.some(feed => feed.url === trimmed)
  if (existingFeed) {
    return 'message.including'
  }

  try {
    await rssSchema.validate(trimmed)
    return null
  } catch (error) {
    if (error.name === 'ValidationError') {
      const err = error.errors?.[0]
      if (typeof err === 'object' && err.key) {
        return err.key
      }
    }
    return 'message.invalidUrl'
  }
}