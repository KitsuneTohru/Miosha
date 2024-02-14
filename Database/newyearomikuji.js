const { Schema, model } = require('mongoose')

const OmikujiNewYear = new Schema({
    UserID: String,
    Pulls: String
})

module.exports = model('OmikujiNewYear', OmikujiNewYear)