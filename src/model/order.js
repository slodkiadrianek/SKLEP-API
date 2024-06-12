import { pool } from "../utils/database.js";
const addProductToCart = async (cartStore, userId) => {
  const result = await pool.query(
    `UPDATE Uzytkownicy SET Koszyk = '${cartStore}' WHERE  idUżytkownicy = ${userId} `
  );
  return result;
};

const showCart = async (userId) => {
  const result = await pool.query(
    `SELECT Koszyk FROM Uzytkownicy WHERE idUżytkownicy = ${userId}`
  );
  return result;
};

const showOrder = async (userId) => {
  const result = await pool.query(
    `SELECT Produkty FROM Zamowienia WHERE IdUzytkownik = ${userId}`
  );
  return result;
};

const addOrder = async (cart, userId) => {
  await pool.query(
    `UPDATE Uzytkownicy SET Koszyk = null WHERE idUżytkownicy = ${userId}`
  );
  const result = await pool.query(
    `INSERT INTO Zamowienia (Produkty, IdUzytkownik) VALUES('${cart}', ${userId})`
  );
  return result;
};
export { addProductToCart, addOrder, showOrder, showCart };
