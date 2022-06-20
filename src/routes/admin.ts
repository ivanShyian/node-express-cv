import {Router} from 'express'
import {
  putAbout,
  postWork,
  putWork,
  deleteWork,
  postProject,
  putProject,
  deleteProject,
  putConfig,
  postEducationTech,
  putEducationTech,
  postEducationSchool,
  deleteEducation,
  deleteTech,
  deleteCourses
} from '../controllers/admin'

import {
  aboutValidation,
  projectValidation,
  workValidation,
  configValidation,
  educationTechValidation,
  educationSchoolValidation,
  updateWorkValidation
} from '../validators'

const router = Router()

/** Config **/
router.put('/config', configValidation(), putConfig)
/** About **/
router.put('/about', aboutValidation(), putAbout)
/** Education **/
router.post('/education/techs', educationTechValidation(), postEducationTech)
router.put('/education/techs', educationTechValidation(), putEducationTech)
router.post('/education/school', educationSchoolValidation(), postEducationSchool)
router.delete('/education/school/:id', deleteEducation)
router.delete('/education/techs/:id', deleteTech)
router.delete('/education/courses/:id', deleteCourses)
/** Work **/
router.post('/work', workValidation(), postWork)
router.put('/work', updateWorkValidation(), putWork)
router.delete('/work/:workId', deleteWork)
/** Projects **/
router.post('/project', projectValidation(), postProject)
router.put('/project', projectValidation(), putProject)
router.delete('/project/:projectId', deleteProject)

export default router
