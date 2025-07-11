import jwt from "jsonwebtoken";
import Organiser from "../model/Organiser.js";

export const verifyOrganiser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
const organiser = await Organiser.findById(decoded.organiserId);

    if (!organiser) return res.status(404).json({ message: "Organiser not found" });

    req.organiser = organiser; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
