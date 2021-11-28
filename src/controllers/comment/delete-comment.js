export default function makeDeleteComment ({ removeComment }) {
  return async function deleteComment (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const deleted = await removeComment({ id: httpRequest.query.id })
      return {
        headers,
        statusCode: deleted.deletedCount === 0 ? 404 : 200,
        body: { deleted }
      }
    } catch (e) {
      console.log(e)
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
