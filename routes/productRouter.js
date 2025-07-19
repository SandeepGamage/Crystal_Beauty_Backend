import express from "express"
import { createProduct } from "../controllers/productController.js";
import { getProducts, deleteProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/",getProducts);
productRouter.post("/add",createProduct);
productRouter.delete("/delete/:id",deleteProduct);

export default productRouter