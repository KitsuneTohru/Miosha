const { model, Schema } = require('mongoose')

const RankKey = new Schema({
    UserID: String,
    GuildID: String,
    Key: String,
    RankCardType: String,
})

module.exports = model('RankKey', RankKey)