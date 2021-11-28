export default function buildMakeComment ({ Id, md5, sanitize }) {
  return function makeComment ({
    author,
    createdOn = Date.now(),
    id = Id.makeId(),
    modifiedOn = Date.now(),
    postId,
    replyToId,
    text
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Comment must have a valid id.')
    }
    if (!author) {
      throw new Error('Comment must have an author.')
    }
    if (author.length < 2) {
      throw new Error("Comment author's name must be longer than 2 characters.")
    }
    if (!postId) {
      throw new Error('Comment must contain a postId.')
    }
    if (!text || text.length < 1) {
      throw new Error('Comment must include at least one character of text.')
    }
    if (replyToId && !Id.isValidId(replyToId)) {
      throw new Error('If supplied. Comment must contain a valid replyToId.')
    }

    let sanitizedText = sanitize(text).trim()
    if (sanitizedText.length < 1) {
      throw new Error('Comment contains no usable text.')
    }

    const deletedText = '.xX This comment has been deleted Xx.'
    let hash

    return Object.freeze({
      getAuthor: () => author,
      getCreatedOn: () => createdOn,
      getHash: () => hash || (hash = makeHash()),
      getId: () => id,
      getModifiedOn: () => modifiedOn,
      getPostId: () => postId,
      getReplyToId: () => replyToId,
      getText: () => sanitizedText,
      isDeleted: () => sanitizedText === deletedText,
      markDeleted: () => {
        sanitizedText = deletedText
        author = 'deleted'
      }
    })

    function makeHash () {
      return md5(
        sanitizedText +
          (author || '') +
          (postId || '') +
          (replyToId || '')
      )
    }
  }
}
