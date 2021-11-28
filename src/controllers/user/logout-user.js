export default function makelogin ({ logoutUser }) {
    return async function login (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const userJwt = req.get("Authorization").slice("Bearer ".length)

        const deletedSession = await logoutUser(
            userJwt
        )
        return {
          headers,
          statusCode: 200,
          body: deletedSession
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
  