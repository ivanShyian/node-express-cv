import {model, Schema} from 'mongoose'

const simpleNestedSchema = new Schema({
  en: String,
  uk: String,
  _id: String
})

const image = new Schema({
  src: {
    type: String,
    required: false
  },
  base64: String
}, {_id: false})

const configSchema = new Schema({
  name: {
    en: String,
    uk: String
  },
  avatar: image,
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
