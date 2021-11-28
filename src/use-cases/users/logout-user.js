import makeUser from '../../entities/User'
export default function makeLogoutUser ({ UsersDb }) {
  return async function logoutUser ( jwt ) {

    const userObj = await decoded(jwt)
    var { error } = userObj
    if (error) {
        throw new Error(error)
    }
    
    const logoutResult = await UsersDb.logoutUser(userObj.email)
    var { error } = logoutResult
    if (error) {
        throw new Error(error)
    }
    return logoutResult
 }

 async function decoded(userJwt) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
      if (error) {
        return { error }
      }
      return makeUser(res)
    })
  }
}