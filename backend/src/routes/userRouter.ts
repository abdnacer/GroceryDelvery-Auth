import express from "express"
import { getUser, getUsers, registerUser } from "../controllers/UserController"

const router = express.Router()

router.post('/ ', getUsers)
router.post('/login', getUsers)
router.post('/signup', registerUser)
router.get('/:idUser', getUser)

export default router