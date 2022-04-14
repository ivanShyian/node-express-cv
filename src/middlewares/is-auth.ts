import jwt, {JwtPayload} from 'jsonwebtoken'
import {NextFunction, Response} from 'express'
import {CustomError, CustomRequest} from "../ts-models";

interface JwtResponse extends JwtPayload {
  userId: string
}

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const secret = process.env.BEARER_SECRET
    const token = req.get('Authorization')?.split(' ')[1]
    if (token && secret) {
      const decodedToken = jwt.verify(token, secret) as JwtResponse
      if (decodedToken) {
        req.userId = decodedToken.userId as string
        req.lang = req.headers['accept-language']?.split('-')[1] as string
        return next()
      }
    }
    const error: CustomError = new Error('Not authenticated')
    error.statusCode = 401
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    throw e
  }
}
