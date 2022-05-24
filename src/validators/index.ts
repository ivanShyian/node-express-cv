import {body, check} from 'express-validator'
import {LangStringObject} from '../ts-models'

const textValidator = (field = 'text', minLength = 2, maxLength = 255) => {
  return body(field)
    .isLength({min: minLength, max: maxLength})
    .withMessage(`Length of ${field} must be between ${minLength} and ${maxLength}`)
}


const checkLangString = (field = '') => {
  return body(field)
    .custom(value => {
      const data: LangStringObject = JSON.parse(value)
      if (!data.en || !data.uk) throw new Error(`${data} is Invalid`)
      return true
    })
}

const emailValidator = (field = '') => {
  return body(field).isEmail()
}

export const aboutValidation = () => {
  const min = 100
  return [
    body('text.en')
      .isLength({min})
      .withMessage(`Text EN must be ${min} length min`),
    body('text.uk')
      .isLength({min})
      .withMessage(`Text UK must be ${min} length min`),
    body('techs')
      .custom(values => {
        values.forEach((val: {name: string, value: number, _id?: string}) => {
          if (val.value <= 0 || val.value > 100) throw new Error(`Value can't be ${val.value}`)
        })
        return true
      })
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
    checkLangString('name'),
    body('links')
      .custom(value => {
        const links = JSON.parse(value)
        for (let link in links) {
          const url = new URL(links[link])
          if (!url.hash && url.pathname.substring(url.pathname.length - 1) === '/') {
            throw new Error(`${link} = ${links[link]} invalid. Valid link without hash and ends without '/'`)
          }
        }
        return true
      }),
    body('status')
      .custom(value => {
        const status: LangStringObject[] = JSON.parse(value)
        status.forEach((data) => {
          if (!data.en || !data.uk) throw new Error(`${data} is Invalid`)
        })
        return true
      })
  ]
}

export const loginValidator = () => {
  return [
    emailValidator('email'),
    textValidator('password', 6)
  ]
}
