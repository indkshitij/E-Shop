import { Router } from "express";
import {getProducts,getProductById} from "../controllers/product.js";

const productRoute = Router();

productRoute.get("/", getProducts);
productRoute.get("/product-detail/:id",getProductById);

export default productRoute;
