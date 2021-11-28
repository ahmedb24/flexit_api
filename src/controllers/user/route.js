import { Router } from "express"
import makeCallback from '../../express-callback'
import {
    deleteUser,
    postUser,
    patchUser,
    login,
    logout
  } from './index'

  
const router = new Router()

router.post(`/`, makeCallback(postUser))
router.delete(`/`, makeCallback(deleteUser))
router.patch(`/`, makeCallback(patchUser))
router.post(`/login`, makeCallback(login))
router.post(`/logout`, makeCallback(logout))

export default router