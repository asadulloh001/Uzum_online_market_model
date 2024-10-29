import { Router } from "express"
import { createbasket, deletebasketById, getAllbasket, getbasketById, modifybasket } from "../controllers/basketControllers.js"

export const basketRouter = new Router()

basketRouter.get('/', getAllbasket)
basketRouter.get('/:id', getbasketById)
basketRouter.post('/', createbasket)
basketRouter.put('/:id', modifybasket)
basketRouter.delete('/:id', deletebasketById)