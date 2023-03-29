const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Hiển Thị Info Của Bot'),
    async execute(interaction) {
        const date = new Date().setTime(1680102300000)
        const embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`Thông Tin Về Bot: LYG Bot#5189`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setDescription('<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** `[LYG]` v.0.5.5/`[Game Over]` v.0.3.7: Tạo Lệnh: `/coinflip`, `/dice` (2 Lệnh Này Trong Giai Đoạn Cơ Bản)\n<a:LYG_Clock:1084322030331105370> **Last Update:** <t:1680102300> (<t:1680102300:R>)')
            .setImage('https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png')
            .setTimestamp(date)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        await interaction.reply({
            embeds: [embed],
        });
    },
};