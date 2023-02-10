import 'dotenv/config'
import express from 'express'
import UserModel from './models/User'

const app = express()

app.get('/', async (req, res) => {
  const user = await UserModel.find().exec()
  res.status(200).json(user)
})

export default app