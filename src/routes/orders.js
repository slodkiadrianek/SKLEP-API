import e from "express";
import { addProductToCartPage } from "../controller/order.js";
const router = e.Router();

router.post("/addProduct", addProductToCartPage);

export default router;
