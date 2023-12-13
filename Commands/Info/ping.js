const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Kiểm Tra Ping Trong Server'),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
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
                console.log('[Command: Ping]', cduser, CDTime, Date.now())
                const embed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`<a:LYG_Ping:900775951317737473> **Kiểm Tra Ping Trong Server...**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`Độ Trễ Của Bot Trong Server **${interaction.guild.name}** Là **${Math.abs(Date.now() - interaction.createdTimestamp)}**ms`)
                    .setTimestamp(Date.now())
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
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
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                    await interaction.reply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDPing = Date.now() + cdtime
                    data.save()
                    await interaction.reply({ embeds: [embed] })
                }
            }
        })
    }
}
