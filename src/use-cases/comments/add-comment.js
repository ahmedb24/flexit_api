import makeComment from '../../entities/comment'
export default function makeAddComment ({ CommentsDb }) {
  return async function addComment (CommentInfo) {
    const Comment = makeComment(CommentInfo)
    const exists = await CommentsDb.findByHash({ hash: Comment.getHash() })
    if (exists) {
      return exists
    }

    return CommentsDb.insert({
      author: Comment.getAuthor(),
      createdOn: Comment.getCreatedOn(),
      hash: Comment.getHash(),
      id: Comment.getId(),
      modifiedOn: Comment.getModifiedOn(),
      postId: Comment.getPostId(),
      replyToId: Comment.getReplyToId(),
      text: Comment.getText()
    })
  }
}
