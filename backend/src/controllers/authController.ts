import { NextFunction, Request, Response } from "express"
import User from '../models/User'
import UserBody from "../interface/UserInterface"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import localStorage from "local-storage"
import env from '../utils/validateEnv'
import HttpException from "../exceptions/HttpException"

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const userDataLogin = req.body as UserBody
  const { email, password } = userDataLogin

  if (!email || !password) return next(new HttpException(400, 'Please fill all the fields'))

  const user: any = await User.findOne({ email })
  if (!user) return next(new HttpException(400, 'User not found'))
  const correctPassword = await bcrypt.compare(password, user.password)
  if (user && correctPassword) {
    const token = generateToken(user.id)
    localStorage('token', token)
    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      token: token
    })
  }
}

// <unknown, unknown, CreateUserBody, unknown>
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const userDataRegister = req.body as UserBody
  const { first_name, last_name, phone, email, password, confirm_password } = userDataRegister

  if (first_name == '' || last_name == '' || phone == '' || email == '' || password == '' || confirm_password == '') return next(new HttpException(400, 'Please Fill All The Fields'))

  const userExists = await User.findOne({ email })
  const phoneExists = await User.findOne({ phone })

  if (userExists && phoneExists) return next(new HttpException(400, 'User or Phone already Exits'))

  const salt = await bcrypt.genSalt(10)
  const pass_Hash = await bcrypt.hash(password, salt)

  const user = await User.create({
    first_name,
    last_name,
    phone,
    email,
    password: pass_Hash,
    verification: false
  })
  if (user) res.status(200).json({ user })
  if (!user) return next(new HttpException(400, 'Invalid User Data'))
}

const generateToken = (id: string) => {
  const token = jwt.sign({ id }, env.NODE_ENV, {
    expiresIn: '30d'
  })
  return token
}

export {
  loginUser,
  registerUser
}