const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cd = new Set();
const cdend = new Set();
const cdtime = 10000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Kiểm Tra Thông Tin Của Một User Nào Đó')
        .addUserOption(option =>
            option.setName('name')
                .setDescription('Thông Tin Của Người Dùng Cần Show (Lần Này Thì Bắt Buộc Nhá)')
                .setRequired(true)),
    async execute(interaction) {
        const tuser = interaction.options.getUser('name')
        const user = interaction.options.getMember('name')
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
            if (user) {
                const UserEmbed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Thông Tin Của User**`)
                    .setColor('#FFFFFF')
                    .setDescription(`<a:LYG_Arrow:1093051541667196949> **Tên User:** ${user}\n<a:LYG_Arrow:1093051541667196949> **User ID:** ${user.id}\n<a:LYG_Arrow:1093051541667196949> **Ngày Tạo:** <t:${Math.floor(tuser.createdTimestamp / 1000)}>\n<a:LYG_Arrow:1093051541667196949> **Ngày Tham Gia Server:** <t:${Math.floor(user.joinedTimestamp / 1000)}>`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kitsunezi2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                await interaction.reply({
                    embeds: [UserEmbed]
                });
            }
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
        }
    },
};