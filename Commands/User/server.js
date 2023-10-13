const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cd = new Set();
const cdend = new Set();
const cdtime = 10000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Đưa Ra Thông Tin Của Server'),
    async execute(interaction) {
        const owner = await interaction.guild.fetchOwner()
        const ServerEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Thông Tin Của Server**`)
            .setColor('#FFFFFF')
            .setDescription(`<a:LYG_Arrow:1093051541667196949> **Tên Server:** ${interaction.guild.name}\n<a:LYG_Arrow:1093051541667196949> **Server ID:** ${interaction.guild.id}\n<a:LYG_Arrow:1093051541667196949> **Chủ Server:** ${owner}\n<a:LYG_Arrow:1093051541667196949> **Ngày Tạo:** <t:${Math.floor(interaction.guild.createdTimestamp / 1000)}>\n<a:LYG_Arrow:1093051541667196949> **Số Lượng Thành Viên:** ${interaction.guild.memberCount}\n<a:LYG_Arrow:1093051541667196949> **Server Thumbnail:** [Thumbnail_URL](${interaction.guild.iconURL({ dynamic: true, size: 512, extension: 'png' })})`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }))
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kitsunezi2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
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
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(cdend[cduser] / 1000)}> (<t:${Math.round(cdend[cduser] / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kitsunezi2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        if (cd.has(interaction.user.id) && !CDBool) {
            await interaction.reply({
                embeds: [cdembed]
            })
        } else {
            cdend[cduser] = Date.now()
            cdend[cduser] = cdend[cduser] + cdtime
            await interaction.reply({
                embeds: [ServerEmbed]
            })
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
        }
    },
};