import { findUserId } from "../model/authentication.js";
import { cart } from "../model/products.js";
import {
  addProductToCart,
  addOrder,
  showOrder,
  showCart,
} from "../model/order.js";
const addProductToCartPage = async (req, res, next) => {
  const productId = req.body.productId;
  const token = req.body.token;
  const [userData] = await findUserId(token);
  const userId = userData[0]["idUżytkownicy"];
  const expirationTime = userData[0].CzasKodu;
  const actualDate = new Date().getTime();
  if (actualDate > +expirationTime)
    return res
      .status(500)
      .json({ message: "Zostałeś wylogowany zaloguj się ponownie" });
  const [cartResult] = await cart(userId);
  const cartStore = [];
  cartStore.push(productId);
  if (typeof cartResult[0].Koszyk == typeof "String") {
    cartStore.push(cartResult[0].Koszyk);
  }
  await addProductToCart(cartStore, userId);
  return res
    .status(201)
    .json({ message: `Pomyślnie dodano produkt do koszyka` });
};

const createOrderPage = async (req, res, next) => {
  const token = req.body.token;
  const [userData] = await findUserId(token);
  const userId = userData[0]["idUżytkownicy"];
  const expirationTime = userData[0].CzasKodu;
  const actualDate = new Date().getTime();
  if (actualDate > +expirationTime)
    return res
      .status(500)
      .json({ message: "Zostałeś wylogowany zaloguj się ponownie" });
  const [cart] = await showCart(userId);
  console.log(cart);
  const result = await addOrder(cart[0].Koszyk, userId);
  return res.status(201).json({ message: "Pomyślnie złożono zamówienie" });
};

const showCartPage = async (req, res, next) => {
  const token = req.body.token;
  const [userData] = await findUserId(token);
  const userId = userData[0]["idUżytkownicy"];
  const expirationTime = userData[0].CzasKodu;
  const actualDate = new Date().getTime();
  if (actualDate > +expirationTime)
    return res
      .status(500)
      .json({ message: "Zostałeś wylogowany zaloguj się ponownie" });
  const [result] = await showCart(userId);
  return res.status(200).json({ message: result });
};

const showOrderPage = async (req, res, next) => {
  const token = req.body.token;
  const [userData] = await findUserId(token);
  const userId = userData[0]["idUżytkownicy"];
  const expirationTime = userData[0].CzasKodu;
  const actualDate = new Date().getTime();
  if (actualDate > +expirationTime)
    return res
      .status(500)
      .json({ message: "Zostałeś wylogowany zaloguj się ponownie" });
  const [result] = await showOrder(userId);
  return res.status(200).json({ message: result });
};
export { addProductToCartPage, createOrderPage, showOrderPage, showCartPage };
