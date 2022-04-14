import {CustomRequest} from "../ts-models";
import {NextFunction, Response} from "express";

const INCLUDED_METHODS = ['POST', 'PUT']
const EXCLUDED_PROPERTIES = ['imageUrl']

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.url.includes('admin') && INCLUDED_METHODS.includes(req.method)) {
    for(let prop in req.body) {
      if (!EXCLUDED_PROPERTIES.includes(prop)) {
        req.body[prop] = {
          [req.lang!]: req.body[prop]
        }
      }
    }
  }
  next()
}
