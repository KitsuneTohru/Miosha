const { model, Schema } = require('mongoose')

const AchievementList = new Schema({
    UserID: String,
    //A1 - A3 (Howgay)
    A1: String, //I'm Gay (5*)
    A2: String, //Gigachad (5*)
    A3: String, //WYSI (6*)
    //Omikuji Type 5
    A4: String, //Kitsunezi (6*)
    A5: String, //Server History (6*)
    //A6 - A11 (Rank)
    A6: String, //Lv1 (1*)
    A7: String, //Lv5 (2*)
    A8: String, //Lv10 (3*)
    A9: String, //Lv20 (4*)
    A10: String, //Lv30 (5*)
    A11: String, //Lv40 (6*)
})

module.exports = model('Achievements', AchievementList)