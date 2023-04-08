const { SlashCommandBuilder, EmbedBuilder, Attachment, AttachmentBuilder } = require('discord.js');
const cd = new Set();
const cdend = new Set();
const cdtime = 10000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('happy')
        .setDescription('Bày Tỏ Cảm Xúc: Vui Vẻ'),
    async execute(interaction) {
        const hrng = Math.floor(Math.random() * 12) + 1
        const himgf = new AttachmentBuilder(`Assets/Emotions/Happy/a${hrng}Happy.gif`)
        const himge = `attachment://a${hrng}Happy.gif`
        const HappyEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setDescription(`<:LYG_OkayuYay:1084085932254298122> ${interaction.user} **Đang Vui!!!**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setTimestamp()
            .setImage(himge)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });

        const cduser = interaction.user.id
        const cdembed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
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
                embeds: [HappyEmbed],
                files: [himgf]
            })
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
        }
    },
};