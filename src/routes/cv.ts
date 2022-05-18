import {Router} from 'express'
import {
  getAbout,
  getEducation,
  getProjects,
  getConfig,
  getWorkList,
  getProjectById
} from '../controllers/cv'

const router = Router()

/** Config **/
router.get('/config', getConfig)
/** About **/
router.get('/about', getAbout)
/** Education **/
router.get('/education', getEducation)
/** Projects **/
router.get('/projects', getProjects)
router.get('/projects/:workId', getProjectById)
/** Work **/
router.get('/work', getWorkList)

export default router
