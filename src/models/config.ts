import {model, Schema} from 'mongoose'

const simpleNestedSchema = new Schema({
  en: String,
  uk: String,
  _id: String
})

const configSchema = new Schema({
  name: {
    en: String,
    uk: String
  },
  avatar: {
    type: String,
    required: true
  },
  status: [simpleNestedSchema],
  links: {
    type: Map,
    of: String
  },
  emailReceiver: {
    type: String,
    required: true
  }
})

export default model('Config', configSchema)
