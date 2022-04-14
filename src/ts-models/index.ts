import {Request} from 'express'

export interface CustomError extends Error {
  statusCode?: number
  data?: any
}

export interface CustomRequest extends Request {
  userId?: string
  lang?: string
}
