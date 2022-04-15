import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
// import multer from 'multer'
import bodyMiddleware from './middlewares/transform-body'
import errorMiddleware from './middlewares/error'
import adminRoutes from './routes/admin'
import cvRoutes from './routes/cv'
import {CustomRequest} from "./ts-models";

const app = express()
dotenv.config()

app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true,
	methods: 'GET, POST, PUT, DELETE, OPTIONS',
	allowedHeaders: 'Authorization, Content-Type, Accept-Language'
}))
app.use(bodyParser.json())

app.use((req: CustomRequest, res, next) => {
	req.lang = req.headers['accept-language']?.split('-')[1] as string
	next()
})

app.use(bodyMiddleware)
app.use('/admin', adminRoutes)
app.use(cvRoutes)
app.use(errorMiddleware)

;(async() => {
	await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clusterfrankfurt.meiyt.mongodb.net/cvDatabase`)
	console.log('<== Database connected ==>')
	app.listen(process.env.PORT || 8080)
})()
