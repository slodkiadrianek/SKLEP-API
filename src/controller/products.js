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
  const userId = req.userId;
  console.log(`haj`, userId);
  await addProduct(name, price, userId);
  return res.status(201).json({ message: "Pomyślnie dodano produkt" });
};

// dodaj usuwanie i edytowanie produktu

const deleteProductPage = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.userId;

    await deleteProduct(productId, userId);

    return res.json({ message: `Pomyślnie usunięto produkt` });
  } catch (error) {
    next(error);
  }
};

const updateProductPage = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const name = req.body.name;
    const price = req.body.price;
    const userId = req.userId;

    await updateProduct(name, price, productId, userId);
    return res.json({ message: `Pomyślnie zaaktualizwoano produkt` });
  } catch (error) {
    next(error);
  }
};

const showUserDataPage = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const IdUzytkownik = req.body.IdUzytkownik;
    const [result] = await showUserData(productId, IdUzytkownik);
    return res.status(200).json({ userData: result[0] });
  } catch (error) {
    next(error);
  }
};

export {
  productsPage,
  addProductPage,
  deleteProductPage,
  updateProductPage,
  showUserDataPage,
};
