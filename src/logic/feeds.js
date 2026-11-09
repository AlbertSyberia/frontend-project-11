import { parseRss } from '../utils/parser.js'
import { state } from '../state.js'
import { replaceFeedPosts } from './posts.js'
import { getPage } from '../utils/proxy.js'

export async function loadFeed(feedId) {
  const feed = state.feeds.find((f) => f.id === feedId)
  if (!feed) throw new Error(`Unknown feed: ${feedId}`)

  feed.loading = true
  feed.error = null

  let content
  try {
    content = await getPage(feed.url)
  } catch {
    feed.error = 'message.networkError'
    feed.loading = false
    return
  }

  try {
    const parsed = parseRss(content)
    if (parsed.error) {
      feed.error = parsed.error
      return
    }

    feed.title = parsed.feed.title
    feed.description = parsed.feed.description
    feed.error = null
    replaceFeedPosts(feed.id, parsed.posts)
  } catch {
    feed.error = 'message.parseError'
  } finally {
    feed.loading = false
  }
}

export async function updateFeeds() {
  await Promise.all(state.feeds.map((feed) => loadFeed(feed.id)))
}
