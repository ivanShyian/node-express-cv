import {Router} from 'express'
import {
  getAbout,
  getEducation,
  getContacts,
  getProjects,
  getConfig,
  getWork
} from '../controllers/cv'

const router = Router()

/** Config **/
router.get('/config', getConfig)
/** About **/
router.get('/about', getAbout)
/** Education **/
router.get('/education', getEducation)
/** Contacts **/
router.get('/contacts', getContacts)
/** Projects **/
router.get('/projects', getProjects)
/** Work **/
router.get('/work', getWork)

export default router
