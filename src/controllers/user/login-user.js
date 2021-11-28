export default function makelogin ({ loginUser }) {
    return async function login (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const loginSession = await loginUser({
          ...httpRequest.body
        })
        return {
          headers,
          statusCode: 200,
          body: loginSession
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
  