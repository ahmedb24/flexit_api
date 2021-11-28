import makeUser from '../../entities/User'
export default function makeEditUser ({ UsersDb }) {
  return async function editUser ({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply an id.')
    }
    if (!changes) {
      throw new Error('You must supply changes.')
    }

    const existing = await UsersDb.findById({ id })

    if (!existing) {
      throw new RangeError('User not found.')
    }
    const User = makeUser({ ...existing, ...changes })
    if (User.getHash() === existing.hash) {
      return existing
    }
    const updated = await UsersDb.update(id, {
      email: User.getEmail(),
      name: User.getName(),
      date_modified: User.getDateModified(),
      hash: User.getHash()
    })
    return { ...existing, ...updated }
  }
}
