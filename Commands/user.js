const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Kiểm Tra Thông Tin Của Một User Nào Đó')
        .addUserOption(option =>
            option.setName('name')
                .setDescription('Thông Tin Của Người Dùng Cần Show (Lần Này Thì Bắt Buộc Nhá)')
                .setRequired(true)),
    async execute(interaction) {
        const tuser = interaction.options.getUser('name')
        const user = interaction.options.getMember('name')
        if (user) {
            const UserEmbed = new EmbedBuilder()
                .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
                .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Thông Tin Của User**`)
                .setColor('#FFFFFF')
                .setDescription(`<a:LYG_Arrow:1093051541667196949> **Tên User:** ${user}\n<a:LYG_Arrow:1093051541667196949> **User ID:** ${user.id}\n<a:LYG_Arrow:1093051541667196949> **Ngày Tạo:** <t:${Math.floor(tuser.createdTimestamp / 1000)}>\n<a:LYG_Arrow:1093051541667196949> **Ngày Tham Gia Server:** <t:${Math.floor(user.joinedTimestamp / 1000)}>`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setTimestamp()
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
            await interaction.reply({
                embeds: [UserEmbed]
            });
        }
    },
};