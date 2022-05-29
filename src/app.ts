import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import mongoose from 'mongoose'

import helmet from 'helmet'
import compression from 'compression'

import authMiddleware from './middlewares/is-auth'
import errorMiddleware from './middlewares/error'
import adminRoutes from './routes/admin'
import cvRoutes from './routes/cv'
import loginRoutes from './routes/login'

import {fileStorage, fileFilter} from "./config/multer";

const app = express()
dotenv.config()

console.log(process.env.NODE_ENV)

app.use(cors({
	origin: ["http://localhost:3000", "http://192.168.0.101:3000"],
	credentials: true,
	methods: 'GET, POST, PUT, DELETE, OPTIONS',
	allowedHeaders: 'Authorization, Content-Type, Accept-Language'
}))

app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(multer({
	limits: { fieldSize: 25 * 1024 * 1024 },
	storage: fileStorage,
	fileFilter
}).any())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/admin', authMiddleware, adminRoutes)
app.use(cvRoutes)
app.use(loginRoutes)
app.use(errorMiddleware)

;(async() => {
	await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clusterfrankfurt.meiyt.mongodb.net/cvDatabase`)
	app.listen(process.env.PORT || 8080, () => {
		console.log('≧◠‿◠≦ SERVER INIT ≧◠‿◠≦')
	})
})()
