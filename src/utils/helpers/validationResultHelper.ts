import {validationResult} from 'express-validator'
import {CustomError} from '../../ts-models'
import {Request} from 'express'

export default function (req: Request): CustomError | null {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error: CustomError = new Error('Validation failed')
    error.statusCode = 422
    error.data = errors.array()
    return error
  }
  return null
}
