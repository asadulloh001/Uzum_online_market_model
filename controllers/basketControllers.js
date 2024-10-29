import client from '../db/database.js'
import { getAllFrom, isThere, paginate } from '../helpers/tools.js'


export const getAllbasket = async (req, res, next) => {
    try {
        const {rows: basket} = await getAllFrom('basket')
        if(basket.length < 1) 
            throw new Error({success: false, error: 'There is no basket yet'})
        
        const page = req.query.page
        const limit = req.query.limit
        const pagiginated = paginate(basket, page, limit)

        res.status(200).send({success: true, basket: pagiginated})
    } catch (error) {
        next(error)
    }
}

export const getbasketById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: basket} = await isThere('basket', 'id', id)
        if(basket.length < 1) 
            throw new Error({success: false, error: 'No basket was found'})
        
        res.status(200).send({success: true, basket: basket[0]})
    } catch (error) {
        next(error)
    }
}

export const createbasket = async (req, res, next) => {
    try {
        const {user_id, fav_product} = req.body

        const {rows: newbasket} = await client.query(`
            INSERT INTO basket (user_id, fav_product)
            VALUES ($1, $2) RETURNING *
            `, [user_id, fav_product])

        res.status(200).send({success: true, basket: newbasket[0]})
    } catch (error) {
        next(error)
    }
}

export const modifybasket = async (req, res, next) => {
    try {
        const id = req.params.id
        const modFields = req.body
        
        var {rows: basket} = await isThere('basket', 'id', id)
        if(basket.length < 1) 
            throw new Error({success: false, error: 'No basket was found'})

        basket = {...basket[0], ...modFields}
        await client.query(`DELETE FROM basket WHERE id = $1`, [id])
        const result = client.query(
            `
            INSERT INTO basket (user_id, fav_product)
            VALUES ($1, $2) RETURNING *;
            `, [basket.user_id, basket.fav_product]
        )

        res.status(200).send({success: true, basket: result})
    } catch (error) {
        next(error)
    }
}

export const deletebasketById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: basket} = await isThere('basket', 'id', id)
        if(basket.length < 1) 
            throw new Error({success: false, error: 'No basket was found'})
        
        await client.query(`DELETE FROM basket WHERE id = $1`, [id])
        res.status(200).send({success: true, basket: basket[0]})
    } catch (error) {
        next(error)
    }
}