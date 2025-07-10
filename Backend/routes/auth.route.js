import express from "express"
import { signUp } from "../controller/auth.controller.js"

const authRouter  = express.Router()

authRouter.post("/player_signup",signUp)

export default authRouter 