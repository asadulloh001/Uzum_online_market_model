import client from '../db/database.js';

export const isThere = async (table, field, value) => {
        return await client.query(
            `SELECT * FROM ${table} WHERE ${field} = $1`, [value]
        )
}

export const paginate = (data, page = 0, limit = 10) => {
    return data.splice((page-1)*limit, limit)
}

export const getAllFrom = async (table) => {
    return await client.query(`SELECT * FROM ${table}`)
}