const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const RolePass = require('../../Utils/rolebypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Dùng Để Kick Một Ai Đó Trong Server')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Người Dùng Bạn Muốn Kick')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Lí Do Mà Bạn Muốn Kick (Không Bắt Buộc)')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả, Thẳng Tay Thi Hành Án'

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
            .setTitle(`Miosha#5189 - Kick`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Thể Kick ${target} Được Vì Tớ Không Đủ Thẩm Quyền!!!`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const KickEmbed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle(`Miosha#5189 - Kick`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_RushiaKnife:977202151480766565> | Đã Kick Người Dùng ${target}\n> **Lí Do Kick:** ${reason}`)
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
                await member.kick()
                await interaction.editReply({
                    embeds: [KickEmbed]
                })
                const LogEmbed = new EmbedBuilder()
                    .setColor('Orange')
                    .setTitle(`Miosha#5189 - Logger`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<:LYG_RushiaKnife:977202151480766565> **__Hành Động: Kick__**\n\n> **Người Dùng:** ${target}\n> **Lí Do Kick:** ${reason}\n> **Người Thực Hiện:** ${interaction.user}`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                logchannel.send({
                    embeds: [LogEmbed]
                })
            }
        }
    }
}