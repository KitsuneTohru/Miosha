const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const BanList = require('../../Database/banlist')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unrestrict')
        .setDescription('Gỡ Ban Người Dùng Nào Đó Ở Một Số Lệnh')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Gỡ Ban Lệnh')
                .setRequired(true)),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
        const user = interaction.options.getUser('user')

        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }
        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        if (!usingkey) {
            await interaction.reply({
                embeds: [NoPerm],
            })
        } else {
            let banbool = await BanList.findOne({ UserID: user.id })
            if (!banbool) {
                const NotBannedEmbed = new EmbedBuilder()
                    .setColor('Gold')
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    .setTitle('<:OrinWhat:1146170336119885865> **User Not Found**')
                    .setDescription(`<a:LYG_FububiShake:1129764112004558950> • Người Dùng ${user} Làm Gì Có Bị Ban Đâu Mà Gỡ Ban Lệnh Nhỉ?`)
                    .setTimestamp()
                return interaction.reply({
                    embeds: [NotBannedEmbed]
                })
            } else {
                const UnbanEmbed = new EmbedBuilder()
                    .setColor('DarkGreen')
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    .setTitle('<:YayyShinki:1184437427050381342> **Unbanned From Using Command**')
                    .setDescription(`<a:LYG_FububiShake:1129764112004558950> • Đã Gỡ Ban Sử Dụng Command Cho Người Dùng ${user}`)
                    .setTimestamp()
                banbool.deleteOne({ UserID: user.id })
                return interaction.reply({
                    embeds: [UnbanEmbed]
                })
            }
        }

    }
}