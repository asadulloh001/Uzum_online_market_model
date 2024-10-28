import { client } from "../db/database.js"

export const loginUser = (req, res, next) => {
    try {
        const {login} = req.user
        res.status(200).send({login: 'Successful', message: `Welcome ${login}`})    
    } catch (error) {
        res.status(400).send({login: 'Failed', error: error.message/* Sorry, something went wrong */})
    }
}

export const registerUser = (req, res) => {
    try {
        const {name, surname, phone, email, address} = req.body
        client.query(`
            INSERT INTO users (name, surname, phone, email, address)
            VALUES ($1, $2, $3, $4, $5);
            `, [name, surname, phone, email, address])
        
        res.status(200).send({register: 'Success', message: 'Happy shopping :)'})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

export const loginSalesman = async (req, res) => {
    try {
        return res.status(400).send({login: "Success", message: `Hi, ${req.user.login}`})   
    } catch (error) {
        res.status(400).send({login: 'Failed', error: error.message/* Sorry, something went wrong */})
    }
}

export const registerSalesman = (req, res, next) => {

    try {
        const {name, surname, phone, email, password, address, card_number, balance, rating} = req.body

        client.query(`
            INSERT INTO salesmen (name, surname, phone, email, password, address, card_number, balance, rating)
            VALUES ($1, $2, $3, $4, $5);
            `, [name, surname, phone, email, password, address, address, card_number, balance || 0, rating || 5])
        
        res.status(200).send({register: 'Success', message: 'Good luck with your sales ;)'})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}


// write return*** next()