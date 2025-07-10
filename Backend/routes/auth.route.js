import express from "express"
import { playerLogin, playerlogout, playersignUp } from "../controller/playerauth.controller.js"

const authRouter  = express.Router()

authRouter.post("/player_signup",playersignUp)
authRouter.post("/player_login",playerLogin)
authRouter.post("/player_logout",playerlogout)

export default authRouter 