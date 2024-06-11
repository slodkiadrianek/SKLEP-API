import { findUserId } from "../model/authentication.js";
import {
  addProduct,
  showProducts,
  deleteProduct,
  updateProduct,
  showUserData,
} from "../model/products.js";

const productsPage = async (req, res, next) => {
  const page = req.query.page || 1;
  const itemsPerPage = 5;
  const skip = (page - 1) * itemsPerPage;
  const [result] = await showProducts(itemsPerPage, skip);
  return res.status(200).json({ Produkty: result });
};

const addProductPage = async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const token = req.body.token;

  const [userData] = await findUserId(token);
  const userId = userData[0]["idUżytkownicy"];
  const expirationTime = userData[0].CzasKodu;
  const actualDate = new Date().getTime();
  if (actualDate > +expirationTime)
    return res
      .status(500)
      .json({ message: "Zostałeś wylogowany zaloguj się ponownie" });
  await addProduct(name, price, userId);
  return res.status(201).json({ message: "Pomyślnie dodano produkt" });
};

// dodaj usuwanie i edytowanie produktu

const deleteProductPage = async (req, res, next) => {
  const productId = req.body.productId;
  const token = req.body.token;
  const [userData] = await findUserId(token);
  const userId = userData[0]["idUżytkownicy"];
  await deleteProduct(productId, userId);
  return res.json({ message: `Pomyślnie usunięto produkt` });
};

const updateProductPage = async (req, res, next) => {
  const productId = req.body.productId;
  const token = req.body.token;
  const name = req.body.name;
  const price = req.body.price;
  const [userData] = await findUserId(token);
  const userId = userData[0]["idUżytkownicy"];
  await updateProduct(name, price, productId, userId);
  return res.json({ message: `Pomyślnie zaaktualizwoano produkt` });
};

const showUserDataPage = async (req, res, next) => {
  const productId = req.body.productId;
  const IdUzytkownik = req.body.IdUzytkownik;
  const [result] = await showUserData(productId, IdUzytkownik);
  return res.status(200).json({ userData: result[0] });
};

export {
  productsPage,
  addProductPage,
  deleteProductPage,
  updateProductPage,
  showUserDataPage,
};
