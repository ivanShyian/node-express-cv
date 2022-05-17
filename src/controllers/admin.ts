import {NextFunction, Response} from 'express'
import {CustomRequest, CustomError} from '../ts-models'

import {clearImage} from '../utils/helpers/imageHelper'
import mergeArrays from '../utils/helpers/mergeArraysHelper'
import bodyErrors from "../utils/helpers/validationResultHelper";

import About from '../models/about'
import Contact from '../models/contact'
import Work from '../models/work'
import Project from '../models/project'
import Config from '../models/config'
import Education from '../models/education'
import exp from 'constants'

/** Config **/
export const putConfig = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {links, status, emailReceiver, name} = req.body
    let imageUrl = req.body.image

    let error = bodyErrors(req)
    if (error) throw error

    if (req.file) {
      imageUrl = req.file.path
        .replace('src\\', '')
        .replace('\\', '/')
    }

    if (!imageUrl) {
      error = new Error('No avatar provided')
      error.statusCode = 422
      throw error
    }

    const config = await Config.findOne()

    if (links) config.links = JSON.parse(links)
    if (status) config.status = JSON.parse(status)
    if (name) config.name = JSON.parse(name)
    if (emailReceiver) config.emailReceiver = emailReceiver
    if (imageUrl) config.avatar = imageUrl

    const savedConfig = await config.save()

    res.status(200).json({result: savedConfig})
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

/** About **/
export const putAbout = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {text, techs} = req.body

    let error = bodyErrors(req)
    if (error) throw error

    const about = await About.findOne()

    if (text) about.text = text
    if (techs) about.techs = techs

    const saved = await about.save()
    res.status(201).json({result: saved})
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const postEducationSchool = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {data, type} = req.body

    const education = await Education.findOne()
    if (education) {
      if (type === 'add') {
        education.school = [
          ...education.school,
          {...data}
        ]
      } else if (type === 'edit') {
        let schoolCopy = [...education.school]
        const foundIndex = education.school.findIndex((s: any) => s._id.toString() === data._id.toString())
        schoolCopy[foundIndex] = {...data}
        education.school = schoolCopy
      }
      const savedEducation = await education.save()
      res.status(200).json({result: savedEducation})
    }
    const error: CustomError = new Error('Education wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const deleteEducation = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const education = await Education.findOne()
    if (education) {
      education.school = [...education.school.filter((el: any) => el._id.toString() !== id)]
      const savedEducation = await education.save()
      res.status(200).json({result: savedEducation})
    }
    const error: CustomError = new Error('Education wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const deleteTech = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const education = await Education.findOne()
    if (education) {
      const arrayIdToRemove = id.split(';')
      education.techs = [...education.techs.filter((el: any) => !arrayIdToRemove.includes(el._id.toString()))]
      const savedEducation = await education.save()
      res.status(200).json({result: savedEducation})
    }
    const error: CustomError = new Error('Education wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}


export const postEducationTech = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {techs} = req.body
    const education = await Education.findOne()
    if (education) {
      education.techs = [...education.techs, ...techs]
      const savedEducation = await education.save()
      res.status(200).json({result: savedEducation})
    }
    const error: CustomError = new Error('Education wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const putEducationTech = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {techs} = req.body
    const education = await Education.findOne()
    if (education) {
      education.techs = education.techs.map((tech: any) => {
        const foundIndex = techs.findIndex((userTech: any) => userTech._id === tech._id.toString())
        if (foundIndex !== -1) {
          return {
            ...tech._doc,
            courses: [
              ...tech._doc.courses,
              ...techs[foundIndex].courses
            ]
          }
        }
        return tech
      })
      const savedEducation = await education.save()
      res.status(200).json({result: savedEducation})
    }
    const error: CustomError = new Error('Education wasn\'t found')
    error.statusCode = 404
    throw error
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

export const deleteCourses = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const education = await Education.findOne()
    if (education) {
      let deleteMap: {[key: string]: string[]} = {}
      id.split('&').forEach(el => {
        const [techId, courseIds] = el.split('=')
        deleteMap[techId] = courseIds.split(';')
      })
      education.techs = education.techs.map((tech: any) => {
        if (Object.keys(deleteMap).includes(tech._id.toString())) {
          const coursesToRemove = deleteMap[tech._id.toString()]
          const coursesCopy = tech.courses.filter((fTech: any) => !coursesToRemove.includes(fTech._id.toString()))
          return {
            ...tech,
            courses: coursesCopy
          }
        }
        return tech
      })
      const savedEducation = await education.save()
      res.status(200).json({result: savedEducation})
    }
    const error: CustomError = new Error('Education wasn\'t found')
    error.statusCode = 404
  } catch (e: any) {
    if (!e.statusCode) e.statusCode = 500
    next(e)
  }
}

/** Work **/
export const postWork = async(req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {title, subtitle, description, responsibilities, technologies, position, duration} = req.body

    let error = bodyErrors(req)
    if (error) throw error

    let imageUrl = req.body.imageUrl
    if (req.file) {
      console.log(req.file)
      imageUrl = req.file.path
        .replace('src\\', '')
        .replace('\\', '/')
    }
    if (!imageUrl) {
      error = new Error('No avatar provided')
      error.statusCode = 422
      throw error
    }

    const work = new Work({
      title,
      subtitle: JSON.parse(subtitle),
      description: JSON.parse(description),
      technologies: JSON.parse(technologies),
      responsibilities: JSON.parse(responsibilities),
      position,
      duration,
      imageUrl
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
    const {title, subtitle, description, responsibilities, technologies, position, duration, _id} = req.body
    let imageUrl = req.body.image

    let error = bodyErrors(req)
    if (error) throw error

    const work = await Work.findOne({_id})

    if (!imageUrl) {
      imageUrl = work.imageUrl
    }
    if (req.file) {
      imageUrl = req.file.path
        .replace('src\\', '')
        .replace('\\', '/')
    }

    if (!imageUrl) {
      error = new Error('No avatar provided')
      error.statusCode = 422
      throw error
    }

    if (work) {
      if (title) work.title = title
      if (subtitle) work.subtitle = JSON.parse(subtitle)
      if (description) work.description = JSON.parse(description)
      if (responsibilities) work.responsibilities = JSON.parse(responsibilities)
      if (technologies) work.technologies = JSON.parse(technologies)
      if (position) work.position = position
      if (duration) work.duration = duration

      const savedWork = await work.save()
      return res.status(201).json({result: savedWork})
    }
    error = new Error('Work wasn\'t found')
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
    const {title, subtitle, description, technologies} = req.body

    const error = bodyErrors(req)
    if (error) throw error

    if (!req.file) {
      const error: CustomError = new Error('No image provided')
      error.statusCode = 422
      throw error
    }

    const project = new Project({
      title,
      subtitle,
      description,
      imageUrl: req.file.path.replace('\\' ,'/'),
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
    const projectId = req.params.projectId
    const {title, subtitle, description, technologies} = req.body
    let imageUrl = req.body.image

    let error = bodyErrors(req)
    if (error) throw error

    if (req.file) imageUrl = req.file.path.replace('\\' ,'/')
    if (!imageUrl) {
      error = new Error('No file picked')
      error.statusCode = 422
      throw error
    }

    const project = await Project.findOne({_id: projectId})
    if (imageUrl !== project.imageUrl) clearImage(project.imageUrl)

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
    error = new Error('Project wasn\'t found')
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
