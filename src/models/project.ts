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

const nestedSchemaWithId = new Schema({
  en: {
    type: String,
    default: '[empty]'
  },
  ua: {
    type: String,
    default: '[empty]'
  }
})

const projectSchema = new Schema({
  title: nestedSchema,
  subtitle: nestedSchema,
  description: nestedSchema,
  technologies: [nestedSchemaWithId],
  imageUrl: {
    type: String,
    required: true
  }
})

export default model('Project', projectSchema)
