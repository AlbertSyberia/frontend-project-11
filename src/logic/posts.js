import { state } from '../state.js'

export function replaceFeedPosts(feedId, feedPosts) {
  const previousPosts = new Map(
    state.posts
      .filter((post) => post.feedId === feedId)
      .map((post) => [post.id, post]),
  )
  const posts = feedPosts.map((post) => {
    const id = `${feedId}:${post.guid || post.link || post.title}`
    return {
      id,
      feedId,
      title: post.title,
      link: post.link,
      seen: previousPosts.get(id)?.seen || false,
    }
  })

  for (let index = state.posts.length - 1; index >= 0; index -= 1) {
    if (state.posts[index].feedId === feedId) state.posts.splice(index, 1)
  }
  state.posts.push(...posts)
}