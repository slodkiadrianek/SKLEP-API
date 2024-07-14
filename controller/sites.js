import { imageModel } from "../utils/database.js";
import fs from "fs/promises";

const landingPage = (req, res, next) => {
  res.render("landing--page", {
    title: "Strona główna",
  });
};

const foldersPage = async (req, res, next) => {
  const { person } = req.params;
  const images = await imageModel.find({ person: person });
  res.render("folder", {
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

export { landingPage, foldersPage, photosValidationPage, photoDelete };
