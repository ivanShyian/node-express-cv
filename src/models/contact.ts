import {Schema, model} from "mongoose";

const nestedSchema = new Schema({
  en: {
    type: String,
    default: '[empty]'
  },
  uk: {
    type: String,
    default: '[empty]'
  }
}, {_id: false})

const contactsSchema = new Schema({
  name: nestedSchema,
  value: nestedSchema
})

export default model('Contact', contactsSchema)
