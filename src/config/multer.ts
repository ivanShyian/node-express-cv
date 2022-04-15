import multer, {FileFilterCallback} from 'multer'
import {Request} from 'express'

export const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images'),
  filename: (req, file, cb) => cb(null, `${new Date().getTime()}_${file.originalname}`)
})

export const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    return cb(null, true)
  }
  cb(null, false)
}
