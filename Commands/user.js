const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Kiểm Tra Thông Tin Của Một User Nào Đó'),
    async execute(interaction) {
        await interaction.reply(`Thông Tin User:\nTên Người Dùng: ${interaction.user.username}\nNgày Tham Gia: ${interaction.member.joinedAt}`);
    },
};