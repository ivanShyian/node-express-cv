import {body} from 'express-validator'

const textValidator = (field = 'text', minLength = 2, maxLength = 255) => {
  return body(field)
    .isLength({min: minLength, max: maxLength})
    .withMessage(`Length of ${field} must be between ${minLength} and ${maxLength}`)
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
