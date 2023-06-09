const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js')

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
        const target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả, Thẳng Tay Thi Hành Án'

        const member = await interaction.guild.members.fetch(target.id)

        const ErrEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`Miosha#5189 - Ban`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Thể Ban ${target} Được Vì Tớ Không Đủ Thẩm Quyền!!!`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });

        const BanEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`Miosha#5189 - Ban`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<:LYG_RushiaKnife:977202151480766565> | Đã Ban Người Dùng ${target}\n> **Lí Do Ban:** ${reason}`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });   
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