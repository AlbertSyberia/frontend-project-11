import { state } from '../state.js'
import { parseRss } from '../utils/parser.js'
import { replaceFeedPosts } from './posts.js'
import { getPage } from '../utils/proxy.js'

export async function loadFeed(feed) {
  feed.loading = true
  feed.error = null

  try {
    const content = await getPage(feed.url)
    const parsed = parseRss(content)

    feed.error = parsed.error ?? null
    if (!parsed.error) {
      feed.title = parsed.feed.title
      feed.description = parsed.feed.description
      replaceFeedPosts(feed.id, parsed.posts)
    }
  } catch (e) {
    console.error('loadFeed failed:', feed.url, e)
    feed.error = 'message.networkError'
  } finally {
    feed.loading = false
  }
}

export async function updateFeeds() {
  await Promise.all(state.feeds.map((feed) => loadFeed(feed)))
}


 export const startAutoUpdate = () => {
  const run = async () => {
    try {
      await updateFeeds()
    } catch (e) {
      console.error('updateFeeds failed:', e)
    }
  }

  const schedule = () => {
    setTimeout(async () => {
      await run()
      schedule()
    }, 5000)
  }

  run()
  schedule()
}