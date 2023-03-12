const { model, Schema } = require('mongoose');

var Cooldown = new Schema({
    GuildID: String,
    UserID: String,
    test: String
})

module.exports = model('Cooldown', Cooldown);