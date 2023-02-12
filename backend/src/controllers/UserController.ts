import { RequestHandler } from "express"
import User from '../models/User'

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.find().exec()
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

const getUser: RequestHandler = async (req, res, next) => {

  const idUser = req.params

  try {
    const user = await User.findOne({idUser})
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

const registerUser: RequestHandler = async (req, res, next) => {

  const { first_name, last_name, phone, email, password, confirm_password } = req.body

  if (first_name == '' || last_name == '' || phone == '' || email == '' || password == '' || confirm_password == '') res.send('Please fill all the fields')

  try {
    const user = await User.create({
      first_name,
      last_name,
      phone,
      email,
      password
    })
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

export {
  getUsers,
  getUser,
  registerUser
}