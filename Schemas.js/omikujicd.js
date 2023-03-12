const { model, Schema } = require('mongoose');

let OmikujiCD = new Schema({
    GuildID: String,
    UserID: String,
    omikuji: String
})

module.exports = model('OmikujiCD', OmikujiCD);