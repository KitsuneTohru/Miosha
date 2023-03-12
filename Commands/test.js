const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cooldown = require('../Schemas.js/cooldown.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Cmd Của Bot'),
    async execute(interaction) {
        let user = interaction.user
        let timeout = 3600000
        var a = true
        cooldown.findOne({GuildID: interaction.guild.id, userID: user.id}, async (err, dataTime) => {
            if (dataTime && dataTime.test !== null && timeout - (Date.now()-dataTime.test) > 0) {
                let test = (dataTime.test/1000+timeout/1000).toFixed(0);
                console.log('===================================\nUNIX Thời Gian Khóa CD Test:\n',test,'\nNote: Giá Trị Sẽ Có Thể Lệch Tí...\n===================================')
                const CDEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`<a:LYG_Clock:1084322030331105370> **Đang Trong Thời Gian Cooldown...**`)
                    .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
                    .setDescription(`Bạn Phải Chờ Đến **<t:${test}> (<t:${test}:R>)** Để Có Thể Thực Hiện Tiếp Command Này`)
                    .setTimestamp(Date.now())
                    .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
                await interaction.reply({embeds: [CDEmbed]})
            }
            else {
                a = false
                const WorkEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(`<:LYG_Ayame_YoDayo:942441477055844373> **Bạn Đã Thực Hiện Lệnh...**`)
                    .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
                    .setDescription('Câu Lệnh Đã Thực Hiện Rồi, Ý Kiến Gì Nữa Kekw')
                    .setTimestamp(Date.now())
                    .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
                await interaction.reply({embeds: [WorkEmbed]})

            }
            
            if (dataTime) {
                if(a === false) {
                    dataTime.test = Date.now()
                    dataTime.save()
                    a = true
                }
            }
            else {
                if(a === false) {
                    new cooldown({
                        GuildID: interaction.guild.id,
                        UserID: user.id,
                        test: Date.now()
                    }).save()
                }   
            }
        })
    },
};