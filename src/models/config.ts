import {model, Schema} from 'mongoose'

const linkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

const nestedSchemaWithId = new Schema({
  en: linkSchema,
  uk: linkSchema,
  _id: String
})

const simpleNestedSchema = new Schema({
  en: String,
  uk: String,
  _id: String
})

const configSchema = new Schema({
  avatar: {
    type: String,
    required: true
  },
  status: [simpleNestedSchema],
  links: [nestedSchemaWithId],
  emailReceiver: {
    type: String,
    required: true
  }
})

export default model('Config', configSchema)
