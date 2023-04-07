const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const cd = new Set();
const cdend = new Set();
const cdtime = 15000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Tung Xúc Xắc (Loại 6 Mặt)'),
    async execute(interaction) {
        //Setup Game
        var dicerng, diceresult
        //Setup Embed
        const WaitEmbed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle(`<a:LYG_DiceRoll:1090613205149175941> Game: Tung Xúc Xắc`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setDescription(`<a:LYG_FubukiWhat:1084085930266218556> Đang Tung Xúc Xắc Cho ${interaction.user}... *(Xin Chờ Một Lát...)*`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        dicerng = Math.floor(Math.random() * 6)
        switch (dicerng) {
            case 0:
                {
                    diceresult = '<:LYG_Dice1:1090613349571629096> `1 Nút`'
                    break
                }
            case 1:
                {
                    diceresult = '<:LYG_Dice2:1090613355967959140> `2 Nút`'
                    break
                }
            case 2:
                {
                    diceresult = '<:LYG_Dice3:1090613362292969512> `3 Nút`'
                    break
                }
            case 3:
                {
                    diceresult = '<:LYG_Dice4:1090613368731226263> `4 Nút`'
                    break
                }
            case 4:
                {
                    diceresult = '<:LYG_Dice5:1090613373198155846>  `5 Nút`'
                    break
                }
            case 5:
                {
                    diceresult = '<:LYG_Dice6:1090613378923372544> `6 Nút`'
                    break
                }
            default:
                diceresult = null
        }
        const ResultEmbed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`<a:LYG_DiceRoll:1090613205149175941> Game: Tung Xúc Xắc`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setDescription(`Kết Quả Roll Xúc Xắc Của ${interaction.user} Là: ${diceresult}`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //Reply Đầu:
        const cduser = interaction.user.id
        const cdembed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(cdend[cduser] / 1000)}> (<t:${Math.round(cdend[cduser] / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        if (cd.has(interaction.user.id)) {
            await interaction.reply({
                embeds: [cdembed]
            })
        } else {
            cdend[cduser] = Date.now()
            cdend[cduser] = cdend[cduser] + cdtime
            await interaction.reply({
                embeds: [WaitEmbed],
            })
            await wait(2500)
            await interaction.editReply({
                embeds: [ResultEmbed],
            })
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
            console.log('========================================\nRng Encounter:', dicerng, '\n========================================')
        }
    }
}