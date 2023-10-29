const mongoose = require('mongoose')


const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Rights: {
    type: [
      {
        name: String, // Name of the right
        link: String, // Link for the right
        children: [
          {
            name: String,
            link: String,
          },
        ],
      },
    ],
   
  },

  role: {
    type: Number,
    default: 0
  }

}, { timestamps: true })

module.exports = mongoose.model('user', Userschema)