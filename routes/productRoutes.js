import { Router } from "express"
import { createProduct, deleteProductById, getAllProducts, getProductById, modifyProduct } from "../controllers/productsControllers.js"

export const productRouter = new Router()

productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProductById)
productRouter.post('/', createProduct)
productRouter.put('/:id', modifyProduct)
productRouter.delete('/:id', deleteProductById)