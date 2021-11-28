import makeComment from '../../entities/comment'
export default function makeEditComment ({ CommentsDb }) {
  return async function editComment ({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply an id.')
    }
    if (!changes.text) {
      throw new Error('You must supply text.')
    }
    const existing = await CommentsDb.findById({ id })

    if (!existing) {
      throw new RangeError('Comment not found.')
    }
    const comment = makeComment({ ...existing, ...changes, modifiedOn: null })
    if (comment.getHash() === existing.hash) {
      return existing
    }
    const updated = await CommentsDb.update({
      id: comment.getId(),
      modifiedOn: comment.getModifiedOn(),
      text: comment.getText(),
      hash: comment.getHash()
    })
    return { ...existing, ...updated }
  }
}
