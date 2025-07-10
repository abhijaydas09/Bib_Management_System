import genToken from "../config/token.js";
import Organiser from "../model/OrganiserSchema.js";
import bcrypt from "bcryptjs" ;
import express from "express";


const organiserSignup = async (req , res , next) =>{
    try {
        let {firstName  , lastName , gender , phoneNumber , email , password , organisationName} = req.body;
        const profilePhoto = req.file ? req.file.path : "";

        const existingOrganiser = await Organiser.findOne({ email }) ;
        if(existingOrganiser){
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const  organiser = await Organiser.create({
            firstName,
            lastName ,
            profilePhoto,
            gender ,
            phoneNumber,
            email ,
            password : hashedPassword ,
            organisationName
        }) ;
        let token = await genToken(organiser._id);
        res.cookie("token", token, {
            httpOnly: true ,
            secure:process.env.NODE_ENV === 'production',
            sameSite : 'Strict' ,
            maxAge  : 7 * 24 * 60 * 60 * 1000 // token created for = 7 days

        });
        return res.status(200).json(organiser);

    }catch (error){
       return res.status(500).json({message: `signup error ${error} `})

    }
}


const organiserLogin = async (req , res , next) =>{
    try{
        let{email , password } = req.body ;
        const organiser = await Organiser.findOne({ email });
        // Check if the organiser exists

        if(!organiser){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Check if the password matches

        let isPasswordValid = await bcrypt.compare(password , organiser.password);

        // If password is not valid, return an error
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a token for the organiser
        let token = await genToken(organiser._id) ;
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // token created for = 7 days
        })
        return res.status(200).json(organiser);
    }catch (error){
       return res.status(500).json({message: `signup error ${error} `})
    }
}
const organiserLogout = async (req, res) => {
    try {
        const logout = res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
             return res.status(500).json({message: `logout eeror ${error} `})
    }
}
export { organiserSignup, organiserLogin , organiserLogout };

