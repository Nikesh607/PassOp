const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();
const cors = require('cors')
const connectToDB = require('./DB/db')
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser')

connectToDB();

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,               // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res) =>{
    res.send("hello world")
 })


app.use('/user',userRoutes)


module.exports = app