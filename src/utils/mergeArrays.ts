import {Types} from 'mongoose'

export default function(databaseArray: any[], userArray: any[], lang: string) {
  const result = []

  loop1:
  for(let i = 0; i < userArray.length; i++) {
    const userObj = userArray[i]
    for(let j = 0; j < databaseArray.length; j++) {
      const dbObj = databaseArray[j]
      if (dbObj._id.toString() === userObj._id) {
        result.push({ ...dbObj._doc, [lang]: userObj.value })
        continue loop1
      } else if (!userObj._id) {
        result.push({ [lang]: userObj.value, _id: new Types.ObjectId() })
        continue loop1
      }
    }
  }
  return result
}
