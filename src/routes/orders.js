import e from "express";
import {
  addProductToCartPage,
  createOrderPage,
  showOrderPage,
  showCartPage,
} from "../controller/order.js";
const router = e.Router();

router.post("/addProduct", addProductToCartPage);

router.post("/createOrderPage", createOrderPage);

router.post("/showOrder", showOrderPage);

router.post("/showCart", showCartPage);

export default router;
