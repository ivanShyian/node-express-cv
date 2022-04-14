import {NextFunction, Request, Response} from 'express'
import {CustomError} from "../ts-models";

export default ((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const {message, data, statusCode = 500} = err
  res.status(statusCode).json({message, data})
})
