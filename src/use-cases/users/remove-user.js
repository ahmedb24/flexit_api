import makeUser from '../../entities/User'
export default function makeDeleteUser ({ UsersDb, jwt }) {
  return async function deleteUser ( { password, jwt } ) {
    if (!password || typeof password !== "string") {
      throw new Error('Bad password format, expected string.')
    }
    
    const userClaim = await decoded(jwt)
    var { error } = userClaim
    if (error) {
      throw new Error(error)
    }
    
    const user = makeUser(await UsersDb.findByEmail(userClaim.email))
    if (!(await user.comparePassword(password))) {
      throw new Error('Make sure your password is correct.')
    }

    return await UsersDb.delete(userClaim.email)
  }

  async function decoded (userJwt) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
      if (error) {
        return { error }
      }
      return new User(res)
    })
}
}