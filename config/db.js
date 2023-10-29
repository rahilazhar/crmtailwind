const mongoose = require('mongoose')
const colors = require('colors')



const Connectionstring = process.env.MONGO_URL

const dbconnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://rahilazhar10:rahilazhar@cluster0.9p8296q.mongodb.net/CRMTWO?retryWrites=true&w=majority")
        console.log('Database is Connected'.bgBlue)
    } catch (error) {
        console.log(`Error in Database connection ${error}`.bgRed)
    }
}


module.exports = dbconnection