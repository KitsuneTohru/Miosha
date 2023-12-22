const { model, Schema } = require('mongoose')

const AchievementList = new Schema({
    UserID: String,
    //I'm Gay (5*)
    A1: String,
    //Gigachad (5*)
    A2: String,
    //WYSI (6*)
    A3: String,
    //Omikuji Type 5 (Kitsunezi) (6*)
    A4: String,
    //Omikuji Type 5 (Server Entry) (6*)
    A5: String
})

module.exports = model('Achievements', AchievementList)