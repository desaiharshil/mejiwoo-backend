require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')

const app = express()

const corsOption = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
};

app.use(cors(corsOption))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.end('hellow')
})

const HomeWeb = require('./Routes/router');

const errorMidelewere = require('./Error/error')

app.use(HomeWeb)

app.use(errorMidelewere)


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("databse connected")
        app.listen(8001, () => {
            console.log("The port Running", 8001)
        })
    })
    .catch(err => {
        console.log(err)
    })