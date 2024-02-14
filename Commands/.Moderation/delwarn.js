const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const WarnList = require('../../Database/warnlist')
const RolePass = require('../../Utils/rolebypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delwarn')
        .setDescription('Xóa Cảnh Cáo (1 Hoặc Nhiều) Của Người Dùng Nào Đó')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Xóa Cảnh Cáo')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('pos')
                .setDescription('Vị Trí Của Lần Cảnh Cáo')
                .setRequired(true)
                .setMinValue(1)),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getUser('user')
        var pos = interaction.options.getInteger('pos')

        const member = await interaction.guild.members.fetch(target.id)
        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        const logchannel = await interaction.guild.channels.fetch('1165537322943643678')

        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const ErrEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`**No Warn Data`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Người Dùng Là ${target} Thì Làm Gì Cảnh Cáo Được Ngay Từ Đầu?`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        var key = false
        const PassList = RolePass
        for (var i = 0; i < PassList.length; i++) {
            if (member.roles.cache.has(PassList[i])) {
                key = true
                break
            }
        }

        if (!usingkey) {
            return interaction.editReply({
                embeds: [NoPerm]
            })
        } else {
            if (key) {
                return interaction.editReply({
                    embeds: [ErrEmbed]
                })
            } else {
                WarnList.findOne({ UserID: target.id }, async (err, data) => {
                    if (err) throw err
                    if (!data) {
                        const NoData = new EmbedBuilder()
                            .setColor('Green')
                            .setTitle(`**No Warn Data**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Người Dùng Là ${target} Hiện Không Có Lần Cảnh Cáo Nào`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        return interaction.editReply({
                            embeds: [NoData]
                        })
                    }
                    if (data) {
                        const WarnCounter_ = data.WarnReasons
                        if (pos - 1 >= WarnCounter_.length) {
                            const OverData = new EmbedBuilder()
                                .setColor('Yellow')
                                .setTitle(`**Quá Giới Hạn**`)
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Nhập Số Nằm Ngoài Số Lượng Warn Của Người Dùng ${target} Rồi!`)
                                .setTimestamp()
                                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            return interaction.editReply({
                                embeds: [OverData]
                            })
                        } else {
                            const Deleted = new EmbedBuilder()
                                .setColor('Green')
                                .setTitle(`**Đã Xóa Cảnh Cáo**`)
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                .setDescription(`<:JustOrin:1156221079988215879> Đã Xóa Cảnh Cáo Cho Người Dùng: ${target}\nNội Dung Lí Do Cảnh Cáo Khi Xóa: ${WarnCounter_[pos - 1]}`)
                                .setTimestamp()
                                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            await interaction.editReply({
                                embeds: [Deleted]
                            })
                            const LogEmbed = new EmbedBuilder()
                                .setColor('Green')
                                .setTitle(`Miosha#5189 - Logger`)
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                .setDescription(`<:JustOrin:1156221079988215879>  **__Hành Động: Xóa Cảnh Cáo__**\n\n> **Người Dùng:** ${target}\n> **Nội Dung Cảnh Cáo Khi Xóa:** ${WarnCounter_[pos - 1]}\n> **Người Thực Hiện:** ${interaction.user}`)
                                .setTimestamp()
                                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            logchannel.send({
                                embeds: [LogEmbed]
                            })
                            data.WarnReasons.splice(pos - 1, 1)
                            data.save()
                        }
                    }
                })
            }
        }
    }
}