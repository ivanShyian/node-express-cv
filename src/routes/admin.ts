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
  deleteProject,
  putConfig,
  // postConfig
} from '../controllers/admin'

import {
  aboutValidation,
  contactValidation,
  projectValidation,
  workValidation,
  configValidation
} from '../validators'

const router = Router()

/** Config **/
// router.post('/config', configValidation(), postConfig)
router.put('/config', configValidation(), putConfig)
/** About **/
router.put('/about', aboutValidation(), putAbout)
/** Contacts **/
router.post('/contact', contactValidation(), postContact)
router.put('/contact/:contactId', contactValidation(), putContact)
router.delete('/contact/:contactId', deleteContact)
/** Work **/
router.post('/work', workValidation(), postWork)
router.put('/work/:workId', workValidation(), putWork)
router.delete('/work/:workId', deleteWork)
/** Projects **/
router.post('/project', projectValidation(), postProject)
router.put('/project/projectId', projectValidation(), putProject)
router.delete('/project/:projectId', deleteProject)

export default router
