const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Tạo Thông Báo Cho Toàn Server Biết (Dưới Channel Nhất Định)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel Bạn Muốn Đăng Thông Báo')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Tiêu Đề Thông Tin Bạn Muốn Thông Báo')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Nội Dung Thông Tin Bạn Muốn Thông Báo')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('imglink')
                .setDescription('Link Ảnh Cần Dùng')
                .setRequired(false)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel')
        const title = interaction.options.getString('title')
        const desc = interaction.options.getString('message')
        var img_url = interaction.options.getString('imglink')
        function xuatkey(img_url) {
            var key
            if (img_url === null) {
                key = false
                return key
            } else if (!img_url.startsWith('https://')) {
                key = false
                return key
            } else {
                key = true
                return key
            }
        }
        if (!xuatkey(img_url)) {
            img_url = 'https://cdn.discordapp.com/attachments/948615835369472064/1137282623165702234/Ban_sao_cua_LYG_-_Banners_20230805_141443_0000.png'
        }
        const Announce_Embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setColor('White')
            .setTitle(title)
            .setDescription(desc)
            .setImage(img_url)
            .setFooter({ text: 'Miosha | ©kitsunezi2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        const id = channel.id
        await interaction.reply({
            content: `Đã Gửi Thông Báo Đến Kênh <#${id}>`,
            ephemeral: true
        })
        channel.send({
            content: `<@&901074521824559125>`,
            embeds: [Announce_Embed]
        })
        console.log(xuatkey(img_url), img_url)
    }
}