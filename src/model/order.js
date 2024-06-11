import { pool } from "../utils/database.js";
const addProductToCart = async (cartStore, userId) => {
  const result = await pool.query(
    `UPDATE Uzytkownicy SET Koszyk = '${cartStore}' WHERE  idUżytkownicy = ${userId} `
  );
  return result;
};

export { addProductToCart };
