export default function makePatchComment ({ editComment }) {
  return async function patchComment (httpRequest) {
    try {
      const { ...commentInfo } = httpRequest.body
      const toEdit = {
        ...commentInfo,
        id: httpRequest.params.id
      }
      const patched = await editComment(toEdit)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { patched }
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      if (e.name === 'RangeError') {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 404,
          body: {
            error: e.message
          }
        }
      }
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
