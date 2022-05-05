import {Router} from 'express'
import {postLogin} from '../controllers/login'
import {loginValidator} from '../validators'

const router = Router()

router.post('/login', loginValidator(), postLogin)
router.post('/logout')

export default router
