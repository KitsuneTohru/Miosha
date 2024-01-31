const { model, Schema } = require('mongoose')

const OmikujiTracker = new Schema({
    GuildID: String,
    Type1: Array,
    Type2: Array,
    Type3: Array,
    Type4: Array,
    Type5: Array,
})

module.exports = model('OmikujiTracker', OmikujiTracker)