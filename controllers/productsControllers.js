import client from '../db/database.js'
import { getAllFrom, isThere, paginate } from '../helpers/tools.js'


export const getAllProducts = async (req, res, next) => {
    try {
        const {rows: products} = await getAllFrom('products')
        if(products.length < 1) 
            throw new Error({success: false, error: 'There is no products yet'})
        
        const page = req.query.page
        const limit = req.query.limit
        const pagiginated = paginate(products, page, limit)

        res.status(200).send({success: true, products: pagiginated})
    } catch (error) {
        next(error)
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: product} = await isThere('products', 'id', id)
        if(product.length < 1) 
            throw new Error({success: false, error: 'No product was found'})
        
        res.status(200).send({success: true, products: product[0]})
    } catch (error) {
        next(error)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const {name, category, description, salesman, price} = req.body

        const {rows: newproduct} = await client.query(`
            INSERT INTO products (name, category, description, salesman, price)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
            `, [name, category, description, salesman, price])

        res.status(200).send({success: true, products: newproduct[0]})
    } catch (error) {
        next(error)
    }
}

export const modifyProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const modFields = req.body
        
        var {rows: product} = await isThere('products', 'id', id)
        if(product.length < 1) 
            throw new Error({success: false, error: 'No product was found'})

        product = {...product[0], ...modFields}
        await client.query(`DELETE FROM products WHERE id = $1`, [id])
        const result = client.query(
            `
            INSERT INTO products (name, category, description, salesman, price)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
            `, [product.name, product.category, product.description, product.salesman, product.price]
        )

        res.status(200).send({success: true, product: result})
    } catch (error) {
        next(error)
    }
}

export const deleteProductById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: product} = await isThere('products', 'id', id)
        if(product.length < 1) 
            throw new Error({success: false, error: 'No product was found'})
        
        await client.query(`DELETE FROM products WHERE id = $1`, [id])
        res.status(200).send({success: true, product: product[0]})
    } catch (error) {
        next(error)
    }
}