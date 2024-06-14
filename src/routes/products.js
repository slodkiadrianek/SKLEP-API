import e from "express";
import isAuth from "../middleware/is-auth.js";
import {
  productsPage,
  addProductPage,
  deleteProductPage,
  updateProductPage,
  showUserDataPage,
} from "../controller/products.js";
const router = e.Router();

router.get("/", productsPage);

router.post("/addProductt", isAuth, addProductPage);

router.delete("/deleteProduct", isAuth, deleteProductPage);

router.post("/updateProduct", isAuth, updateProductPage);

router.post("/showUserData", isAuth, showUserDataPage);

export default router;
