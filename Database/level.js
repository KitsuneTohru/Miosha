const { model, Schema } = require('mongoose')
    
const LvlSchema = new Schema({
    UserID: {
        type: String,
        required: true,
    },
    GuildID: {
        type: String,
        required: true
    },
    exp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
})

module.exports = model('Level', LvlSchema)