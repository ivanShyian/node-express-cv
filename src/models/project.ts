import {Schema, model} from "mongoose";

const nestedSchema = new Schema({
  en: String,
  uk: String
}, {_id: false})

const image = new Schema({
  src: {
    type: String,
    required: false
  },
  base64: String
}, {_id: false})


const projectSchema = new Schema({
  title: String,
  subtitle: nestedSchema,
  description: nestedSchema,
  technologies: [String],
  images: [image],
  mainImage: image,
  link: String
})

export default model('Project', projectSchema)
