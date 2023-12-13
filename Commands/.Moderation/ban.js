const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Dùng Để Ban Một Ai Đó Trong Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Người Dùng Bạn Muốn Ban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Lí Do Mà Bạn Muốn Ban (Không Bắt Buộc)')
                .setRequired(false)),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả, Thẳng Tay Thi Hành Án'

        const member = await interaction.guild.members.fetch(target.id)
        
        const ErrEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`Miosha#5189 - Ban`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Thể Ban ${target} Được Vì Tớ Không Đủ Thẩm Quyền!!!`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })

        const BanEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`Miosha#5189 - Ban`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_RushiaKnife:977202151480766565> | Đã Ban Người Dùng ${target}\n> **Lí Do Ban:** ${reason}`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })

        if (member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({
                embeds: [ErrEmbed]
            })
        } else {
            await member.ban()
            await interaction.reply({
                embeds: [BanEmbed]
            })
        }
    }
}