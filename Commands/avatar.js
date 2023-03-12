const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Lấy Avatar URL Của Người Dùng Bạn Chọn, Hoặc Avatar Của Bạn')
        .addUserOption(option => option.setName('user').setDescription('Avatar Của Người Dùng Cần Show')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) return interaction.reply(`Avatar Của ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`);
        return interaction.reply(`Avatar Của Bạn: ${interaction.user.displayAvatarURL()}`);
    },    
};