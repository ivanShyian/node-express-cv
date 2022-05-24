const fs = require('fs')
const path = require('path')

import sharp from 'sharp'

export const clearImage = (filePath: string) => {
  fs.unlink(path.join(__dirname, '../../../src', filePath), (err: any) => {
    console.log(err)
  })
}

export const convertImageWithSharp = async(file: Express.Multer.File): Promise<{
  filePath: string
  fileBase64: string
}> => {
  const replacedFileName = file.filename.replace(/\.[0-9a-z]+$/, '')
  const fileName = `${replacedFileName}.webp`
  const filePath = file.path
    .replace('src\\', '')
    .replace('\\', '/')
    .replace(file.filename, fileName)

  await sharp(path.join(__dirname, '../../../', file.path))
    .resize({fit: "inside", height: 500})
    .webp({quality: 100})
    .toFile(path.join(__dirname, '../../../', file.destination, fileName))

  const base64 = await sharp(path.join(__dirname, '../../../src', filePath))
    .resize({fit: "cover", height: 350, width: 350})
    .toBuffer()

  fs.unlinkSync(file.path)

  return {
    filePath,
    fileBase64: `data:${file.mimetype};base64,${base64.toString('base64')}`
  }
}