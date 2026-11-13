import { state } from '../state.js'

export function replaceFeedPosts(feedId, feedPosts) {
  const previousSeen = new Map(
    state.posts
      .filter(p => p.feedId === feedId)
      .map(p => [p.id, p.seen]),
  )

  const newPosts = feedPosts.map(post => {
    const id = `${feedId}:${post.guid || post.link || post.title}`
    return {
      id,
      feedId,
      title: post.title,
      description: post.description,
      link: post.link,
      seen: previousSeen.get(id) ?? false,
    }
  })

  
  state.posts = [
    ...state.posts.filter(p => p.feedId !== feedId),
    ...newPosts,
  ]
}


function findPostById(postId) {
  return state.posts.find(post => post.id === postId) ?? null
}

export function markPostSeen(postId) {
  const post = findPostById(postId)
  if (post) {
    post.seen = true
  }
}
