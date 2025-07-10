import genToken from "../config/token.js";
import Player from "../model/player.model.js"
import bcrypt from "bcryptjs"

export const signUp=async (req,res)=>{
    try {
         let{ firstName, lastName, gender, phoneNumber, email, password } = req.body;
         const profilePhoto = req.file ? req.file.path : ""; // assuming multer is used

         const existingPlayer = await Player.findOne({ email });
        if (existingPlayer) {
            return res.status(400).json({ message: "Email already registered" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

         const player = await Player.create({
            firstName,
            lastName,
            profilePhoto,
            gender,
            phoneNumber,
            email,
            password: hashedPassword
        });

        let token = await genToken(player._id);
        res.cookie("token", token,{
            httpOnly: true,
            secure:process.env.NODE_ENVIRONMENT= "production",
            sameSite : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(player)
    }
    catch (error){
            return res.status(500).json({message: `signup error ${error} `})
    }
}