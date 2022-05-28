import {Router} from 'express'
import {postLogin} from '../controllers/login'
import {loginValidation} from '../validators'

const router = Router()

router.post('/login', loginValidation(), postLogin)

export default router
