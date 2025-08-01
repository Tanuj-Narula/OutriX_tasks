import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) return res.status(401).send({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" , err });
  }
};

export default auth;