import makeAddUser from './add-user'
import makeEditUser from './edit-user'
import makeRemoveUser from './remove-user'
import makeLoginUser from './login-user'
import makeLogoutUser from './logout-user'
import { UsersDb } from '../../data-access'
import jwt from 'jsonwebtoken'

const addUser = makeAddUser({ UsersDb })
const editUser = makeEditUser({ UsersDb })
const removeUser = makeRemoveUser({ UsersDb, jwt })
const loginUser = makeLoginUser({ UsersDb })
const logoutUser = makeLogoutUser({ UsersDb })

const userService = Object.freeze({
  addUser,
  editUser,
  removeUser,
  loginUser,
  logoutUser
})

export default userService
export { addUser, editUser, removeUser, loginUser, logoutUser }
