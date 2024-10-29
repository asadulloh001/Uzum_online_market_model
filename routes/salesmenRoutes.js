import { Router } from "express"
import { createSalesman, deleteSalesmanById, getAllSalesmen, getSalesmenById, modifySalesman } from "../controllers/salesmenControllers.js"

export const salesmenRouter = new Router()

salesmenRouter.get('/', getAllSalesmen)
salesmenRouter.get('/:id', getSalesmenById)
salesmenRouter.post('/', createSalesman)
salesmenRouter.put('/:id', modifySalesman)
salesmenRouter.delete('/:id', deleteSalesmanById)