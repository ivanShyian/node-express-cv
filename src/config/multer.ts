import multer, {FileFilterCallback} from 'multer'
import {Request} from 'express'
import dotenv from 'dotenv'
dotenv.config()

const IMAGE_PATH = process.env.NODE_ENV === 'production' ? './images/' : './src/images/'

export const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGE_PATH),
  filename: (req, file, cb) => cb(null, `${new Date().getTime()}_${file.originalname}`)
})

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    return cb(null, true)
  }
  cb(null, false)
}
