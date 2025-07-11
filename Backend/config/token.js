import jwt from "jsonwebtoken";

const genToken = async(payload) => {
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log("token error:", error);
    }
}

export default genToken;
