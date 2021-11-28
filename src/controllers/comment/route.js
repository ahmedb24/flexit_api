import { Router } from "express"
import makeCallback from '../../express-callback'
import {
    deleteComment,
    getComments,
    postComment,
    patchComment
  } from './index'

  
const router = new Router()

router.post(`/`, makeCallback(postComment))
router.delete(`/:id`, makeCallback(deleteComment))
router.delete(`/`, makeCallback(deleteComment))
router.patch(`/:id`, makeCallback(patchComment))
router.patch(`/`, makeCallback(patchComment))
router.get(`/`, makeCallback(getComments))

export default router