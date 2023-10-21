const { model, Schema } = require('mongoose')

let cdSchema = new Schema({
    UserID: String, //User ID
//==================================
    //===Utils
    CDRank: String,
    //===Emo
    CDHappy: String, //Happy
    //===Fun
    CDCoinflip: String, //CoinFlip
    CDDice: String, //Dice
    CDHowgay: String, //Howgay
    CDOmikuji: String, //Omikuji
    CDSlot: String, //Slot
    //===Info
    CDPing: String, //Ping
    //===Misc
    CDNumconv: String, //Numconv
    CDPick: String, //Pick
    CDRoll: String, //Roll
    CDTest: String, //Test
    //===User
    CDAvatar: String, //Avatar
    CDGuildAvt: String, //Guildavt
    CDServer: String, //Server
    CDUser: String, //User
})

module.exports = model('cdSchema', cdSchema)