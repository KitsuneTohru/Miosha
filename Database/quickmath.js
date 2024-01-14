const { model, Schema } = require('mongoose')

const QuickMathDb = new Schema({
    UserID: String,
    GameKey: String,
    Level: String,
    Score: String,
})

module.exports = model('QuickMathDb', QuickMathDb)