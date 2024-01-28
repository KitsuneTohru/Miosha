const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk')

const cdSchema = require('../../Database/cooldown')
const HappyImg = require('../../Assets/Emo/happyassets')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('happy')
        .setDescription('Bày Tỏ Cảm Xúc: Vui Vẻ'),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        const cdtime = 10000

        const imgarr = HappyImg
        const hrng = Math.floor(Math.random() * imgarr.length) + 1
        const himg = imgarr[hrng]
        
        const HappyEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setDescription(`<:LYG_OkayuYay:1084085932254298122> ${interaction.user} **Đang Vui!!!**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTimestamp()
            .setImage(himg)
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })

        const auser = interaction.user.id
        const CDPassList = BypassList
        function BypassCD(auser) {
            for (var i in CDPassList) {
                if (auser === CDPassList[i]) {
                    return true
                }
            }
            return false
        }
        const Bypass_ = BypassCD(auser)
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDHappy: Date.now()
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDHappy
                console.log(chalk.yellow('[Command: Happy]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)
                if (CDTime > Date.now() && !Bypass_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDHappy = Date.now() + cdtime
                    data.save()
                    await interaction.editReply({
                        embeds: [HappyEmbed]
                    })
                }
            }
        })
    }
}