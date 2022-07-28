import {Request} from 'express'

export interface CustomError extends Error {
  statusCode?: number
  data?: any
}

export interface CustomRequest extends Request {
  userId?: string
  lang?: string
}

export interface LangStringObject {
  en: string
  uk: string
}

interface IBasicMongoose<T> {
  _id: string
  save: () => Promise<T>
}

interface IImage {
  src: string
  base64: string
}

// Config
export interface IConfig extends IBasicMongoose<IConfig> {
  name: LangStringObject
  links: {
    [key: string]: string
  }
  status: [LangStringObject]
  avatar: IImage,
  emailReceiver: string
  fileToUpload?: File
}

// About
export interface IAbout extends IBasicMongoose<IAbout> {
  _id: string
  cvPath: string
  techs: [{
    name: string
    value: number
    color: string
  }]
  text: LangStringObject
}


// Education
export interface IEducation extends IBasicMongoose<IEducation> {
  school: School[]
  techs: Techs[]
  save: () => Promise<IEducation>
}

export interface School {
  name: LangStringObject
  description: LangStringObject
  degree: LangStringObject
  term: string
  _id?: string
}

export interface Techs {
  name: string
  courses: Course[]
  id?: string
  _id?: string
}

export interface Course {
  name: string
  description: LangStringObject
  learnPeriod?: string
  teacher?: string
  _id?: string
  totalTime?: number
}

// Work
interface Responsibilities extends LangStringObject{
  _id?: string
}

export interface IWork extends IBasicMongoose<IWork> {
  title: string
  subtitle: LangStringObject
  description: LangStringObject
  technologies: string[] | []
  responsibilities: Responsibilities[] | []
  imageUrl: IImage | Record<string, string>
  position: string
  duration: string,
  fileToUpload?: File
}

// Project

export interface IProject extends IBasicMongoose<IProject> {
  title: string
  subtitle: LangStringObject
  description: LangStringObject
  technologies: string[]
  images: IImage[]
  mainImage: IImage
  link: string
  isWork?: boolean
}
