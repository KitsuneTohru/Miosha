const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Lấy Avatar URL Của Người Dùng Bạn Chọn, Hoặc Avatar Của Bạn')
        .addUserOption(option => option.setName('user').setDescription('Avatar Của Người Dùng Cần Show')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const user_embed = new EmbedBuilder()
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Avatar Của** ${user}`)
            .setDescription(`[User Avatar URL](${user.displayAvatarURL({dynamic: true})})`)
            .setColor('Blue')
            .setImage(`${user.displayAvatarURL({dynamic: true})}`)
            .seFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        const your_embed = new EmbedBuilder()
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Avatar Của Bạn`)
            .setDescription(`[Avatar URL Của Bạn](${interaction.user.displayAvatarURL({dynamic: true})})`)
            .setColor('Blue')
            .setImage(`${interaction.user.displayAvatarURL({dynamic: true})}`)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
 
        if (user) 
            return interaction.reply({
                embeds: [user_embed]
            });
        return interaction.reply({
            embeds: [your_embed]
        });
    },    
};