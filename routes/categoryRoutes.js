import { Router } from "express"
import { createcategory, deletecategoryById, getAllcategory, getcategoryById, modifycategory } from "../controllers/categoryControllers.js"

export const categoryRouter = new Router()

categoryRouter.get('/', getAllcategory)
categoryRouter.get('/:id', getcategoryById)
categoryRouter.post('/', createcategory)
categoryRouter.put('/:id', modifycategory)
categoryRouter.delete('/:id', deletecategoryById)