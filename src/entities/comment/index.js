import crypto from 'crypto'
import Id from '../../Id'
import sanitizeHtml from 'sanitize-html'
import buildMakeComment from './comment'

const makeComment = buildMakeComment({ Id, md5, sanitize })

export default makeComment

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

function sanitize (text) {
  // TODO: allow more coding embeds
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it']
  })
}
