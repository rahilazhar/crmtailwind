const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  spacing: {
    type: Boolean,
    default: false,
  },
  submenue: {
    type: Boolean,
    default: false,
  },
  submenueitems: {
    type: [MenuSchema],
  },
}, { timestamps: true })

module.exports = mongoose.model('Menu', MenuSchema)