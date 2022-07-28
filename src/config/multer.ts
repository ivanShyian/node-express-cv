import multer, {FileFilterCallback} from 'multer'
import {Request} from 'express'
import dotenv from 'dotenv'
dotenv.config()

const IMAGE_PATH = process.env.NODE_ENV === 'production' ? './dist/images' : './src/images/'
const PDF_PATH = process.env.NODE_ENV === 'production' ? './dist/pdf' : './src/pdf/'

export const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, file.mimetype === 'application/pdf' ? PDF_PATH : IMAGE_PATH),
  filename: (req, file, cb) => cb(null, `${new Date().getTime()}_${file.originalname}`)
})

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].includes(file.mimetype)) {
    return cb(null, true)
  }
  cb(null, false)
}
