import {Schema, model} from "mongoose";

const nestedSchema = new Schema({
  en: {
    type: String,
    default: '[empty]'
  },
  ua: {
    type: String,
    default: '[empty]'
  }
}, {_id: false})

const newSchemaWithId = new Schema({
  en: {
    type: String,
    default: '[empty]'
  },
  ua: {
    type: String,
    default: '[empty]'
  }
})

const workSchema = new Schema({
  title: nestedSchema,
  subtitle: nestedSchema,
  description: nestedSchema,
  responsibilities: [newSchemaWithId],
  technologies: [newSchemaWithId]
})

export default model('Work', workSchema)
