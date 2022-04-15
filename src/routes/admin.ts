import {Router} from 'express'
import {
  deleteContact,
  postContact,
  putAbout,
  putContact,
  postWork,
  putWork,
  deleteWork,
  postProject,
  putProject,
  deleteProject
} from "../controllers/admin";
import isAuth from '../middlewares/is-auth'

const router = Router()

/** About **/
router.put('/about', putAbout)
/** Contacts **/
router.post('/contact', postContact)
router.put('/contact/:contactId', putContact)
router.delete('/contact/:contactId', deleteContact)
/** Work **/
router.post('/work', postWork)
router.put('/work/:workId', putWork)
router.delete('/work/:workId', deleteWork)
/** Projects **/
router.post('/project', postProject)
router.put('/project/projectId', putProject)
router.delete('/project/:projectId', deleteProject)

export default router
