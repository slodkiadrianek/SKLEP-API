import { loginAuthenticationPage } from "../controller/authentication.js";
import { pool } from "../utils/database.js";

const registerAuthentication = async (name, surname, email, password) => {
  const result = await pool.query(
    `INSERT INTO Uzytkownicy (Imię, Nazwisko, Email, Hasło)VALUES ( '${name}', '${surname}', '${email}', '${password}') `
  );
  return result;
};

const loginAuthentication = async (email) => {
  const result = await pool.query(
    `SELECT Hasło FROM Uzytkownicy WHERE Email = '${email}' LIMIT 1`
  );
  return result;
};

const addSpecialToken = async (token, expirationToken, email) => {
  const result = await pool.query(
    `UPDATE Uzytkownicy  SET CzasKodu = '${expirationToken}', Kod = '${token}' WHERE Email  = '${email}'`
  );
  return result;
};

const findUserId = async (token) => {
  const result = await pool.query(
    `SELECT idUżytkownicy, CzasKodu FROM Uzytkownicy WHERE kod = '${token}'`
  );
  return result;
};

export {
  registerAuthentication,
  loginAuthentication,
  addSpecialToken,
  findUserId,
};
