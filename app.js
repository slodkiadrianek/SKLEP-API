import e from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import mainSite from "./routes/routes.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const app = e();

const port = 9696;

app.set("view engine", "ejs");

app.set("views", "views");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + file.originalname);
  },
});

const fileFiler = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .jpeg and .png format allowed!"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFiler }).array(
  "file",
  50
);
app.use(upload);

app.use(e.static(path.join(process.cwd(), "public")));
app.use(e.static(path.join(process.cwd(), "images")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(mainSite);
app.listen(port, async () => {
  await mongoose.connect(process.env.MONGO__PASS);
});
