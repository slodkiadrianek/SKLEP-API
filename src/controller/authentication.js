import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

import {
  registerAuthentication,
  loginAuthentication,
  addSpecialToken,
} from "../model/authentication.js";

const loginAuthenticationPage = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(200).json({ message: "Nie podałeś wszystkich danych" });
    }
    const [accountPassword] = await loginAuthentication(email);
    const hashedPassword = accountPassword[0]["Hasło"];
    const passwordComparing = await bcrypt.compare(password, hashedPassword);
    if (!passwordComparing) {
      return res.json({
        message: `Wprowadziłeś złe hasło`,
      });
    }
    console.log(accountPassword[0]["idUżytkownicy"]);
    const token = jwt.sign(
      {
        email: accountPassword[0]["Email"],
        userId: accountPassword[0]["idUżytkownicy"],
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: `Zalogowano pomyślnie`,
      yourToken: token,
    });
  } catch (error) {
    return error;
  }
};

const registerAuthenticationPage = async (req, res, next) => {
  try {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    if (!name || !surname || !email || !password) {
      return res.status(200).json({ message: "Nie podałeś wszystkich danych" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await registerAuthentication(name, surname, email, hashedPassword);
    return res
      .status(201)
      .json({ message: "Zostałeś pomyślnie zarejestrowany" });
  } catch (error) {
    return error;
  }
};

export { loginAuthenticationPage, registerAuthenticationPage };
