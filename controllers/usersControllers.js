import client from '../db/database.js'
import { getAllFrom, isThere, paginate } from '../helpers/tools.js'


export const getAllUser = async (req, res, next) => {
    try {
        const {rows: users} = await getAllFrom('users')
        if(users.length < 1) 
            throw new Error({success: false, error: 'There is no users yet'})
        
        const page = req.query.page
        const limit = req.query.limit
        const pagiginated = paginate(users, page, limit)

        res.status(200).send({success: true, users: pagiginated})
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: user} = await isThere('users', 'id', id)
        if(user.length < 1) 
            throw new Error({success: false, error: 'No user was found'})
        
        res.status(200).send({success: true, users: user[0]})
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const {name, surname, phone, email, password, address, favorite} = req.body

        const {rows: newUser} = await client.query(`
            INSERT INTO users (name, surname, phone, email, password, address, favorite)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
            `, [name, surname, phone, email, password, address, favorite])

        res.status(200).send({success: true, users: newUser[0]})
    } catch (error) {
        next(error)
    }
}

export const modifyUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const modFields = req.body
        
        var {rows: user} = await isThere('users', 'id', id)
        if(user.length < 1) 
            throw new Error({success: false, error: 'No user was found'})

        user = {...user[0], ...modFields}
        await client.query(`DELETE FROM users WHERE id = $1`, [id])
        const result = client.query(
            `
            INSERT INTO users (name, surname, phone, email, password, address, favorite)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
            `, [user.name, user.surname, user.phone, user.email, user.password, user.address, user.favorite]
        )

        res.status(200).send({success: true, user: result})
    } catch (error) {
        next(error)
    }
}

export const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        const {rows: user} = await isThere('users', 'id', id)
        if(user.length < 1) 
            throw new Error({success: false, error: 'No user was found'})
        
        await client.query(`DELETE FROM users WHERE id = $1`, [id])
        res.status(200).send({success: true, user: user[0]})
    } catch (error) {
        next(error)
    }
}