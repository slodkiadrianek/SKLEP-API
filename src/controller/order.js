import { cart } from "../model/products.js";
import {
  addProductToCart,
  addOrder,
  showOrder,
  showCart,
} from "../model/order.js";
const addProductToCartPage = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.userId;
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
  } catch (error) {
    next(error);
  }
};

const createOrderPage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const [cart] = await showCart(userId);
    await addOrder(cart[0].Koszyk, userId);
    return res.status(201).json({ message: "Pomyślnie złożono zamówienie" });
  } catch (error) {
    next(error);
  }
};

const showCartPage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const [result] = await showCart(userId);
    return res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};

const showOrderPage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const [result] = await showOrder(userId);
    return res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
export { addProductToCartPage, createOrderPage, showOrderPage, showCartPage };
