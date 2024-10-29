import { Router } from "express"
import { createComment, deleteCommentById, getAllComment, getCommentById, modifyComment } from "../controllers/commentsControllers.js"

export const commentRouter = new Router()

commentRouter.get('/', getAllComment)
commentRouter.get('/:id', getCommentById)
commentRouter.post('/', createComment)
commentRouter.put('/:id', modifyComment)
commentRouter.delete('/:id', deleteCommentById)