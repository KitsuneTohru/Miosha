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
    },
    role: {
        type: Boolean,
        default: false
    },
    background: {
        type: Boolean,
        default: false
    },
    titleicon: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Level', LvlSchema)