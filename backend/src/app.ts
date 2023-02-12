import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import userRouter from './routes/userRouter'
import morgan from 'morgan'

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', userRouter)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  let errorMessage = "An unknow error occurred"
  if (err instanceof Error) errorMessage = err.message
  res.status(500).json({ error: errorMessage })
})

export default app