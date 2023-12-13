const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Đưa Ra Thông Tin Của Server'),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
        const cdtime = 10000
        const owner = await interaction.guild.fetchOwner()
        const ServerEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Thông Tin Của Server**`)
            .setColor('#FFFFFF')
            .setDescription(`<a:LYG_Arrow:1093051541667196949> **Tên Server:** ${interaction.guild.name}\n<a:LYG_Arrow:1093051541667196949> **Server ID:** ${interaction.guild.id}\n<a:LYG_Arrow:1093051541667196949> **Chủ Server:** ${owner}\n<a:LYG_Arrow:1093051541667196949> **Ngày Tạo:** <t:${Math.floor(interaction.guild.createdTimestamp / 1000)}>\n<a:LYG_Arrow:1093051541667196949> **Số Lượng Thành Viên:** ${interaction.guild.memberCount}\n<a:LYG_Arrow:1093051541667196949> **Server Thumbnail:** [Thumbnail_URL](${interaction.guild.iconURL({ dynamic: true, size: 512 })})`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }))
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kitsunezi2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDServer: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDServer
                console.log('[Command: Server]', cduser, CDTime, Date.now())
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
                    data.CDServer = Date.now() + cdtime
                    data.save()
                    await interaction.reply({
                        embeds: [ServerEmbed]
                    })
                }
            }
        })
    }
}
//