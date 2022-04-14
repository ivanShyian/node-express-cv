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

const aboutSchema = new Schema({
  title: nestedSchema,
  text: nestedSchema,
  imageUrl: {
    type: String,
    required: false
  }
})

export default model('About', aboutSchema)
