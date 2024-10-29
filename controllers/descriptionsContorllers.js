import client from '../db/database.js'
import { getAllFrom, isThere, paginate } from '../helpers/tools.js'


export const getAllDescriptions = async (req, res, next) => {
    try {
        const {rows: descriptions} = await getAllFrom('descriptions')
        if(descriptions.length < 1) 
            throw new Error({success: false, error: 'There is no descriptions yet'})
        
        const page = req.query.page
        const limit = req.query.limit
        const pagiginated = paginate(descriptions, page, limit)

        res.status(200).send({success: true, descriptions: pagiginated})
    } catch (error) {
        next(error)
    }
}

export const getDescriptionById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: description} = await isThere('descriptions', 'id', id)
        if(description.length < 1) 
            throw new Error({success: false, error: 'No description was found'})
        
        res.status(200).send({success: true, descriptions: description[0]})
    } catch (error) {
        next(error)
    }
}

export const createDescription = async (req, res, next) => {
    try {
        const {description, rating, model, info, quantity, producer} = req.body

        const {rows: newdescription} = await client.query(`
            INSERT INTO descriptions (description, rating, model, info, quantity, producer)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `, [description, rating, model, info, quantity, producer])

        res.status(200).send({success: true, descriptions: newdescription[0]})
    } catch (error) {
        next(error)
    }
}

export const modifyDescription = async (req, res, next) => {
    try {
        const id = req.params.id
        const modFields = req.body
        
        var {rows: description} = await isThere('descriptions', 'id', id)
        if(description.length < 1) 
            throw new Error({success: false, error: 'No description was found'})

        description = {...description[0], ...modFields}
        await client.query(`DELETE FROM descriptions WHERE id = $1`, [id])
        const result = client.query(
            `
            INSERT INTO descriptions (description, rating, model, info, quantity, producer)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
            `, [description.description, description.rating, description.model, description.info, description.quantity, description.producer]
        )

        res.status(200).send({success: true, description: result})
    } catch (error) {
        next(error)
    }
}

export const deleteDescriptionById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: description} = await isThere('descriptions', 'id', id)
        if(description.length < 1) 
            throw new Error({success: false, error: 'No description was found'})
        
        await client.query(`DELETE FROM descriptions WHERE id = $1`, [id])
        res.status(200).send({success: true, description: description[0]})
    } catch (error) {
        next(error)
    }
}