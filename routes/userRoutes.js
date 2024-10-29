import { Router } from "express"
import { createUser, deleteUserById, getAllUser, getUserById, modifyUser } from "../controllers/usersControllers.js"

export const userRouter = new Router()

userRouter.get('/', getAllUser)
userRouter.get('/:id', getUserById)
userRouter.post('/', createUser)
userRouter.put('/:id', modifyUser)
userRouter.delete('/:id', deleteUserById)