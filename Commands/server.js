const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Đưa Ra Thông Tin Của Server'),
    async execute(interaction) {
        await interaction.reply(`Tên Server: ${interaction.guild.name}\nSố Thành Viên: ${interaction.guild.memberCount}`);
    },
};