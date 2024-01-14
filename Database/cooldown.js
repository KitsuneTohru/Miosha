const { model, Schema } = require('mongoose')

let cdSchema = new Schema({
    UserID: String, //User ID
//==================================
    //===Utils
    CDRank: String,
    CDTop: String,
    //===Emo
    CDHappy: String, //Happy
    //===Fun
    CDCoinflip: String, //CoinFlip
    CDDice: String, //Dice
    CDHowgay: String, //Howgay
    CDOmikuji: String, //Omikuji
    CDSlot: String, //Slot
    CDShiprate: String, //Shiprate
    //===Info
    CDPing: String, //Ping
    //===Misc
    CDNumconv: String, //Numconv
    CDPick: String, //Pick
    CDRoll: String, //Roll
    CDTest: String, //Test
    //---Minigame
    CDQuickMath: String, //QuickMath
    //===User
    CDAvatar: String, //Avatar
    CDGuildAvt: String, //Guildavt
    CDServer: String, //Server
    CDUser: String, //User
})

module.exports = model('cdSchema', cdSchema)