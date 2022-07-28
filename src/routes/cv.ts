import {Router} from 'express'
import {
  getAbout,
  getEducation,
  getProjects,
  getConfig,
  getWorkList,
  getProjectById,
  sendEmail, downloadCV
} from '../controllers/cv'
import {emailValidation} from '../validators'

const router = Router()

/** Config **/
router.get('/config', getConfig)
/** About **/
router.get('/about', getAbout)
router.get('/cv/download/', downloadCV)
/** Education **/
router.get('/education', getEducation)
/** Projects **/
router.get('/projects', getProjects)
router.get('/projects/:workId', getProjectById)
/** Work **/
router.get('/work', getWorkList)
/** Email **/
router.post('/email', emailValidation(), sendEmail)

export default router
