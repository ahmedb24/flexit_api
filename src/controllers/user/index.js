import {
  addUser,
  editUser,
  removeUser,
  loginUser,
  logoutUser
} from '../../use-cases/users'
import makeDeleteUser from './delete-user'
import makePostUser from './post-user'
import makePatchUser from './patch-user'
import makeLoginUser from './login-user'
import makeLogoutUser from './logout-user'

const deleteUser = makeDeleteUser({ removeUser })
const postUser = makePostUser({ addUser })
const patchUser = makePatchUser({ editUser })
const login = makeLoginUser({
  loginUser
})
const logout = makeLogoutUser({
  logoutUser
})

const userController = Object.freeze({
  deleteUser,
  postUser,
  patchUser,
  login,
  logout
})

export default userController
export { deleteUser, postUser, patchUser, login, logout }
