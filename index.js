const express = require('express')
const dbconnection = require('./config/db')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./Routes/authRoutes')

const app = express()

app.use(express.json())
app.use(cors())
require('dotenv').config();

app.use("/api/v1/auth", router);


dbconnection()



PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`.bgGreen)
})