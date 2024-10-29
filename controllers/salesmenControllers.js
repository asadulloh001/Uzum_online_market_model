import client from '../db/database.js'
import { getAllFrom, isThere, paginate } from '../helpers/tools.js'


export const getAllSalesmen = async (req, res, next) => {
    try {
        const {rows: salesmen} = await getAllFrom('salesmen')
        if(salesmen.length < 1) 
            throw new Error({success: false, error: 'There is no salesman yet'})
        
        const page = req.query.page
        const limit = req.query.limit
        const pagiginated = paginate(salesmen, page, limit)

        res.status(200).send({success: true, salesmen: pagiginated})
    } catch (error) {
        next(error)
    }
}

export const getSalesmenById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: salesman} = await isThere('salesmen', 'id', id)
        if(salesman.length < 1) 
            throw new Error({success: false, error: 'No salesman was found'})
        
        res.status(200).send({success: true, users: salesman[0]})
    } catch (error) {
        next(error)
    }
}

export const createSalesman = async (req, res, next) => {
    try {
        const {name, surname, phone, email, password, address, card_number, balance, rating} = req.body

        const {rows: newSalesman} = await client.query(`
            INSERT INTO salesmen (name, surname, phone, email, password, address, card_number, balance, rating)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `, [name, surname, phone, email, password, address, card_number, balance || 0, rating || 5])

        res.status(200).send({success: true, users: newSalesman[0]})
    } catch (error) {
        next(error)
    }
}

export const modifySalesman = async (req, res, next) => {
    try {
        const id = req.params.id
        const modFields = req.body
        
        var {rows: salesman} = await isThere('users', 'id', id)
        if(salesman.length < 1) 
            throw new Error({success: false, error: 'No salesman was found'})

        salesman = {...salesman[0], ...modFields}
        await client.query(`DELETE FROM salesmen WHERE id = $1`, [id])
        const result = client.query(
            `
            INSERT INTO salesmen (name, surname, phone, email, password, address, card_number, balance, rating)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
            `, [salesman.name, salesman.surname, salesman.phone, salesman.email, salesman.password, salesman.address, salesman.card_number, salesman.balance, salesman.rating]
        )

        res.status(200).send({success: true, salesman: result})
    } catch (error) {
        next(error)
    }
}

export const deleteSalesmanById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: salesman} = await isThere('salesmen', 'id', id)
        if(salesman.length < 1) 
            throw new Error({success: false, error: 'No salesman was found'})
        
        await client.query(`DELETE FROM salesmen WHERE id = $1`, [id])
        res.status(200).send({success: true, salesman: salesman[0]})
    } catch (error) {
        next(error)
    }
}