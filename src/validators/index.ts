import {body, check} from 'express-validator'
import {LangStringObject} from '../ts-models'
import exp from 'constants'

const validPeriodRegEx = /(19|20)\d{2}-(19|20)\d{2}/

const textValidator = (field = 'text', minLength = 2, maxLength = 255) => {
  return body(field).isLength({
    min: minLength,
    max: maxLength
  }).withMessage(`Length of ${field} must be between ${minLength} and ${maxLength}`)
}

const checkLangString = (field = '') => {
  return body(field).custom(value => {
    const data: LangStringObject = typeof value === 'string' ? JSON.parse(value) : value
    if (!(data.hasOwnProperty('en') || data.hasOwnProperty('uk'))) throw new Error(`${data} is Invalid`)
    return true
  })
}

const checkStringArray = (field = '', min = 2, max = 255) => {
  return body(field).custom((value) => {
    const parsedStringArr: string[] = JSON.parse(value)
    parsedStringArr.forEach((str) => {
      if (str.length < min && str.length > max) throw new Error(`${str} length must be between ${min} and ${max}`)
    })
    return true
  })
}

const emailValidator = (field = '') => {
  return body(field).isEmail()
}

export const aboutValidation = () => {
  const min = 100
  return [
    body('text.en').isLength({min}).withMessage(`Text EN must be ${min} length min`),
    body('text.uk').isLength({min}).withMessage(`Text UK must be ${min} length min`),
    body('techs').custom(values => {
      values.forEach((val: { name: string, value: number, _id?: string }) => {
        if (val.value <= 0 || val.value > 100) throw new Error(`Value can't be ${val.value}`)
      })
      return true
    })
  ]
}

export const workValidation = () => {
  return [
    textValidator('title'),
    checkLangString('subtitle'),
    checkLangString('description'),
    checkStringArray('technologies', 3, 50),
    body('responsibilities').custom((values) => {
      const parsedLangArray: { en: string, uk: string }[] = JSON.parse(values)
      parsedLangArray.forEach((data) => {
        if (!(data.hasOwnProperty('en') || data.hasOwnProperty('uk'))) throw new Error(`${data} is Invalid`)
      })
      return true
    }),
    textValidator('position'),
    check('duration').custom((value: string) => validPeriodRegEx.test(value))
  ]
}

export const updateWorkValidation = () => {
  return [
    textValidator('title').optional(),
    checkLangString('subtitle').optional(),
    checkLangString('description').optional(),
    checkStringArray('technologies', 3, 50).optional(),
    body('responsibilities').optional().custom((values) => {
      const parsedLangArray: { en: string, uk: string }[] = JSON.parse(values)
      parsedLangArray.forEach((data) => {
        if (!(data.hasOwnProperty('en') || data.hasOwnProperty('uk'))) throw new Error(`${data} is Invalid`)
      })
      return true
    }),
    textValidator('position').optional(),
    check('duration').optional().custom((value: string) => validPeriodRegEx.test(value))
  ]
}

export const projectValidation = () => {
  return [
    textValidator('title'),
    checkLangString('subtitle'),
    checkLangString('description'),
    checkStringArray('technologies', 3, 50),
    check('mainImage').exists(),
    check('link').custom((link: string) => {
      const url = new URL(link)
      if (!url.protocol) throw new Error(`Link: ${link} invalid. Valid link without hash and ends without '/'`)
      return true
    })
  ]
}

export const configValidation = () => {
  return [
    textValidator('emailReceiver'),
    checkLangString('name'),
    body('links').custom(value => {
      const links = JSON.parse(value)
      for (let link in links) {
        const url = new URL(links[link])
        if (!url.protocol) throw new Error(`${link} = ${links[link]} invalid. Valid link without hash and ends without '/'`)
      }
      return true
    }),
    body('status').custom(value => {
      const status: LangStringObject[] = JSON.parse(value)
      status.forEach((data) => {
        if (!(data.hasOwnProperty('en') || data.hasOwnProperty('uk'))) throw new Error(`${data} is Invalid`)
      })
      return true
    })
  ]
}

export const educationTechValidation = () => {
  return [
    body('techs.*.name').exists().isString(),
    body('techs.*.courses').custom((values) => {
      for (let i = 0; i <= values.length - 1; i++) {
        if (!values[i].description.en && !values[i].description.uk) {
          throw new Error(`${JSON.stringify(values[i].description)} description is Invalid`)
        }
        if (values[i].learnPeriod !== undefined && !validPeriodRegEx.test(values[i].learnPeriod!)) {
          throw new Error(`${values[i].learnPeriod} learnPeriod is Invalid`)
        }
        if (values[i].totalTime !== undefined && values[i].totalTime! < 0) {
          throw new Error(`${values[i].totalTime} totalTime is Invalid`)
        }
      }
      return true
    })
  ]
}

export const educationSchoolValidation = () => {
  return [
    body('type').custom(value => ['edit', 'add'].includes(value)),
    body('data.term').custom(value => validPeriodRegEx.test(value)),
    checkLangString('data.degree'),
    checkLangString('data.description'),
    checkLangString('data.name')
  ]
}

export const loginValidation = () => {
  return [
    emailValidator('email'),
    textValidator('password', 6)
  ]
}

export const emailValidation = () => {
  return [
    textValidator('name', 2, 50),
    emailValidator('email'),
    textValidator('subject', 2, 100),
    textValidator('message', 4, 10000)
  ]
}
