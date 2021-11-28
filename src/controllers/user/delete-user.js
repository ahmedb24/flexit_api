export default function makeDeleteUser ({ removeUser }) {
  return async function deleteUser (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const userJwt = httpRequest.headers["Authorization"] ? httpRequest.headers["Authorization"].slice("Bearer ".length): ''
      const deleted = await removeUser({ password: httpRequest.body.password, jwt: userJwt })
      return {
        headers,
        statusCode: deleted.deletedCount === 0 ? 404 : 200,
        body: { deleted }
      }
    } catch (e) {
      // TODO: Error logging
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
