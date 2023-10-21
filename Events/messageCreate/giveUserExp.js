const { Client, Message, EmbedBuilder } = require('discord.js')
const Level = require('../../Database/level')
const LvlCalc = require('../../Utils/lvlcalc')
const cd = new Set()

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const channel = client.channels.cache.get('900760973953093664')
    if (message.guild.id !== '900742301373042809' || message.author.bot || cd.has(message.author.id)) return
    if ((message.content.length) <= 1) return


    const xpToGive = Math.floor(Math.random() * 25) + 1
    const query = {
        UserID: message.author.id,
        GuildID: message.guild.id
    }
    try {
        const level = await Level.findOne(query)

        if (level) {
            level.exp += xpToGive
            level.total += xpToGive

            if (level.exp > LvlCalc(level.level)) {
                level.exp = level.exp - LvlCalc(level.level)
                level.level += 1
                const LvlUpEmbed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`**Server Ranking - Level Up**`)
                    .setDescription(`**<:LYG_MioAwoo:942060912351772774> ${message.member}** Level Up!!!\n> <:LYG_MioWink:1086172116916912198> Cấp Bậc Hiện Tại Của Bạn: **${level.level - 1} >>> ${level.level}**`)
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                channel.send({ embeds: [LvlUpEmbed] })
            }
            await level.save().catch((e) => {
                console.log(`Lỗi Khi Update Level: ${e}`)
                return
            })
            cd.add(message.author.id)
            setTimeout(() => {
                cd.delete(message.author.id)
            }, 30 * 1000)
        }
        //if (!level)
        else {
            const newLevel = new Level({
                UserID: message.author.id,
                GuildID: message.guild.id,
                exp: xpToGive,
                total: xpToGive
            })
            await newLevel.save()
            cd.add(message.author.id)
            setTimeout(() => {
                cd.delete(message.author.id)
            }, 30 * 1000)
        }
    } catch (error) {
        console.log(`Lỗi Khi Ném Exp: ${error}`)
    }
}