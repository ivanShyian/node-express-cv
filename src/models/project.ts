import {Schema, model} from "mongoose";

const nestedSchema = new Schema({
  en: String,
  ua: String
}, {_id: false})

const projectSchema = new Schema({
  title: String,
  subtitle: nestedSchema,
  description: nestedSchema,
  technologies: [String],
  images: [String],
  mainImage: String
})

export default model('Project', projectSchema)
