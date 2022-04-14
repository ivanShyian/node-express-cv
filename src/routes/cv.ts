import {Router} from 'express'
import {
  getAbout,
  getContacts,
  getProjects,
  getWork
} from '../controllers/cv'

const router = Router()

/** About **/
router.get('/about', getAbout)
/** Contacts **/
router.get('/contacts', getContacts)
/** Projects **/
router.get('/projects', getProjects)
/** Work **/
router.get('/work', getWork)

export default router
