import {body} from 'express-validator'

const textValidator = (field = 'text', minLength = 2, maxLength = 255) => {
  return body(field)
    .isLength({min: minLength, max: maxLength})
    .withMessage(`Length of ${field} must be between ${minLength} and ${maxLength}`)
}

const arrayValidator = (field = 'array') => {
  return body(field).isArray()
}

const objectArrayValidator = (arrayName = 'array', key = 'key') => {
  return body(`${arrayName}.*.${key}`)
}

const emailValidator = (field = '') => {
  return body(field).isEmail()
}

export const aboutValidation = () => {
  return [
    textValidator('title'),
    textValidator('text')
  ]
}

export const contactValidation = () => {
  return [
    textValidator('name'),
    textValidator('value')
  ]
}

export const workValidation = () => {
  return [
    textValidator('title'),
    textValidator('subtitle'),
    textValidator('description'),
    // textValidator('responsibilities'),
    // textValidator('technologies')
  ]
}

export const projectValidation = () => {
  return [
    textValidator('title'),
    textValidator('subtitle'),
    textValidator('description'),
    // textValidator('technologies')
  ]
}

export const configValidation = () => {
  return [
    textValidator('emailReceiver'),
    arrayValidator('links'),
    arrayValidator('status')
    // objectArrayValidator('links', 'name'),
    // objectArrayValidator('links', 'value'),
  ]
}

export const loginValidator = () => {
  return [
    emailValidator('email'),
    textValidator('password')
  ]
}
