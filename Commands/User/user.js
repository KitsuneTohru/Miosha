const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Kiểm Tra Thông Tin Của Một User Nào Đó')
        .addUserOption(option =>
            option.setName('name')
                .setDescription('Thông Tin Của Người Dùng Cần Show (Lần Này Thì Bắt Buộc Nhá)')
                .setRequired(true)),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
        const cdtime = 10000
        const tuser = interaction.options.getUser('name')
        const user = interaction.options.getMember('name')
        const auser = interaction.user.id
        function BypassCD(auser) {
            const CDPassList = BypassList
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
                    CDUser: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDUser
                console.log('[Command: User]', cduser, CDTime, Date.now())
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
                    data.CDUser = Date.now() + cdtime
                    data.save()
                    if (user) {
                        const UserEmbed = new EmbedBuilder()
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Thông Tin Của User**`)
                            .setColor('#FFFFFF')
                            .setDescription(`<a:LYG_Arrow:1093051541667196949> **Tên User:** ${user}\n<a:LYG_Arrow:1093051541667196949> **User ID:** ${user.id}\n<a:LYG_Arrow:1093051541667196949> **Ngày Tạo:** <t:${Math.floor(tuser.createdTimestamp / 1000)}>\n<a:LYG_Arrow:1093051541667196949> **Ngày Tham Gia Server:** <t:${Math.floor(user.joinedTimestamp / 1000)}>`)
                            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                        await interaction.reply({
                            embeds: [UserEmbed]
                        });
                    }
                }
            }
        })
    }
}
