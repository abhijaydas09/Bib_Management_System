import express from "express"
import { playerLogin, playerlogout, playersignUp } from "../controller/playerauth.controller.js"
import {organiserLogin, organiserSignup , organiserLogout} from "../controller/organiserAuth.controller.js"
import {staffLogin, staffSignup , staffLogout} from "../controller/staffAuth.controller.js"
import { getStaffByEvent } from "../controller/staffAuth.controller.js";


const authRouter  = express.Router()
console.log("✅ auth.route.js loaded and imported");

authRouter.post("/player_signup",playersignUp)
authRouter.post("/player_login",playerLogin)
authRouter.post("/player_logout",playerlogout)
authRouter.post("/organiser_login" , organiserLogin)
authRouter.post("/organiser_signup",organiserSignup)
authRouter.post("/organiser_logout",organiserLogout)
authRouter.post("/staff_login" , staffLogin)
authRouter.post("/staff_signup",staffSignup)
authRouter.post("/staff_logout",staffLogout)
authRouter.get("/staff_by_event/:eventId", getStaffByEvent);

export default authRouter ;
