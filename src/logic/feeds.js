import { getPage } from '../utils/proxy.js'
import { parseRss } from '../utils/parser.js'
import { state } from '../state.js'

const loadRSS = async (url) => {
  const content = await getPage(url)
  const parsed = parseRss(content)
  if (parsed.error) throw new Error('message.parseError')
  return parsed
}

// Загружает один фид по id, не трогая остальные
export async function loadFeed(feedId) {
  const feed = state.feeds.find((f) => f.id === feedId)
  if (!feed) return

  feed.loading = true
  feed.error = ''

  try {
    const parsed = await loadRSS(feed.url)

    const posts = parsed.posts.map((post) => ({
      id: post.guid || post.link,
      feedId: feed.id,
      title: post.title,
      link: post.link,
    }))

    feed.title = parsed.feed.title
    feed.description = parsed.feed.description

    for (let i = state.posts.length - 1; i >= 0; i -= 1) {
      if (state.posts[i].feedId === feed.id) state.posts.splice(i, 1)
    }
    state.posts.push(...posts)

    feed.error = ''
  } catch (e) {
    feed.error = e.message.startsWith('message.')
      ? e.message
      : 'message.networkError'
  } finally {
    feed.loading = false
  }
}

export async function updateFeeds() {
  await Promise.allSettled(state.feeds.map((feed) => loadFeed(feed.id)))
}
