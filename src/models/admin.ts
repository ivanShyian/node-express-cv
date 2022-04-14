import {Schema, model} from "mongoose";

const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: Schema.Types.ObjectId,
    ref: 'About'
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  work: [{
    type: Schema.Types.ObjectId,
    ref: 'Work'
  }],
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }],
  resetToken: String,
  resetTokenExpiration: Date,
})

export default model('Admin', adminSchema)
