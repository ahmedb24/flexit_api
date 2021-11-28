import makeUser from '../../entities/User'
export default function makeAddUser ({ UsersDb }) {
  return async function addUser (UserInfo) {
    const user = makeUser(UserInfo)
    const exists = await UsersDb.findByEmail({ email: user.getEmail() })
    if (exists) {
      throw new Error('User Already exists')
    }

    return UsersDb.insert({
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      date_created: user.getDateCreated(),
      hash: user.getHash(),
    })
  }
}
