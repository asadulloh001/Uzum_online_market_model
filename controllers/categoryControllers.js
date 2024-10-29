import client from '../db/database.js'
import { getAllFrom, isThere, paginate } from '../helpers/tools.js'


export const getAllcategory = async (req, res, next) => {
    try {
        const {rows: categories} = await getAllFrom('categories')
        if(categories.length < 1) 
            throw new Error({success: false, error: 'There is no categories yet'})
        
        const page = req.query.page
        const limit = req.query.limit
        const pagiginated = paginate(categories, page, limit)

        res.status(200).send({success: true, categories: pagiginated})
    } catch (error) {
        next(error)
    }
}

export const getcategoryById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: category} = await isThere('categories', 'id', id)
        if(category.length < 1) 
            throw new Error({success: false, error: 'No category was found'})
        
        res.status(200).send({success: true, categories: category[0]})
    } catch (error) {
        next(error)
    }
}

export const createcategory = async (req, res, next) => {
    try {
        const {name} = req.body

        const {rows: newcategory} = await client.query(`
            INSERT INTO categoriess (name)
            VALUES ($1) RETURNING *
            `, [name])

        res.status(200).send({success: true, categories: newcategory[0]})
    } catch (error) {
        next(error)
    }
}

export const modifycategory = async (req, res, next) => {
    try {
        const id = req.params.id
        const modFields = req.body
        
        var {rows: category} = await isThere('categories', 'id', id)
        if(category.length < 1) 
            throw new Error({success: false, error: 'No category was found'})

        category = {...category[0], ...modFields}
        await client.query(`DELETE FROM categories WHERE id = $1`, [id])
        const result = client.query(
            `
            INSERT INTO categories (name)
            VALUES ($1) RETURNING *;
            `, [category.name]
        )

        res.status(200).send({success: true, category: result})
    } catch (error) {
        next(error)
    }
}

export const deletecategoryById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: category} = await isThere('categories', 'id', id)
        if(category.length < 1) 
            throw new Error({success: false, error: 'No category was found'})
        
        await client.query(`DELETE FROM categories WHERE id = $1`, [id])
        res.status(200).send({success: true, category: category[0]})
    } catch (error) {
        next(error)
    }
}