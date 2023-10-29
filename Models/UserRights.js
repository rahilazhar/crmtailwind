const mongoose = require('mongoose')

const Userrights = new mongoose.Schema({
    name: String,
    link: String,
    children: [
        {
            name: String,
            link: String
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('userrights', Userrights)
