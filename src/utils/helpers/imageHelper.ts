const fs = require('fs')
const path = require('path')

export const clearImage = (filePath: string) => {
  fs.unlink(path.join(__dirname, '../../', filePath), (err: any) => {
    console.log(err)
  })
}
