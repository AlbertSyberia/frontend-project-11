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
      link: post.link,
      seen: previousSeen.get(id) ?? false,
    }
  })

  
  state.posts = [
    ...state.posts.filter(p => p.feedId !== feedId),
    ...newPosts,
  ]
}

function markPostSeen(postId) {} // пометить пост прочитанным;

function findPostById(postId) {} // найти пост по id
