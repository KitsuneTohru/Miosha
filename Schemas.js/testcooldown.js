const { model, Schema } = require('mongoose');

let Cooldown = new Schema({
    GuildID: String,
    UserID: String,
    test: String
})

module.exports = model('Cooldown', Cooldown);