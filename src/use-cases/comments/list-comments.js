export default function makeListComments ({ CommentsDb }) {
  return async function listComments ({ postId } = {}) {
    if (!postId) {
      throw new Error('You must supply a post id.')
    }
    const comments = await CommentsDb.findByPostId({
      postId,
      omitReplies: false
    })

    const nestedComments = nest(comments)
    return nestedComments

    function nest (comments) {
      if (comments.length === 0) {
        return comments
      }
      return comments.reduce((nested, comment) => {
        comment.replies = comments.filter(
          reply => reply.replyToId === comment.id
        )
        nest(comment.replies)
        if (comment.replyToId == null) {
          nested.push(comment)
        }
        return nested
      }, [])
    }
  }
}
