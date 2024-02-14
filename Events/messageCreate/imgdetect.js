const { Client, Message } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const chalk = require('chalk')
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if (message.channel.id !== '1207402690464841728') return
    console.log(`${chalk.cyanBright('[DEBUG]')} MessageID: ${message.id}`)
    if (message.author.bot) return
    if (message.id === '1207402690464841728') return
    if (message.attachments.size === 1) {
        var msgAttach = message.attachments.first()
        await wait(250)
        if (attachIsImage(msgAttach)) {
            await message.react('1207387176673873991')
            await message.react('1207387198643642530')
        } else {
            await message.delete()
            await wait(500)
            await message.channel.send({
                content: `${message.author} Oi! Sai Format File Rồi! (Tớ Nhận \`png/jpg/jpeg\` Thôi!)`,
            }).then(msg =>
                setTimeout(
                    () => msg.delete(),
                    5000
                ))
            return
        }
    } else {
        if (message.attachments.size < 1) {
            await message.delete()
            await wait(500)
            await message.channel.send({
                content: `${message.author} Oi! Ông Chỉ Chat Thì Còn Lâu Nhá, Muốn Chat Qua <#900755787142545438> Ok?`,
            }).then(msg =>
                setTimeout(
                    () => msg.delete(),
                    5000
                ))
            return
        } else {
            await message.delete()
            await wait(500)
            await message.channel.send({
                content: `${message.author} Oi! 1 Tấm Ảnh 1 Lần Gửi Thôi Ông Ơi, Gửi Lắm Quá Rồi Đó!`,
            }).then(msg =>
                setTimeout(
                    () => msg.delete(),
                    5000
                ))
            return
        }
    }
    function attachIsImage(msgAttach) {
        var type = msgAttach.contentType;
        console.log(`${chalk.cyanBright('[DEBUG]')} ${type}`)
        let key
        if (type === 'image/png' || type === 'image/jpeg') {
            key = true
        } else {
            key = false
        }
        console.log(`${chalk.cyanBright('[DEBUG]')} ${key}`)
        return key
    }
}
