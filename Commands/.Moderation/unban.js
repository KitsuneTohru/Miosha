const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Dùng Để Gỡ Ban Một Ai Đó Trong Server')
        .addStringOption(option =>
            option
                .setName('user_id')
                .setDescription('ID Người Dùng Bạn Muốn Gỡ Ban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Lí Do Mà Bạn Muốn Gỡ Ban (Không Bắt Buộc)')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getString('user_id')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả'

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
            .setColor('Red')
            .setTitle(`Miosha#5189 - Unban`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | ID Người Dùng ${target} Không Tồn Tại, Thì Làm Sao Tớ Gỡ Ban Được?`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const UnbanEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`Miosha#5189 - Unban`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_Yae_Sip:954973168123134002> | Đã Gỡ Ban Người Dùng <@${target}>\n> **Lí Do Gỡ Ban:** ${reason}`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        if (!usingkey) {
            return interaction.editReply({
                embeds: [NoPerm]
            })
        } else {
            try {
                await interaction.guild.members.unban(target)

                await interaction.editReply({
                    embeds: [UnbanEmbed]
                })
                const LogEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(`Miosha#5189 - Logger`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<:LYG_Yae_Sip:954973168123134002> **__Hành Động: Gỡ Ban__**\n\n> **ID Người Dùng:** ${target}\n> **Lí Do Gỡ Ban:** ${reason}\n> **Người Thực Hiện:** ${interaction.user}`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                logchannel.send({
                    embeds: [LogEmbed]
                })
            } catch (err) {
                await interaction.editReply({
                    embeds: [ErrEmbed]
                })
            }
        }
    }
}