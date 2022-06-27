import dotenv from 'dotenv'
dotenv.config()

import {Request, NextFunction, Response} from 'express'
import {CustomError} from "../ts-models";
import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'
import About from '../models/about'
import Work from '../models/work'
import Project from '../models/project'
import Config from '../models/config'
import Education from '../models/education'
import bodyErrors from '../utils/helpers/validationResultHelper'

const transport = nodemailer.createTransport(nodemailerSendgrid({
  apiKey: process.env.NODE_EMAIL_TRANSPORT_API_KEY!
}))

export const getConfig = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const config = await Config.findOne()
    if (config) {
      return res.status(200).json({config})
    }
    const error: CustomError = new Error('About is not provided yet')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const getAbout = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const about = await About.findOne()
    if (about) {
      return res.status(200).json({about})
    }
    const error: CustomError = new Error('About is not provided yet')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const getEducation = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const education = await Education.findOne()
    if (education) {
      return res.status(200).json({education})
    }
    const error: CustomError = new Error('About is not provided yet')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const getWorkList = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const work = await Work.find()
    if (work) {
      return res.status(200).json({work})
    }
    const error: CustomError = new Error('Work is not provided yet')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}


export const getProjects = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find({}, '-description -technologies -images')
    if (projects) {
      return res.status(200).json({projects})
    }
    const error: CustomError = new Error('Projects is not provided yet')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const getProjectById = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.workId
    const project = await Project.findOne({_id})
    if (project) {
      return res.status(200).json({project})
    }
    const error: CustomError = new Error('Work is not provided yet')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const sendEmail = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, name, subject, message} = req.body

    let error = bodyErrors(req)
    if (error) throw error

    await transport.sendMail({
      to: process.env.NODE_EMAIL,
      from: process.env.NODE_EMAIL_TRANSPORTER,
      subject,
      html: `
        <div class="email-message">
          <h2><b>Subject:</b> ${subject}</h2>
          <p><b>From:</b> ${name} - (${email})</p>
          <p><b>Message:</b> ${message}</p>
        </div>
      `
    })
    res.status(200).json({result: 'Success'})
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}
