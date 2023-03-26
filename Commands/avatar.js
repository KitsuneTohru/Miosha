const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Lấy Avatar URL Của Người Dùng Bạn Chọn, Hoặc Avatar Của Bạn')
        .addUserOption(option => option.setName('user').setDescription('Avatar Của Người Dùng Cần Show')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if(user){
        const user_embed = new EmbedBuilder()
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Avatar Displayer**`)
            .setDescription(`[Avatar URL](${user.displayAvatarURL({dynamic: true})}) **(User: ${user})**`)
            .setColor('Blue')
            .setImage(`${user.displayAvatarURL({dynamic: true, size: 512})}`)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        await interaction.reply({
                embeds: [user_embed]
            });
        }
        else {
        const your_embed = new EmbedBuilder()
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Avatar Displayer**`)
            .setDescription(`[Avatar URL](${interaction.user.displayAvatarURL({dynamic: true})}) **(Bạn: ${interaction.user})**`)
            .setColor('Red')
            .setImage(`${interaction.user.displayAvatarURL({dynamic: true,size: 512})}`)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        await interaction.reply({
                embeds: [your_embed]
            });
        }     
    }
}