 import { snapshot } from 'valtio/vanilla'
 import { updateFeeds } from '../logic/feeds.js'
 import { state } from '../state.js'
 
 export const startAutoUpdate = () => {
  const run = async () => {
    const oldPosts = snapshot(state.posts)
    try {
      await updateFeeds()

      const seen = new Set(state.posts.map((p) => p.id ?? p.link))
      const kept = oldPosts.filter((p) => !seen.has(p.id ?? p.link))
      state.posts = [...state.posts, ...kept]
    } catch (e) {
      console.error('updateFeeds failed:', e)
    }
  }

  const schedule = async () => {
    await run()
    setTimeout(schedule, 5000)
  }

  schedule()
}