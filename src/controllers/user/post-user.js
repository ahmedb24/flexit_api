export default function makePostUser ({ addUser }) {
  return async function postUser (httpRequest) {
    try {
      const {...userInfo } = httpRequest.body
      const posted = await addUser({
        ...userInfo
      })
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { posted }
      }
    } catch (e) {
      console.log(e)

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
