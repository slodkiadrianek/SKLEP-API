import AppError from "../model/errorApp.js";

export default async function errorHandler(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(500).json({ message: `Something went wrong` });
}
