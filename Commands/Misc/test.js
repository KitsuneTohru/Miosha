const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cd = new Set();
const cdend = new Set();
const cdtime = 100000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command Purpose...'),
    async execute(interaction) {
        const user = interaction.user.id
        const FinalEmbed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`Test`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('Đã Test Lệnh Này Dành Cho Chủ Bot... Và Một Số Người Quan Trọng')
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kitsunezi2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        var check = false
        const userarr2 = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '729671009631862834', '1084992470074531960']
        var check = false
        function checkID(user) {
            var i
            for (i in userarr2) {
                if (user === userarr2[i])
                    check = true
            }
        }
        const cdembed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${user}> Oi! Bạn Phải Chờ Đến <t:${Math.round(cdend[user] / 1000)}> (<t:${Math.round(cdend[user] / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kitsunezi2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        var CDBool = false
        const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '729671009631862834', '1084992470074531960']
        function checkCD(user) {
            var i
            for (i in userarr) {
                if (user === userarr[i])
                    CDBool = true
            }
        }
        checkCD(user)
        if (cd.has(interaction.user.id) && !CDBool) {
            await interaction.reply({
                embeds: [cdembed]
            })
        } else {
            cdend[user] = Date.now()
            cdend[user] = cdend[user] + cdtime
            checkID(user)
            if (check === false) {
                await interaction.reply({
                    content: 'No! Bạn Không Có Quyền Sử Dụng Command Này!',
                })
            }
            else {
                await interaction.reply({
                    embeds: [FinalEmbed],
                    ephemeral: true
                })
            }
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
        }
        console.log(user, ' ', cdend[user])
    }
};