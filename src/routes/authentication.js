import e from "express";

const router = e.Router();
import {
  loginAuthenticationPage,
  registerAuthenticationPage,
} from "../controller/authentication.js";

router.post("/loginAuthentication", loginAuthenticationPage);

router.put("/registerAuthentication", registerAuthenticationPage);

export default router;
