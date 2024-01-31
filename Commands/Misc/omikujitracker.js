const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const FooterEmbeds = require('../../Utils/embed')
const OmikujiTracker = require('../../Database/omikujitracking')
const Type1Entries = require('../../Assets/Omikuji/type1')
const Type2Entries = require('../../Assets/Omikuji/type2')
const Type3Entries = require('../../Assets/Omikuji/type3')
const Type4Entries = require('../../Assets/Omikuji/type4')
const Type5Entries = require('../../Assets/Omikuji/type5')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('omikujitracker')
        .setDescription('Xem Số Lần Rút Thẻ Từ Lệnh /omikuji'),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        OmikujiTracker.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                const NoData = new EmbedBuilder()
                    .setColor('DarkGreen')
                    .setTitle(`**No Data**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Server ${interaction.guild.name} Hiện Tại Không Có Tí Dữ Liệu Nào Cả!`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                await interaction.editReply({
                    embeds: [NoData]
                })
            }
            if (data) {
                let desc = `## <a:OrinPopcorn:1146170440738406572> **Server:** ${interaction.guild.name} \`(${interaction.guild.id})\``
                const Types = [
                    data.Type5,
                    data.Type4,
                    data.Type3,
                    data.Type2,
                    data.Type1
                ]
                const CardName = [
                    Type5Entries[3],
                    Type4Entries[2],
                    Type3Entries[2],
                    Type2Entries[1],
                    Type1Entries[1]
                ]
                const EmojiType = [
                    '<:5_s:1193595526097145906>',
                    '<:4_s:1193595536666804306>',
                    '<:3_s:1193595623883157534>',
                    '<:2_s:1193596744685060127>',
                    '<:1_s:1193597415945678988>'
                ]
                
                for (var i = 0; i < Types.length; i++) {
                    let tdesc = `\n\n> ${EmojiType[i]} **Type ${Types.length - i}**`
                    var s = 0
                    let PreDesc = ''
                    for (var j = 0; j < Types[i].length; j++) {
                        s += Number(Types[i][j])
                        PreDesc += `- ${CardName[i][j]}: \`(${Types[i][j]})\`\n`
                        if (j === Types[i].length - 1) {
                            desc += `${tdesc} **\`(${s})\`**\n\n${PreDesc}`
                        }
                    }
                }
                const TrackerEmbed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`**Miosha - Check Số Lần Rút Thẻ Omikuji Ở Server**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`${desc}`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

                await interaction.editReply({
                    embeds: [TrackerEmbed]
                })
            }
        })
    }

}