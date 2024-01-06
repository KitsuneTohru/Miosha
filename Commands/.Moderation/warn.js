const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const RolePass = require('../../Utils/rolebypass')
const WarnList = require('../../Database/warnlist')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Cảnh Cáo Người Dùng Nào Đó')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Cảnh Cáo')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Lí Do Cảnh Cáo')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getUser('user')
        var reason = interaction.options.getString('reason')
        if (reason === null) {
            reason = '<:CirnoWhat:1150565251562078249> Không Có Lí Do Nào Cả...'
        }

        const member = await interaction.guild.members.fetch(target.id)
        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        const logchannel = await interaction.guild.channels.fetch('1165537322943643678')

        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const ErrEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`Miosha#5189 - Warn`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Thể Cảnh Cáo ${target} Được Vì Tớ Không Đủ Thẩm Quyền!!!`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const WarnEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`Miosha#5189 - Warn`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_RushiaKnife:977202151480766565> | Đã Cảnh Cáo Người Dùng ${target}\n> **Lí Do Cảnh Cáo:** ${reason}`)
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
                await interaction.editReply({
                    embeds: [WarnEmbed]
                })
                const LogEmbed = new EmbedBuilder()
                    .setColor('Yellow')
                    .setTitle(`Miosha#5189 - Logger`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<:LYG_RushiaKnife:977202151480766565> **__Hành Động: Warn__**\n\n> **Người Dùng:** ${target}\n> **Lí Do Cảnh Cáo:** ${reason}\n> **Người Thực Hiện:** ${interaction.user}`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                logchannel.send({
                    embeds: [LogEmbed]
                })
                WarnList.findOne({ UserID: target.id }, async (err, data) => {
                    if (err) throw err
                    if (!data) {
                        WarnList.create({
                            UserID: target.id,
                            WarnReasons: [reason]
                        })
                    }
                    if (data) {
                       data.WarnReasons.push(reason)
                       data.save()
                    }
                })
            }
        }
    }
}