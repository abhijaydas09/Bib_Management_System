import genToken from "../config/token.js";
import Staff from "../model/Staff.js";
import bcrypt from "bcryptjs";
import express from "express";

// Staff Signup
const staffSignup = async (req, res, next) => {
    try {
        let { firstName, lastName, phoneNumber, userId, password, event } = req.body;

        const existingStaff = await Staff.findOne({ userId });
        if (existingStaff) {
            return res.status(400).json({ message: "User ID already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const staff = await Staff.create({
            firstName,
            lastName,
            phoneNumber,
            userId,
            password: hashedPassword,
            event,
            loginEnabled: true // Set loginEnabled to true on signup
        });
        let token = await genToken({ staffId: staff._id });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json(staff);
    } catch (error) {
        return res.status(500).json({ message: `signup error ${error} ` });
    }
};

// Staff Login
const staffLogin = async (req, res, next) => {
    try {
        let { userId, password } = req.body;
        const staff = await Staff.findOne({ userId });
        if (!staff) {
            return res.status(400).json({ message: "Invalid user ID or password" });
        }
        if (!staff.loginEnabled) {
            return res.status(403).json({ message: "Login is not enabled for this staff user." });
        }
        let isPasswordValid = await bcrypt.compare(password, staff.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid user ID or password" });
        }
        let token = await genToken({ staffId: staff._id });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: "Login successful",
            token,
            staff
        });
    } catch (error) {
        return res.status(500).json({ message: `login error ${error} ` });
    }
};

// Staff Logout
const staffLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: `logout error ${error} ` });
    }
};

// Get staff by event ID
const getStaffByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const staffList = await Staff.find({ event: eventId });
        return res.status(200).json(staffList);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching staff for event: ${error}` });
    }
};

export { staffSignup, staffLogin, staffLogout, getStaffByEvent };
