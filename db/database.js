import dotenv from 'dotenv'
import pg from 'pg'

const { Client } = pg
dotenv.config()

export const client = new Client({
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
})

await client.connect()
 
// const result = await client.query('SELECT $1::text as name', ['brianc'])
// console.log(result)
 
// await client.end()
