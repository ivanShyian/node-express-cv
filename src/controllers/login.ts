import {NextFunction, Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin'
import {CustomError} from '../ts-models'

export const postLogin = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password} = req.body
    const admin = await Admin.findOne({email})
    if (admin) {
      const isEquals = await bcrypt.compare(password, admin.password)
      if (isEquals) {
        const token = jwt.sign({email: admin.email, adminId: admin._id.toString()},
          process.env.BEARER_SECRET!, {
          expiresIn: '1h'
        })
        return res.status(200).json({token, adminId: admin._id.toString()})
      }
    }
    const error: CustomError = new Error('Email or password is wrong')
    error.statusCode = 401
    throw error
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}
