import bcrypt from "bcrypt";
import crypto from "crypto";
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
    crypto.randomBytes(16, async (err, Buffer) => {
      const token = Buffer.toString("hex");
      const tokenExpiration = new Date().getTime() + 60 * 60 * 1000;
      await addSpecialToken(token, tokenExpiration, email);
      return res.json({
        message: `Zalogowano pomyślnie`,
        yourToken: token,
      });
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
