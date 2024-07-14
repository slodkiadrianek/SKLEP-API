import e from "express";

import {
  landingPage,
  foldersPage,
  photosValidationPage,
  photoDelete,
} from "../controller/sites.js";

const router = e.Router();

router.get("/", landingPage);

router.get("/:person", foldersPage);

router.post("/photosValidation", photosValidationPage);

router.post("/photoDelete", photoDelete);

export default router;
