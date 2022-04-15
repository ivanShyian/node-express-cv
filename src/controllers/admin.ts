import {NextFunction, Response} from 'express'
import {CustomRequest, CustomError} from '../ts-models'
import mergeArrays from '../utils/mergeArrays'

import About from '../models/about'
import Contact from '../models/contact'
import Work from '../models/work'
import Project from '../models/project'
import project from "../models/project";

/** About **/
export const putAbout = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {title, text, imageUrl} = req.body
    const about = await About.findOne()

    if (title) about.title = title
    if (text) about.text = text
    if (imageUrl) about.imageUrl = imageUrl

    const saved = await about.save()
    res.status(201).json({result: saved})
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

/** Contacts **/
export const postContact = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {name, value} = req.body
    const contact = new Contact({name, value})
    const savedContact = await contact.save()
    res.status(201).json({result: savedContact})
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const putContact = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {name, value} = req.body
    const contactId = req.params.contactId
    const contact = await Contact.findOne({_id: contactId})
    if (contact) {
      if (name) contact.name = name
      if (value) contact.value = value

      const savedContact = await contact.save()
      return res.status(201).json({result: savedContact})
    }
    const error: CustomError = new Error('Contact wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const deleteContact = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const contactId = req.params.contactId
    const contact = await Contact.findOneAndRemove({_id: contactId})
    if (contact) {
      return res.status(204).json({result: 'Deleted successfully'})
    }
    const error: CustomError = new Error('Contact wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

/** Work **/
export const postWork = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {title, subtitle, description, responsibilities, technologies} = req.body
    const work = new Work({
      title,
      subtitle,
      description,
      technologies: mergeArrays([], technologies, req.lang!),
      responsibilities: mergeArrays([], responsibilities, req.lang!)
    })

    const savedWork = await work.save()
    res.status(201).json({result: savedWork})
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}
export const putWork = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {title, subtitle, description, responsibilities, technologies} = req.body
    const workId = req.params.workId
    const work = await Work.findOne({_id: workId})
    if (work) {
      if (title) work.title = title
      if (subtitle) work.subtitle = subtitle
      if (description) work.description = description
      if (responsibilities) {
        work.responsibilities = mergeArrays(work.responsibilities, responsibilities, req.lang!)
      }
      if (technologies) {
        work.technologies = mergeArrays(work.technologies, technologies, req.lang!)
      }

      const savedWork = await work.save()
      return res.status(201).json({result: savedWork})
    }
    const error: CustomError = new Error('Work wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}
export const deleteWork = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const workId = req.params.workId
    const work = await Work.findOneAndRemove({_id: workId})
    if (work) {
      return res.status(204).json({result: 'Deleted successfully'})
    }
    const error: CustomError = new Error('Work wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

/** Projects **/
export const postProject = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {title, subtitle, description, technologies, imageUrl} = req.body
    const project = new Project({
      title,
      subtitle,
      description,
      imageUrl,
      technologies: mergeArrays([], technologies, req.lang!)
    })
    const savedProject = await project.save()
    res.status(201).json({result: savedProject})
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}
export const putProject = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {title, subtitle, description, technologies, imageUrl} = req.body
    const projectId = req.params.projectId
    const project = await Project.findOne({_id: projectId})
    if (project) {
      if (title) project.title = title
      if (subtitle) project.subtitle = subtitle
      if (description) project.description = description
      if (imageUrl) project.imageUrl = imageUrl
      if (technologies) {
        project.technologies = mergeArrays(project.technologies, technologies, req.lang!)
      }

      const savedProject = await project.save()
      return res.status(201).json({result: savedProject})
    }
    const error: CustomError = new Error('Project wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}
export const deleteProject = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId
    const project = await Project.findOneAndRemove({_id: projectId})
    if (project) {
      return res.status(204).json({result: 'Deleted successfully'})
    }
    const error: CustomError = new Error('Work wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}
