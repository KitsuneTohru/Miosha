const { model, Schema } = require('mongoose')

const WarnList = new Schema({
    UserID: String,
    WarnReasons: Array,
})

module.exports = model('WarnList', WarnList)