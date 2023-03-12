const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Kiểm Tra Ping Bằng Cách Đưa Về Câu Trả Lời "Pong!"'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};