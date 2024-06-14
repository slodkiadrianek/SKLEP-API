import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import AppError from "../model/errorApp.js";
configDotenv();
export default async function isAuth(req, res, next) {
  const token = req.get("Authorization").split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (!decoded) {
      throw new AppError("Not authorized", 401);
    }
  } catch (error) {
    next(error);
  }
  req.userId = decoded.userId;
  req.email = decoded.email;
  next();
}
