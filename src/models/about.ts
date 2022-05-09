import {Schema, model} from "mongoose";

const nestedSchema = new Schema({
  en: String,
  uk: String
}, {_id: false})

const aboutSchema = new Schema({
  text: nestedSchema,
  techs: [{
    name: String,
    value: Number
  }]
})

export default model('About', aboutSchema)
