import {Schema, model} from "mongoose";

const stringSchemaNoId = new Schema({
  en: String,
  ua: String
}, {_id: false})

const stringSchemaWithId = new Schema({
  en: String,
  uk: String
})

const workSchema = new Schema({
  title: String,
  subtitle: stringSchemaNoId,
  description: stringSchemaNoId,
  responsibilities: [stringSchemaWithId],
  position: String,
  duration: String,
  technologies: [String],
  imageUrl: String
})

export default model('Work', workSchema)
