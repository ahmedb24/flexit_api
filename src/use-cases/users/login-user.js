import makeUser from '../../entities/User'
export default function makeAddUser ({ UsersDb }) {
  return async function addUser ({ email, password} ) {
    if (!email || typeof email !== "string") {
        throw new Error('You must supply a valid email.')
    }
    
    if (!password || typeof password !== "string") {
        throw new Error('Bad password format, expected string.')
    }

    const userData = await UsersDb.findByEmail({ email: email })
    if (!userData) {
        throw new Error('Make sure your email is correct.')
    }

    const user = makeUser(userData)
    return await UsersDb.loginUser(user.getEmail(), user.encoded())
 }
}