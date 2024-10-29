import client from "../db/database.js"

export const basicAuthMid = (req, res, next) => {
    try {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ""
        const strauth = Buffer.from(b64auth, "base64").toString()
        const splitIndex = strauth.indexOf(':')
        const login = strauth.substring(0, splitIndex)
        const password = strauth.substring(splitIndex + 1)

        const user = client.query(`
            SELECT * FROM users WHERE email = $1 
            `, [login])
        if(user.rows[0]) {
            if (user.rows[0].password == password) {
                req.user = {login, password}
                return next()
            }
        return req.status(400).send({login: "Failed", message: `Password is incorrect!`})   
        }
            
        return req.status(400).send({login: "Failed", message: `NO user with email "${login}" was found`})   
    } catch (error) {
        res.status(400).send({login: 'Failed', error: error.message/* Sorry, something went wrong */})
    }
}

export const registerMid = (req, res, next) => {
    try {
        const {name, surname, phone, email} = req.body
        
        if (!name) return res.status(400).send({register: 'Failed', message: 'You have to have a name'})
        if (!surname) return res.status(400).send({register: 'Failed', message: 'You have to have a surname'})
        if (phone.length < 13) return res.status(400).send({register: 'Failed', message: 'Phone should be 13 char long'})
        if (!email.includes('@gmail.com')) return res.status(400).send({register: 'Failed', message: 'Email must be like ...@gmail.com'})
        
        return next()
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

export const salesmanAuthMid = async (req, res, next) => {
    try {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ""
        const strauth = Buffer.from(b64auth, "base64").toString()
        const splitIndex = strauth.indexOf(':')
        const login = strauth.substring(0, splitIndex)
        const password = strauth.substring(splitIndex + 1)
        console.log('Im in auth', login, password);
        
        const user = await client.query(`
            SELECT * FROM salesmen WHERE email = $1 
            `, [login])
            
        if(user.rows[0]) {
            if (user.rows[0].password == password) {
                req.user = {login, password}
                return next()
            }
        return res.status(400).send({login: "Failed", message: `Password is incorrect!`})   
        }
            
        return res.status(400).send({login: "Failed", message: `NO user with email "${login}" was found`})   
    } catch (error) {
        res.status(400).send({login: 'Failed', error: error.message/* Sorry, something went wrong */})
    }
}

export const salesmanRegisterMid = (req, res, next) => {

    try {
        const {name, surname, phone, email, password, card_number, rating} = req.body
        
        if (!name) return res.status(400).send({register: 'Failed', message: 'You have to have a name'})
        if (!surname) return res.status(400).send({register: 'Failed', message: 'You have to have a surname'})    
        if (phone.length < 13) return req.status(400).send({register: 'Failed', message: 'Phone should be 13 char long'})
        if (!email.includes('@gmail.com')) return req.status(400).send({register: 'Failed', message: 'Email must be like ...@gmail.com'})
        if (password.length < 3) return req.status(400).send({register: 'Failed', message: 'Password is too weak'})
        if (card_number.length != 16) return req.status(400).send({register: 'Failed', message: 'Card shoud be 16 char long'})
        if (rating < 1 || rating > 5) return req.status(400).send({register: 'Failed', message: 'Rating must be in range 1 and 5'})
        return next()
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}


// write return*** next()