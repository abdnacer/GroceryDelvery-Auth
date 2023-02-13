import 'dotenv/config'
import express from 'express'
import userRouter from './routes/userRouter'
import morgan from 'morgan'
import CreateHttpError from 'http-errors'

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', userRouter)

app.use((req, res, next) => {
  next(CreateHttpError(404, "Endpoint not found"))
})

export default app