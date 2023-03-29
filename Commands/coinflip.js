const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Tung Đồng Xu Vui (Có 3 Trường Hợp Nhá)'),
    async execute(interaction) {
        //Setup Game
        var colorx, descx, coinrng
        const headchar = '`[Head]`'
        const tailchar = '`[Tail]`'
        const specialchar = '`[Special]`'
        const special = '<:LYG_higod:1086172130254798858> **Thưa Ngài, Ngài Đã Vào Được Coinflip HÀNG HIẾM NHẤT `1/6000` Đấy Ạ**'
        //Setup Embed
        const WaitEmbed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle(`<a:LYG_cflip:1090615324551942225> Game: Tung Xu`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setDescription(`<a:LYG_FubukiWhat:1084085930266218556> Đang Tung Xu Cho ${interaction.user}... *(Xin Chờ Một Lát...)*`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        coinrng = Math.random() * 6.001
        coinrng = (Math.floor(coinrng * 1000) / 1000).toFixed(3)
        if(coinrng <= 2.999){
            colorx = '#09FF00'
            descx = `**Kết Quả Tung Xu Của ${interaction.user}:** <:LYG_chead:1090615333498392680> ${headchar}`
        }
        else if(coinrng >= 3.001){
            colorx = '#CF0000'
            descx = `**Kết Quả Tung Xu Của ${interaction.user}:** <:LYG_ctail:1090615312690466847> ${tailchar}`
        }
        else{
            colorx = '#00C1FF'
            descx = `**Kết Quả Tung Xu Của ${interaction.user}:** <a:LYG_404:1086172141998833684> ${specialchar}\n> **Note:** ${special}`
        }
        const ResultEmbed = new EmbedBuilder()
            .setColor(colorx)
            .setTitle(`<a:LYG_cflip:1090615324551942225> Game: Tung Xu`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setDescription(descx)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        //Reply Đầu:
        await interaction.reply({
            embeds: [WaitEmbed],
        })
        await wait(2500)
        await interaction.editReply({
            embeds: [ResultEmbed],
        })
        console.log('========================================\nRng Encounter:', coinrng, '\n========================================')
    }
}