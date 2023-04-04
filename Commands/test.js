const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command Purpose...'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`Test Command`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setDescription('Hiện Không Có Gì Để Check Cả!')
            .setImage('https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png')
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        await interaction.reply({
            embeds: [embed],
        });
   }
};