import {Schema, model} from "mongoose";

const enUkSchema = new Schema({
  en: String,
  uk: String
}, {_id: false})

const schoolSchema = new Schema({
  name: enUkSchema,
  description: enUkSchema,
  degree: enUkSchema,
  term: String
})

const courseSchema = new Schema({
  name: String,
  description: enUkSchema,
  totalTime: Number,
  teacher: {
    type: String,
    required: false
  },
  learnPeriod: {
    type: String,
    required: false
  }
})

const techSchema = new Schema({
  name: String,
  courses: [courseSchema]
})

const educationSchema = new Schema({
  school: [schoolSchema],
  techs: [techSchema]
})

export default model('Education', educationSchema)
