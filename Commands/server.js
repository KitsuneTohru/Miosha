const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Đưa Ra Thông Tin Của Server'),
    async execute(interaction) {
        const owner = await interaction.guild.fetchOwner()
        const ServerEmbed = new EmbedBuilder()
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Thông Tin Của Server**`)
            .setColor('#FFFFFF')
            .setDescription(`<a:LYG_Arrow:1093051541667196949> **Tên Server:** ${interaction.guild.name}\n<a:LYG_Arrow:1093051541667196949> **Server ID:** ${interaction.guild.id}\n<a:LYG_Arrow:1093051541667196949> **Chủ Server:** ${owner}\n<a:LYG_Arrow:1093051541667196949> **Ngày Tạo:** <t:${Math.floor(interaction.guild.createdTimestamp/1000)}>\n<a:LYG_Arrow:1093051541667196949> **Số Lượng Thành Viên:** ${interaction.guild.memberCount}\n<a:LYG_Arrow:1093051541667196949> **Server Thumbnail:** [Thumbnail_URL](${interaction.guild.iconURL({dynamic: true, size: 512})})`)
            .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 512}))
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });

        await interaction.reply({
            embeds: [ServerEmbed]
        });
    },
};