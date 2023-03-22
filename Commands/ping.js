const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Kiểm Tra Ping Trong Server'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`<a:LYG_Ping:900775951317737473> **Kiểm Tra Ping Trong Server...**`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setDescription(`Độ Trễ Của Bot Trong Server Là **${interaction.guild.name}** Là **${interaction.createdTimestamp - Date.now()}**ms`)
            .setTimestamp(Date.now())
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        await interaction.reply({embeds: [embed]});
    },
};