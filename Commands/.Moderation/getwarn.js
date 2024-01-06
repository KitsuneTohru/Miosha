const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const WarnList = require('../../Database/warnlist')
const RolePass = require('../../Utils/rolebypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getwarn')
        .setDescription('Lấy Danh Sách Cảnh Cáo Của Người Dùng Nào Đó')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Lấy Danh Sách Cảnh Cáo')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getUser('user')
        const member = await interaction.guild.members.fetch(target.id)
        const usemem = await interaction.guild.members.fetch(interaction.user.id)

        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const ErrEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`**No Warn Data`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Người Dùng Là ${target} Thì Làm Gì Cảnh Cáo Được Ngay Từ Đầu?`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const NoData = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`**No Warn Data**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Người Dùng Là ${target} Hiện Không Có Lần Cảnh Cáo Nào`)
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
                let WarnCounter = await WarnList.findOne({ UserID: target.id })
                if (!WarnCounter) {
                    return interaction.editReply({
                        embeds: [NoData]
                    })
                } else {
                    const WarnCounter_ = WarnCounter.WarnReasons
                    var result = `<:OrinPolice:1152868958148501534> Số Lần Cảnh Cáo Của Người Dùng: ${target}\n\n`
                    for (var i = 0; i < WarnCounter_.length; i++) {
                        result += `> ${i + 1}. ${WarnCounter_[i]}\n`
                    }
                    if (WarnCounter_.length === 0) {
                        return interaction.editReply({
                            embeds: [NoData]
                        })
                    }
                    const WarnListEmbed = new EmbedBuilder()
                        .setColor('Green')
                        .setTitle(`**Thông Tin Quản Lí**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(result)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    return interaction.editReply({
                        embeds: [WarnListEmbed]
                    })

                }
            }
        }
    }
}