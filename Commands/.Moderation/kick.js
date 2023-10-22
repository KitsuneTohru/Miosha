const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Dùng Để Kick Một Ai Đó Trong Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
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
        const target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả, Thẳng Tay Thi Hành Án'

        const member = await interaction.guild.members.fetch(target.id)
        
        const ErrEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`Miosha#5189 - Kick`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Thể Kick ${target} Được Vì Tớ Không Đủ Thẩm Quyền!!!`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })

        const KickEmbed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle(`Miosha#5189 - Kick`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_RushiaKnife:977202151480766565> | Đã Kick Người Dùng ${target}\n> **Lí Do Kick:** ${reason}`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        
        if (member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({
                embeds: [ErrEmbed]
            })
        } else {
            await member.kick()
            await interaction.reply({
                embeds: [KickEmbed]
            })
        }
    }
}