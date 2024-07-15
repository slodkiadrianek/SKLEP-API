import { imageModel } from "../utils/database.js";
import fs from "fs/promises";
import flash from "express-flash";

const landingPage = (req, res, next) => {
  res.render("landing--page", {
    title: "Strona główna",
  });
};

const foldersPage = async (req, res, next) => {
  const { person } = req.params;
  let images;
  const info = req.flash("info") || 0;
  const flash = req.flash("images");
  console.log(flash, info);
  if (flash.length >= 1 && info.length >= 1) {
    req.flash("images").pop();
    images = req.flash("images");
  } else {
    images = await imageModel.find({ person: person });
  }
  return res.render("folder", {
    title: "Folder",
    person: person,
    images: images,
  });
};

const photosValidationPage = async (req, res, next) => {
  const image = req.files;
  const { person } = req.body;
  for (const el of image) {
    await imageModel.create({ fileName: el.filename, person: person });
  }
  return res.redirect(`/${person}`);
};

const photoDelete = async (req, res, next) => {
  const { person, fileName } = req.body;
  await imageModel.deleteOne({ person: person, fileName: fileName });
  await fs.unlink(`./images/${fileName}`);
  res.redirect(`/${person}`);
};

const search = async (req, res, next) => {
  const { date, person } = req.body;
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1;
  const day = formattedDate.getDate();
  const createdDate = `${year}-${month > 9 ? month : "0" + month}-${
    day > 9 ? day : "0" + day
  }`;
  const images = await imageModel.find({
    fileName: { $regex: createdDate },
  });
  images.push("1");
  req.flash("info", 1);
  req.flash("images", images);
  return res.redirect(`/${person}`);
};

export { landingPage, foldersPage, photosValidationPage, photoDelete, search };
