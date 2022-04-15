import {Types} from 'mongoose'

export default function(databaseArray: any[], userArray: any[], lang: string) {
  const result = [...databaseArray]

  userArray.forEach((userObj: any) => {
    const foundElementIndex = databaseArray.findIndex(el => el._id.toString() === userObj._id)
    if (foundElementIndex >= 0) {
      result[foundElementIndex] = {...result[foundElementIndex]._doc, [lang]: userObj.value}
    } else {
      result.push({ [lang]: userObj.value, _id: new Types.ObjectId() })
    }
  })

  return result
}
