const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Hiển Thị Info Của Bot'),
    async execute(interaction) {
        const user = interaction.user.id
        const time = 1702300500
        const date = new Date().setTime(Number(time) * 1000)
        const CreditButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('credit1')
                    .setLabel('| Miosha - Credits')
                    .setEmoji('1087692048280334347')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('credit2')
                    .setLabel('| Miosha - Changelog')
                    .setEmoji('1086172116916912198')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            )
        const ChangelogButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('credit1')
                    .setLabel('| Miosha - Credits')
                    .setEmoji('1087692048280334347')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('credit2')
                    .setLabel('| Miosha - Changelog')
                    .setEmoji('1086172116916912198')
                    .setStyle(ButtonStyle.Secondary)
            )
        const credit_embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`Miosha#5189 - Credits Page`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('**```\nCẢM ƠN RẤT NHIỀU VÌ SỰ ĐÓNG GÓP CỦA NHỮNG NGƯỜI DƯỚI ĐÂY!!!```**\n> <a:LYG_Fubuki_Chill:903085553145249822> **• Contributor**\n- <@751225225047179324>\n- <@809259609700302935>\n- <@892054339072438303>\n\n> <:LYG_FubukiMoney:1096296266822062080> **• Sponsor**\n- <@888738277044133899>\n- <@912514337602666526>\n- <a:LYG_LoadSlot:1087377575107645569>\n\n> <a:LYG_OkayuLove:1087692048280334347> **• Special Thanks**\n- <@961838901792735243>\n- <a:LYG_LoadSlot:1087377575107645569>')
            .setImage('https://cdn.discordapp.com/attachments/948615835369472064/1096299975530524703/Miosha_-_Credits.png')
            .setTimestamp(date)
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })

        const changelog_embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`Thông Tin Về Bot: Miosha#5189`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** v0.11.0\n> <:Koishi_cry:1183758344922603592> **Server __Game Over__ Đã Không Còn Hỗ Trợ Nữa...**\n> <:JustOrin:1156221079988215879> Tối Ưu Hóa Khá Nhiều Mặt Về Con Bot...\n1. Ranking\n2. Thuật Toán Của Một Số Command\n3. Thêm Một Số Lệnh Cho Bot\n<a:LYG_Butterfly:1084085919210012722> **Tiến Độ:** ▰▰▰▰▰▰▰▰▱▱ 80%\n<a:LYG_Clock:1084322030331105370> **Last Update:** <t:${time}> (<t:${time}:R>)`)
            .setImage('https://cdn.discordapp.com/attachments/948615835369472064/1096301056188760084/Miosha_-_Info.png')
            .setTimestamp(date)
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        await interaction.reply({
            embeds: [changelog_embed],
            components: [CreditButton]
        });
        const filter = a => a.user.id === user;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 })
        collector.on('collect', async a => {
            if (a.customId === 'credit1') {
                await interaction.editReply({
                    embeds: [credit_embed],
                    components: [ChangelogButton]
                })
            }
            if (a.customId === 'credit2') {
                await interaction.editReply({
                    embeds: [changelog_embed],
                    components: [CreditButton]
                })
            }
        })
    },
};