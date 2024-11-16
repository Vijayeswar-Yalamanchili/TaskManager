import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRoutes from '../src/routes/indexRoutes.js'
import db from '../src/config/db.js'

dotenv.config()

const port = process.env.PORT

// middlewares
const app = express()
app.use(cors({
    // origin : process.env.CLIENT_URL,
    origin : 'http://localhost:5173',
    methods : 'GET, POST, PUT,DELETE',
    credentials : true
}));
app.use(express.json())
app.use(indexRoutes)

app.listen(port, ()=> console.log(`App listening to ${port}`))