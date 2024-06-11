import { pool } from "../utils/database.js";

const showProducts = async (limit, skip) => {
  const result = await pool.query(
    `SELECT * FROM Produkty LIMIT ${limit} OFFSET ${skip} `
  );
  return result;
};

const addProduct = async (name, price, userId) => {
  const result = await pool.query(
    `INSERT INTO Produkty (Nazwa, Cena, IdUzytkownik) VALUE('${name}', '${price}', ${userId})`
  );
  return result;
};

const deleteProduct = async (productId, userId) => {
  const result = await pool.query(
    `DELETE FROM Produkty WHERE idProduktu = ${productId} AND IdUzytkownik = ${userId}`
  );
  return result;
};

const updateProduct = async (name, price, productId, userId) => {
  const result = await pool.query(
    `UPDATE Produkty SET Nazwa = '${name}', Cena = '${price}' WHERE idProduktu = ${productId} AND IdUzytkownik = ${userId}`
  );
  return result;
};

const showUserData = async (productId, IdUzytkownik) => {
  const result = await pool.query(
    `SELECT Uzytkownicy.Imię, Uzytkownicy.Nazwisko, Uzytkownicy.Email FROM Produkty INNER JOIN Uzytkownicy ON Produkty.IdUzytkownik = Uzytkownicy.idUżytkownicy WHERE idProduktu = ${productId}`
  );
  console.log(result);
  return result;
};

export { addProduct, showProducts, deleteProduct, updateProduct, showUserData };
