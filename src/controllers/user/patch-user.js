export default function makePatchUser ({ editUser }) {
  return async function patchUser (httpRequest) {
    try {
      const { ...userInfo } = httpRequest.body
      const toEdit = {
        ...userInfo,
        id: httpRequest.query.id
      }
      const patched = await editUser(toEdit)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { patched }
      }
    } catch (e) {
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
