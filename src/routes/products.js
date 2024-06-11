import e from "express";
import {
  productsPage,
  addProductPage,
  deleteProductPage,
  updateProductPage,
  showUserDataPage,
} from "../controller/products.js";
const router = e.Router();

router.get("/", productsPage);

router.post("/addProduct", addProductPage);

router.post("/deleteProduct", deleteProductPage);

router.post("/updateProduct", updateProductPage);

router.post("/showUserData", showUserDataPage);

export default router;
