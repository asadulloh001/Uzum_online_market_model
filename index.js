import express from 'express';
import dotenv from 'dotenv'
import { router, basketRouter, categoryRouter, commentRouter, descriptionRouter, productRouter, salesmenRouter, userRouter } from './routes/indexRoute.js'
import { migrate } from './migrations/db_mig.js';
dotenv.config()
const app = express()
app.use(express.json())

app.use("/api/v1/auth", router)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/baskets", basketRouter)
app.use("/api/v1/descriptions", descriptionRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/salesmen", salesmenRouter)

app.use((error, req, res, next) => {
    if(error) 
        return res.status(400).send({message: "Oops, something went wrong.", error: error})
    
    res.status(404).send({message: "404 PAGE NOT FOUND :("})
})



const port = process.env.PORT
app.listen(port, () => {
    migrate()
    console.log(`Server is running on port ${port}`);
})