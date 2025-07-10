import express from "express"
import { playerLogin, playerlogout, playersignUp } from "../controller/playerauth.controller.js"
import {organiserLogin, organiserSignup , organiserLogout} from "../controller/organiserAuth.controller.js"


const authRouter  = express.Router()

authRouter.post("/player_signup",playersignUp)
authRouter.post("/player_login",playerLogin)
authRouter.post("/player_logout",playerlogout)
authRouter.post("/organiser_login" , organiserLogin)
authRouter.post("/organiser_signup",organiserSignup)
authRouter.post("/organiser_logout",organiserLogout)

export default authRouter ;
