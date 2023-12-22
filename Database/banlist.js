const { model, Schema } = require('mongoose')

const BanList = new Schema({
    UserID: String,
    Key: Boolean,
    Time: String
})

module.exports = model('banlist', BanList)