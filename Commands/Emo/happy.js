const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cd = new Set();
const cdend = new Set();
const cdtime = 10000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('happy')
        .setDescription('Bày Tỏ Cảm Xúc: Vui Vẻ'),
    async execute(interaction) {
        const hrng = Math.floor(Math.random() * 12) + 1
        const imgarr = [
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464356108345424/a1Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464356485824582/a2Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464356821385286/a3Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464357194670171/a4Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464357567954955/a5Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464357970624633/a6Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464358348103730/a7Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464358675251221/a8Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464359040172032/a9Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464359438622830/a10Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464385313284196/a11Happy.gif',
            'https://cdn.discordapp.com/attachments/1098462865968611459/1098464385678200852/a12Happy.gif'
        ]
        const himg = imgarr[hrng]
        const HappyEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setDescription(`<:LYG_OkayuYay:1084085932254298122> ${interaction.user} **Đang Vui!!!**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setTimestamp()
            .setImage(himg)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });

        const cduser = interaction.user.id
        var CDBool = false
        function BypassCD(cduser) {
            const CDPassList = ['751225225047179324', '786816081032773662', '927221951439700058', '809259609700302935', '729671009631862834', '888738277044133899', '912514337602666526', '961838901792735243']
            for (var i in CDPassList) {
                if (cduser === CDPassList[i]) {
                    CDBool = true
                }
            }
        }
        BypassCD(cduser)
        const cdembed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(cdend[cduser] / 1000)}> (<t:${Math.round(cdend[cduser] / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        if (cd.has(interaction.user.id) && !CDBool) {
            await interaction.reply({
                embeds: [cdembed]
            })
        } else {
            cdend[cduser] = Date.now()
            cdend[cduser] = cdend[cduser] + cdtime
            await interaction.reply({
                embeds: [HappyEmbed]
            })
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
        }
    },
};