const fs = require('fs')
const path = require('path')
import dotenv from 'dotenv'
import sharp from 'sharp'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'
const formatRegex = /\.[0-9a-z]+$/i

export const clearImage = (filePath: string) => {
  fs.unlink(path.join(__dirname, isProduction ? '../../../dist' : '../../../src', filePath), (err: any) => {
    console.log(err)
  })
}

export const convertImageWithSharp = async(file: Express.Multer.File): Promise<{
  filePath: string
  fileBase64: string
}> => {

  let filePath = file.path
    .replace('src\\', '')
    .replace('\\', '/')
    .replace(formatRegex, '.webp')

  const sharpFilePath = path.join(__dirname, isProduction ? '../../../' : '../../../src', filePath)

  await sharp(path.join(__dirname, '../../../', file.path))
    .resize({fit: "inside", height: 500})
    .webp({quality: 100})
    .toFile(sharpFilePath)

  const base64 = await sharp(sharpFilePath)
    .resize({fit: "cover", height: 350, width: 350})
    .toBuffer()

  if (isProduction) {
    filePath = filePath.replace(/(dist\\|dist\/)/, '')
  }

  fs.unlinkSync(file.path)

  return {
    filePath,
    fileBase64: `data:${file.mimetype};base64,${base64.toString('base64')}`
  }
}
