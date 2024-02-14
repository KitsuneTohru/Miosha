const { Client, Message } = require('discord.js')
const chalk = require('chalk')
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {

    if (message.author.bot) return
    if (message.guild.id !== '900742301373042809') return
    if (message.member.roles.cache.has('900747529384247336')) return

    const mentioned = message.mentions.users.first()
    //console.log(chalk.blueBright('[DEBUG] ') + mentioned)
    if (mentioned === undefined) {
        return
    } else {
        const member = await message.guild.members.fetch(mentioned)
        const status = member.presence.status || 'offline'
        console.log(`${chalk.blueBright('[DEBUG]')} ${member.user.username}'s Status: ${status}`)
        if (member.roles.cache.has('900747529384247336') && status === 'dnd') {
            message.channel.send(`<:MioYamero:1153319903441461319> ${message.member}, Oi! Bạn Ping Một Người Trong \`PCB Team\` (${member.user.username}) Thế Này Lúc Họ Bận Hay AFK... Nếu Họ Cáu Thì Bạn Tính Sao?`)
        }
        if (member.roles.cache.has('900747529384247336') && status === 'offline') {
            message.channel.send(`<:MioYamero:1153319903441461319> ${message.member}, Oi! Bạn Ping Một Người Trong \`PCB Team\` (${member.user.username}) Thế Này Lúc Họ Bận Hay AFK... Nếu Họ Cáu Thì Bạn Tính Sao?`)
        }
    }
}