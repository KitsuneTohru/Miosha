const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Hiển Thị Info Của Bot'),
    async execute(interaction) {
        const date = new Date().setTime(1680934500000)
        const time = 1680934500
        const embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`Thông Tin Về Bot: Miosha#5189`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** **[LYG]** v.0.7.0/**[Game Over]** v.0.4.2: Đổi Tên Bot Từ: **LYG Bot** ▶ **Miosha**\nBắt Đầu Category Mới: **Emotions** (Chi Tiết: **/help** Và **/happy**\n<a:LYG_Clock:1084322030331105370> **Last Update:** <t:${time}> (<t:${time}:R>)`)
            .setImage('https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png')
            .setTimestamp(date)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        await interaction.reply({
            embeds: [embed],
        });
    },
};