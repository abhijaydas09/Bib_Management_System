import genToken from "../config/token.js";
import organiser from "../model/OrganiserSchema.js";
import bcrypt from "bcryptjs" ;
import express from "express";


const organiserSignup = async (req , res , next) =>{
    try {
        let {firstName  , lastName , gender , phoneNumber , email , password , organisationName} = req.body;
        const profilePhoto = req.file ? req.file.path : "";

        const existingOrganiser = await organiser.findOne({ email }) ;
        if(existingOrganiser){
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const  organiser = await organiser.create({
            firstName,
            lastName ,
            profilePhoto,
            gender ,
            phoneNumber,
            email ,
            password : hashedPassword ,
            organisationName
        }) ;
        let token = await genToken(organiser);
        res.cookie("token", token, {
            httpOnly: true ,
            secure:process.env.NODE_ENV === 'production',
            sameSite : 'Strict' ,
            maxAge  : 7 * 24 * 60 * 60 * 1000 // token created for = 7 days

        });
        return res.status(200).json(organiser);

    }catch (err){
        return res.status(500).json({"message": "Internal server error", "error": err.message} && '' + ' ${err} ');

    }
}


const organiserLogin = async (req , res , next) =>{
    try{
        let{email , password } = req.body ;
        const existingOrganiser = await organiser.findOne({ email });
        // Check if the organiser exists

        if(!existingOrganiser){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Check if the password matches

        let isPasswordValid = await bcrypt.compare(password , existingOrganiser.password);

        // If password is not valid, return an error
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a token for the organiser
        let token = await genToken(existingOrganiser) ;
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // token created for = 7 days
        })
        return res.status(200).json(existingOrganiser);
    }catch (error){
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
const organiserLogout = async (req, res) => {
    try {
        const logout = res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
export { organiserSignup, organiserLogin , organiserLogout };

