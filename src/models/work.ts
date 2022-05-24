import {Schema, model} from "mongoose";

const stringSchemaNoId = new Schema({
  en: String,
  uk: String
}, {_id: false})

const stringSchemaWithId = new Schema({
  en: String,
  uk: String
})

const image = new Schema({
  src: {
    type: String,
    required: false
  },
  base64: String
}, {_id: false})

const workSchema = new Schema({
  title: String,
  subtitle: stringSchemaNoId,
  description: stringSchemaNoId,
  responsibilities: [stringSchemaWithId],
  position: String,
  duration: String,
  technologies: [String],
  imageUrl: image
})

export default model('Work', workSchema)
