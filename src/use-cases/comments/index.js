import makeAddComment from './add-comment'
import makeEditComment from './edit-comment'
import makeRemoveComment from './remove-comment'
import makeListComments from './list-comments'
import { CommentsDb } from '../../data-access'

const addComment = makeAddComment({ CommentsDb })
const editComment = makeEditComment({ CommentsDb })
const listComments = makeListComments({ CommentsDb })
const removeComment = makeRemoveComment({ CommentsDb })

const commentService = Object.freeze({
  addComment,
  editComment,
  listComments,
  removeComment
})

export default commentService
export { addComment, editComment, listComments, removeComment }
