const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk')

const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkalive')
        .setDescription('Kiểm Tra Thông Số Của Bot Trong Server'),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        await interaction.deferReply()
        const cdtime = 5000

        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDPing: Date.now()
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDPing
                console.log(chalk.yellow('[Command: Checkalive]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)

                let totalSeconds = (interaction.client.uptime / 1000)
                let days = Math.floor(totalSeconds / 86400)
                totalSeconds %= 86400
                let hours = Math.floor(totalSeconds / 3600)
                totalSeconds %= 3600
                let minutes = Math.floor(totalSeconds / 60)
                let seconds = Math.floor(totalSeconds % 60)
                if (minutes < 10) {
                    minutes = `0${minutes}`
                }
                if (seconds < 10) {
                    seconds = `0${seconds}`
                }

                const embed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`<a:LYG_Ping:900775951317737473> **Kiểm Tra Thông Số Của Bot Trong Server...**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`> <:JustOrin:1156221079988215879> Server: **${interaction.guild.name}**\n\n> <a:LYG_Loading:900784653701627925> Độ Trễ: **${interaction.client.ws.ping}**ms\n> <:youmuIrritated:1167060667929460800> Uptime: **${days}**d **${hours}**h **${minutes}**m **${seconds}**s`)
                    .setTimestamp(Date.now())
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                const auser = interaction.user.id
                function BypassCD(auser) {
                    const CDPassList = ['751225225047179324', '786816081032773662', '927221951439700058', '809259609700302935', '892054339072438303', '888738277044133899', '912514337602666526', '961838901792735243']
                    for (var i in CDPassList) {
                        if (auser === CDPassList[i]) {
                            return true
                        }
                    }
                    return false
                }
                const Bypass_ = BypassCD(auser)
                if (CDTime > Date.now() && !Bypass_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDPing = Date.now() + cdtime
                    data.save()
                    await interaction.editReply({ embeds: [embed] })
                }
            }
        })
    }
}
