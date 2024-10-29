import { Router } from "express"
import { createDescription, deleteDescriptionById, getAllDescriptions, getDescriptionById, modifyDescription } from "../controllers/descriptionsContorllers.js"

export const descriptionRouter = new Router()

descriptionRouter.get('/', getAllDescriptions)
descriptionRouter.get('/:id', getDescriptionById)
descriptionRouter.post('/', createDescription)
descriptionRouter.put('/:id', modifyDescription)
descriptionRouter.delete('/:id', deleteDescriptionById)