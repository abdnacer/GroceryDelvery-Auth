import express from "express"
import { loginUser, registerUser } from "../controllers/authController"
import errorMiddleware from "../middleware/error.middlewre"

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)

router.use(errorMiddleware)

export default router