import express from 'express';
import dotenv from 'dotenv'
import { authRouter } from './routes/indexRoute.js'

dotenv.config()
const app = express()
app.use(express.json())

app.use("/api/v1", authRouter)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

