import dotenv from 'dotenv'
import pg from 'pg'

const { Client } = pg
dotenv.config()

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
})

await client.connect()
 
export default client
// const result = await client.query('SELECT $1::text as name', ['brianc'])
// console.log(result)
 
// await client.end()
