const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Dùng Để Gỡ Ban Một Ai Đó Trong Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
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
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getString('user_id')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả'
        
        const ErrEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`Miosha#5189 - Unban`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | ID Người Dùng ${target} Không Tồn Tại, Thì Làm Sao Tớ Gỡ Ban Được?`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })

        const UnbanEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`Miosha#5189 - Unban`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_Yae_Sip:954973168123134002> | Đã Gỡ Ban Người Dùng <@${target}>\n> **Lí Do Gỡ Ban:** ${reason}`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })

        try {
            await interaction.guild.members.unban(target)

            await interaction.reply({
                embeds: [UnbanEmbed]
            })
        } catch (err) {
            await interaction.reply({
                embeds: [ErrEmbed]
            })
        }
    }
}