import client from '../db/database.js'
import { getAllFrom, isThere, paginate } from '../helpers/tools.js'


export const getAllComment = async (req, res, next) => {
    try {
        const {rows: comments} = await getAllFrom('comments')
        if(comments.length < 1) 
            throw new Error({success: false, error: 'There is no comments yet'})
        
        const page = req.query.page
        const limit = req.query.limit
        const pagiginated = paginate(comments, page, limit)

        res.status(200).send({success: true, comments: pagiginated})
    } catch (error) {
        next(error)
    }
}

export const getCommentById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: comment} = await isThere('comments', 'id', id)
        if(comment.length < 1) 
            throw new Error({success: false, error: 'No comment was found'})
        
        res.status(200).send({success: true, comments: comment[0]})
    } catch (error) {
        next(error)
    }
}

export const createComment = async (req, res, next) => {
    try {
        const {commenter, comment} = req.body

        const {rows: newcomment} = await client.query(`
            INSERT INTO comments (commenter, comment)
            VALUES ($1, $2) RETURNING *
            `, [commenter, comment])

        res.status(200).send({success: true, comments: newcomment[0]})
    } catch (error) {
        next(error)
    }
}

export const modifyComment = async (req, res, next) => {
    try {
        const id = req.params.id
        const modFields = req.body
        
        var {rows: comment} = await isThere('comments', 'id', id)
        if(comment.length < 1) 
            throw new Error({success: false, error: 'No comment was found'})

        comment = {...comment[0], ...modFields}
        await client.query(`DELETE FROM comments WHERE id = $1`, [id])
        const result = client.query(
            `
            INSERT INTO comments (commenter, comment)
            VALUES ($1, $2) RETURNING *;
            `, [comment.commenter, comment.comment]
        )

        res.status(200).send({success: true, comment: result})
    } catch (error) {
        next(error)
    }
}

export const deleteCommentById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: comment} = await isThere('comments', 'id', id)
        if(comment.length < 1) 
            throw new Error({success: false, error: 'No comment was found'})
        
        await client.query(`DELETE FROM comments WHERE id = $1`, [id])
        res.status(200).send({success: true, comment: comment[0]})
    } catch (error) {
        next(error)
    }
}