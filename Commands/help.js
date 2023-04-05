const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Hiển Thị Sự Trợ Giúp Của Bot Trong Server...'),
    async execute(interaction) {
        //Setup User
        const user = interaction.user.id
        //General Row:
        const outside_row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('commands1')
                    .setLabel('| Commands')
                    .setEmoji('1086172125955633192')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('changelog1')
                    .setLabel('| Changelog')
                    .setEmoji('1087692048280334347')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('faqs1')
                    .setLabel('| FaQs')
                    .setEmoji('1084085930266218556')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('goback1')
                    .setLabel('| Go Back')
                    .setEmoji('1086093232989024407')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            )
        //Command Row
        const command_row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('commands2')
                    .setLabel('| Commands')
                    .setEmoji('1086172125955633192')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('changelog2')
                    .setLabel('| Changelog')
                    .setEmoji('1087692048280334347')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('faqs2')
                    .setLabel('| FaQs')
                    .setEmoji('1084085930266218556')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('goback2')
                    .setLabel('| Go Back')
                    .setEmoji('1086093232989024407')
                    .setStyle(ButtonStyle.Primary)
            )
        //Changelog Row
        const changelog_row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('commands3')
                    .setLabel('| Commands')
                    .setEmoji('1086172125955633192')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('changelog3')
                    .setLabel('| Changelog')
                    .setEmoji('1087692048280334347')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('faqs3')
                    .setLabel('| FaQs')
                    .setEmoji('1084085930266218556')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('goback3')
                    .setLabel('| Go Back')
                    .setEmoji('1086093232989024407')
                    .setStyle(ButtonStyle.Primary)
            )
        //FaQ Row:
        const faq_row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('commands4')
                    .setLabel('| Commands')
                    .setEmoji('1086172125955633192')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('changelog4')
                    .setLabel('| Changelog')
                    .setEmoji('1087692048280334347')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('faqs4')
                    .setLabel('| FaQs')
                    .setEmoji('1084085930266218556')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('goback4')
                    .setLabel('| Go Back')
                    .setEmoji('1086093232989024407')
                    .setStyle(ButtonStyle.Primary)
            )
        //Desc_Row: Trang Chủ
        const desc_row1 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('desc1')
                    .setPlaceholder('Mô Tả Embed Hiện Tại <KHÔNG CÓ CHỨC NĂNG CLICK>')
                    .addOptions(
                        {
                            label: '| Main Page',
                            description: 'Trang Chủ Ở Đây, Hãy Click Nút Bên Trên Để Coi Nhá!',
                            emoji: '<a:LYG_404:1086172141998833684>',
                            value: 'option',
                            default: true,
                        }
                    )
            )
        //Desc_Row: Commands
        const desc_row2 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('desc2')
                    .setPlaceholder('Mô Tả Embed Hiện Tại <KHÔNG CÓ CHỨC NĂNG CLICK>')
                    .addOptions(
                        {
                            label: '| Commands',
                            description: 'Tất Tần Tật Command Của Bot',
                            emoji: '<:LYG_LaylaHmm:1086172125955633192>',
                            value: 'option2',
                            default: true,
                        }
                    )
            )
        //Desc_Row: Changelog
        const desc_row3 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('desc3')
                    .setPlaceholder('Mô Tả Embed Hiện Tại <KHÔNG CÓ CHỨC NĂNG CLICK>')
                    .addOptions(
                        {
                            label: '| Changelog',
                            description: 'Tất Tần Tật Mọi Sự Thay Đổi, Update Của Bot',
                            emoji: '<a:LYG_OkayuLove:1087692048280334347>',
                            value: 'option3',
                            default: true,
                        }
                    )
            )
        //Desc_Row: FaQs
        const desc_row4 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('desc4')
                    .setPlaceholder('Mô Tả Embed Hiện Tại <KHÔNG CÓ CHỨC NĂNG CLICK>')
                    .addOptions(
                        {
                            label: '| FaQs',
                            description: 'Mọi Câu Hỏi Vui Về Con Bot',
                            emoji: '<a:LYG_FubukiWhat:1084085930266218556>',
                            value: 'option4',
                            default: true,
                        }
                    )
            )
        //Embed Trang Chủ
        const time = 1680705300
        const HeadEmbed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: Trang Chủ <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** **[LYG]** v.0.6.0/**[Game Over]** v.0.3.12\n<a:LYG_Clock:1084322030331105370> **Last Update:** <t:${time}> (<t:${time}:R>)\n\n**Click Các Nút Bên Dưới Để Xem Thông Tin Nhá!**\n> <:LYG_LaylaHmm:1086172125955633192> **Commands**\n> <a:LYG_OkayuLove:1087692048280334347> **Changelogs**\n> <a:LYG_FubukiWhat:1084085930266218556> **FaQs**\n\n❌**Link Mời Bot (KHÔNG KHẢ DỤNG)**\n🔗[[Support Server Link 1]](https://discord.gg/HPGXJKzhfW)\n🔗[[Support Server Link 2]](https://discord.gg/vfDWAT7xmy)\n**Ghi Chú: Cả 2 Đều Cần Verify Nhé!!!**\n*(Note: Đang Trong Quá Trình Test Nhá...)*`)
            .setImage('https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png')
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //Embed Commands
        const titlearr = [
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Overall)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Fun Commands)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Info Commands)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Mysc Commands)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (User Commands)** <a:LYG_Sparkle:1084084997398470747>'
        ]
        const descarr = [
            '<a:LYG_FubukiWhat:1084085930266218556> **Chào Mừng Bạn Đến Với Bảng Trợ Giúp Command**\n\n**Hãy Nhấn Nút Bên Dưới Để Coi Chi Tiết Nhá!**\n<a:LYG_TighnariNotes:1090126010571300874> **Lưu Ý:** Desc Ở Slash Command Sẽ Không Chi Tiết Như Trong Này Nhé!',
            '<:LYG_XD:1087375888276000788> **Fun Commands** (Số Lệnh Hiện Có: 4)\n\n> **• /howgay**\nCấu Trúc Lệnh: `/howgay [target] [avgset]`\nCheck Chỉ Số Gay Của Ai Đó\nTrong Đó: `[target]` (Bắt Buộc): `(@user)` Chỉ Mention Người Dùng, `[avgset]` (Bắt Buộc): `(true/false)` Tính Giá Trị Trung Bình (3 Lần) Bật/Tắt\nLƯU Ý: Command Dễ Gây Nghiện, Lạm Dụng Quá Dễ Addiction Và Khó Thoát Ra Lắm, Quạo Ráng Chịu, Đồng Thời Sẽ Có Một Số User Được Bypass Nó Nhá =))\n\n> **• /omikuji**\nCấu Trúc Lệnh: `/omikuji`\nBốc Thẻ Vui Hàng Ngày (Do Cooldown Đang Bị Issue Nên Không Xét Đến "Hàng Ngày")\n\n> **• /coinflip**\nCấu Trúc Lệnh: `/coinflip [facing]`\nDùng Để Tung Đồng Xu\nTrong Đó: `[Facing]` (Bắt Buộc): `(Head/Tail/Stand)` Chọn 1 Trong 3 Giá Trị Trên\n\n> **• /dice**\nCấu Trúc Lệnh: `/dice`\nDùng Để Tung Xúc Xắc (Loại 6 Mặt)',
            '<:LYG_LaylaHmm:1086172125955633192> **Info Commands** (Số Lệnh Hiện Có: 3)\n\n> **• /info**\nCấu Trúc Lệnh: `/info`\nHiển Thị Info Của Bot\n\n> **• /help**\nCấu Trúc Lệnh: `/help`\nHiển Thị Trợ Giúp Của Bot (Bạn Đang Ở Đây)\n\n> **• /ping**\nCấu Trúc Lệnh: `/ping`\nKiểm Tra Độ Trễ Của Bot Trong Server',
            '<:LYG_Error:1087366990160740452> **Mysc Commands** (Số Lệnh Hiện Có: 1)\n\n> **• /test**\nCấu Trúc Lệnh: `/test`\nCâu Lệnh Này Chỉ Dùng Để Test Một Số Chức Năng Từ Chủ Bot Thôi)',
            '<a:LYG_FubukiBorger:975937199486951464> **User Commands** (Số Lệnh Hiện Có: 4)\n\n> **• /avatar**\nCấu Trúc Lệnh: `/avatar [user]`\nLấy Avatar Của Người Dùng (Hoặc Của Bạn)\nTrong Đó: `[user]` (Không Bắt Buộc): `(@user)` Chỉ Người Bạn Muốn Lấy Avatar\n\n> **•/guildavt**\nCấu Trúc Lệnh: `/guildavt [user]`\nTrong Đó: `[user]` (Bắt Buộc): `(@user)` Chỉ User Nào Đó\nDùng Để Lấy Avatar Của User (Nếu User Đó Có Guild Avatar)\n\n> **• /server**\nCấu Trúc Lệnh: `/server`\nHiển Thị Thông Tin Về Server\n\n> **• /user**\nCấu Trúc Lệnh: `/user [name]`\nTrong Đó: `[name]` (Bắt Buộc): `(@user)`: Chỉ Mention Người Dùng\nDùng Để Coi Thông Tin Cơ Bản Của Người Dùng',
        ]
        const colorarr = [
            '#EFFFB3',
            '#F6B3FF',
            '#B3FFF6',
            '#D3FFB3',
            '#F90000',
        ]
        const CmdEmbed = []
        var i, j = 0
        for (i = 0; i < 5; i++) {
            const title = titlearr[i]
            const color = colorarr[i]
            const desc = descarr[i]
            CmdEmbed[i] = new EmbedBuilder()
                .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
                .setColor(color)
                .setTitle(title)
                .setDescription(desc)
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' })
                .setTimestamp()
        }
        //Embed Buttons
        function GetRow(j) {
            const icmdrow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('lpage')
                        .setEmoji('1086297531379613767')
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(j === 0),
                    new ButtonBuilder()
                        .setCustomId('pages')
                        .setLabel(`| Trang: ${j + 1} |`)
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('rpage')
                        .setEmoji('1086297678624854077')
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(j === CmdEmbed.length - 1)
                )
            return icmdrow
        }
        //Embed Changelog 
        const InfoEmbed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: Changelogs <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** **[LYG]** v.0.6.0/**[Game Over]** v.0.3.12: Update Lệnh: **/server**, **/user****\n<a:LYG_Clock:1084322030331105370> **Thời Gian Update:** <t:${time}> (<t:${time}:R>)`)
            .setImage('https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png')
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //Embed FaQ
        const FAQEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: FaQs <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setDescription('<:LYG_LaylaHmm:1086172125955633192> • Người Tạo Bot Là Ai?\n- <@751225225047179324>\n\n<:LYG_LaylaHmm:1086172125955633192> • Từ Đâu Mà Lại Làm Ra Con Bot Này?\n- Ý Tưởng Dựa Trên Pre Release Venti Bot Của <@809259609700302935>\n\n<:LYG_LaylaHmm:1086172125955633192> • Đâu Là Câu Lệnh Dễ Gây Nghiện Nhất?\n- `/howgay`, Ngay Cả Chủ Bot Còn Bị Addicted Mà <:LYG_XD:1087375888276000788>\n\n<:LYG_LaylaHmm:1086172125955633192> • Vậy Con Bot Này Có Thể Cho Vào Server Khác Ngoài 2 Server Này Chứ?\n- Chỉ Có Số Ít Thôi, Nên Link Mời Không Khả Dụng, Và Vì Đây Là Private Bot, Nên Sẽ Là Không Đâu Nhá')
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });

        await interaction.reply({
            embeds: [HeadEmbed],
            components: [outside_row, desc_row1]
        })
        //Click Nút
        const filter = a => a.user.id === user;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 })
        collector.on('collect', async a => {
            if (a.customId === 'commands1' || a.customId === 'commands3' || a.customId === 'commands4') {
                j = 0
                await wait(500)
                await interaction.editReply({
                    embeds: [CmdEmbed[0]],
                    components: [GetRow(j), command_row, desc_row2]
                })
            }
            if (a.customId === 'changelog1' || a.customId === 'changelog2' || a.customId === 'changelog4') {
                await wait(500)
                await interaction.editReply({
                    embeds: [InfoEmbed],
                    components: [changelog_row, desc_row3]
                })
            }
            if (a.customId === 'faqs1' || a.customId === 'faqs2' || a.customId === 'faqs3') {
                await wait(500)
                await interaction.editReply({
                    embeds: [FAQEmbed],
                    components: [faq_row, desc_row4]
                })
            }
            if (a.customId === 'goback2' || a.customId === 'goback3' || a.customId === 'goback4') {
                await wait(500)
                await interaction.editReply({
                    embeds: [HeadEmbed],
                    components: [outside_row, desc_row1]
                })
            }
            if (a.customId === 'lpage' && j >= 0) {
                j--
                await wait(500)
                await interaction.editReply({
                    embeds: [CmdEmbed[j]],
                    components: [GetRow(j), command_row, desc_row2]
                })
            }
            if (a.customId === 'rpage' && j <= CmdEmbed.length) {
                j++
                await wait(500)
                await interaction.editReply({
                    embeds: [CmdEmbed[j]],
                    components: [GetRow(j), command_row, desc_row2]
                })
            }
        })
    }
}