const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const HelpCmdAssets = require('../../Assets/Help/helpcmdassets');
const { title } = require('node:process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Hiển Thị Sự Trợ Giúp Của Bot Trong Server...'),
    async execute(interaction) {
        //Setup User
        const user = interaction.user.id
        //Desc_Row: Trang Chủ
        const desc_row1 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('d1')
                    .setPlaceholder('Mô Tả Embed Hiện Tại')
                    .addOptions(
                        {
                            label: '| Main Page',
                            description: 'Trang Chủ Ở Đây, Hãy Click Nút Bên Trên Để Coi Nhá!',
                            emoji: '<a:LYG_404:1086172141998833684>',
                            value: 'main',
                            default: true,
                        },
                        {
                            label: '| Commands',
                            description: 'Tất Tần Tật Command Của Bot',
                            emoji: '<:LYG_LaylaHmm:1086172125955633192>',
                            value: 'cmd',
                        },
                        {
                            label: '| Changelogs',
                            description: 'Tất Tần Tật Mọi Sự Thay Đổi, Update Của Bot',
                            emoji: '<a:LYG_OkayuLove:1087692048280334347>',
                            value: 'clog',
                        },
                        {
                            label: '| FaQs',
                            description: 'Mọi Câu Hỏi Vui Về Con Bot',
                            emoji: '<a:LYG_FubukiWhat:1084085930266218556>',
                            value: 'faq',
                        }
                    )
            )
        //Desc_Row: Commands
        const desc_row2 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('d2')
                    .setPlaceholder('Mô Tả Embed Hiện Tại')
                    .addOptions(
                        {
                            label: '| Main Page',
                            description: 'Trang Chủ Ở Đây, Hãy Click Nút Bên Trên Để Coi Nhá!',
                            emoji: '<a:LYG_404:1086172141998833684>',
                            value: 'main',
                        },
                        {
                            label: '| Commands',
                            description: 'Tất Tần Tật Command Của Bot',
                            emoji: '<:LYG_LaylaHmm:1086172125955633192>',
                            value: 'cmd',
                            default: true,
                        },
                        {
                            label: '| Changelogs',
                            description: 'Tất Tần Tật Mọi Sự Thay Đổi, Update Của Bot',
                            emoji: '<a:LYG_OkayuLove:1087692048280334347>',
                            value: 'clog',
                        },
                        {
                            label: '| FaQs',
                            description: 'Mọi Câu Hỏi Vui Về Con Bot',
                            emoji: '<a:LYG_FubukiWhat:1084085930266218556>',
                            value: 'faq',
                        }
                    )
            )
        //Desc_Row: Changelog
        const desc_row3 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('d3')
                    .setPlaceholder('Mô Tả Embed Hiện Tại')
                    .addOptions(
                        {
                            label: '| Main Page',
                            description: 'Trang Chủ Ở Đây, Hãy Click Nút Bên Trên Để Coi Nhá!',
                            emoji: '<a:LYG_404:1086172141998833684>',
                            value: 'main',
                        },
                        {
                            label: '| Commands',
                            description: 'Tất Tần Tật Command Của Bot',
                            emoji: '<:LYG_LaylaHmm:1086172125955633192>',
                            value: 'cmd',
                        },
                        {
                            label: '| Changelogs',
                            description: 'Tất Tần Tật Mọi Sự Thay Đổi, Update Của Bot',
                            emoji: '<a:LYG_OkayuLove:1087692048280334347>',
                            value: 'clog',
                            default: true,
                        },
                        {
                            label: '| FaQs',
                            description: 'Mọi Câu Hỏi Vui Về Con Bot',
                            emoji: '<a:LYG_FubukiWhat:1084085930266218556>',
                            value: 'faq',
                        }
                    )
            )
        //Desc_Row: FaQs
        const desc_row4 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('d4')
                    .setPlaceholder('Mô Tả Embed Hiện Tại')
                    .addOptions(
                        {
                            label: '| Main Page',
                            description: 'Trang Chủ Ở Đây, Hãy Click Nút Bên Trên Để Coi Nhá!',
                            emoji: '<a:LYG_404:1086172141998833684>',
                            value: 'main',
                        },
                        {
                            label: '| Commands',
                            description: 'Tất Tần Tật Command Của Bot',
                            emoji: '<:LYG_LaylaHmm:1086172125955633192>',
                            value: 'cmd',
                        },
                        {
                            label: '| Changelogs',
                            description: 'Tất Tần Tật Mọi Sự Thay Đổi, Update Của Bot',
                            emoji: '<a:LYG_OkayuLove:1087692048280334347>',
                            value: 'clog',
                        },
                        {
                            label: '| FaQs',
                            description: 'Mọi Câu Hỏi Vui Về Con Bot',
                            emoji: '<a:LYG_FubukiWhat:1084085930266218556>',
                            value: 'faq',
                            default: true,
                        }
                    )
            )
        //Embed Trang Chủ
        const time = 1702300500
        const HeadEmbed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: Trang Chủ <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** v0.11.0\n<a:LYG_Clock:1084322030331105370> **Last Update:** <t:${time}> (<t:${time}:R>)\n\n**Lựa Chọn Các Phần Bên Dưới Để Xem Thông Tin Nhá!**\n> <:LYG_LaylaHmm:1086172125955633192> **Commands**\n> <a:LYG_OkayuLove:1087692048280334347> **Changelogs**\n> <a:LYG_FubukiWhat:1084085930266218556> **FaQs**\n\n❌**Link Mời Bot (KHÔNG KHẢ DỤNG)**\n🔗[[Support Server Link 1]](https://discord.gg/NA7AqG49xN)\n`)
            .setImage('https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png')
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        //Embed Commands
        const titlearr = HelpCmdAssets[0]
        const descarr = HelpCmdAssets[1]
        const colorarr = HelpCmdAssets[2]
        const imgarr = HelpCmdAssets[3]
        const CmdEmbed = []
        const server_options_only = '900742301373042809'
        var n //Ám Chỉ Server LYG Có Thêm Category Dùng Riêng Ý :vvvvvvv
        if (interaction.guild.id === server_options_only) {
            n = titlearr.length
        }
        else n = titlearr.length-4
        var i, j = 0
        for (i = 0; i < n; i++) {
            const title = titlearr[i]
            const color = colorarr[i]
            const desc = descarr[i]
            const img = imgarr[i]
            CmdEmbed[i] = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setColor(color)
                .setTitle(title)
                .setDescription(desc)
                .setImage(img)
                .setFooter({ text: 'Bot Được Tạo Bởi: kitsunezi2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' })
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
                        .setLabel(`| Trang: ${j + 1}/${n} |`)
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
        //Button Changelog
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
        //Credit Embed
        const CreditEmbed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`Miosha#5189 - Credits Page`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('**```\nCẢM ƠN RẤT NHIỀU VÌ SỰ ĐÓNG GÓP CỦA NHỮNG NGƯỜI DƯỚI ĐÂY!!!```**\n> <a:LYG_Fubuki_Chill:903085553145249822> **• Contributor**\n- <@751225225047179324>\n- <@809259609700302935>\n- <@892054339072438303>\n\n> <:LYG_FubukiMoney:1096296266822062080> **• Sponsor**\n- <@888738277044133899>\n- <@912514337602666526>\n- <a:LYG_LoadSlot:1087377575107645569>\n\n> <a:LYG_OkayuLove:1087692048280334347> **• Special Thanks**\n- <@961838901792735243>\n- <a:LYG_LoadSlot:1087377575107645569>')
            .setImage('https://cdn.discordapp.com/attachments/948615835369472064/1096299975530524703/Miosha_-_Credits.png')
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        //Embed Changelog 
        const InfoEmbed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: Changelogs <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** v0.11.0\n> <:Koishi_cry:1183758344922603592> **Server __Game Over__ Đã Không Còn Hỗ Trợ Nữa...**\n> <:JustOrin:1156221079988215879> Tối Ưu Hóa Khá Nhiều Mặt Về Con Bot...\n1. Ranking\n2. Thuật Toán Của Một Số Command\n3. Thêm Một Số Lệnh Cho Bot\n<a:LYG_Butterfly:1084085919210012722> **Tiến Độ:** ▰▰▰▰▰▰▰▰▱▱ 80%\n<a:LYG_Clock:1084322030331105370> **Last Update:** <t:${time}> (<t:${time}:R>)`)
            .setImage('https://cdn.discordapp.com/attachments/948615835369472064/1096301056188760084/Miosha_-_Info.png')
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        //Embed FaQ
        const FAQEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: FaQs <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('<:LYG_LaylaHmm:1086172125955633192> • Người Tạo Bot Là Ai?\n- <@751225225047179324>\n\n<:LYG_LaylaHmm:1086172125955633192> • Từ Đâu Mà Lại Làm Ra Con Bot Này?\n- Ý Tưởng Dựa Trên Pre Release Venti Bot Của <@809259609700302935>\n\n<:LYG_LaylaHmm:1086172125955633192> • Đâu Là Câu Lệnh Dễ Gây Nghiện Nhất?\n- `/howgay`, Ngay Cả Chủ Bot Còn Bị Addicted Mà <:LYG_XD:1087375888276000788>\n\n<:LYG_LaylaHmm:1086172125955633192> • Vậy Con Bot Này Có Thể Cho Vào Server Khác Ngoài 2 Server Này Chứ?\n- Chỉ Có Số Ít Thôi, Nên Link Mời Không Khả Dụng, Và Vì Đây Là Private Bot, Nên Sẽ Là Không Đâu Nhá\n\n<:LYG_LaylaHmm:1086172125955633192> Vậy Nếu Bot Là Private, Thì Có Thể Lấy Source Code Để Tham Khảo Được Chứ?\n- Được Nhé, Nó Ở Trên GitHub Và Sẽ Là Template Cho Bạn Sử Dụng Nhé, Nhớ Clone Repository Qua Và Sửa Khá Nhiều Ở Title Embed Nhé! [[GitHub/KitsuneTohru/Miosha]](https://github.com/KitsuneTohru/Miosha)\n\n<:LYG_LaylaHmm:1086172125955633192> • Tại Sao Từ Phiên Bản **v0.11.0** Chỉ Ghi Mỗi Thế?\n- Chủ Bot Venti Đã Rời Cả 2 Server Và Chấm Dứt Hoạt Động Rồi...')
            .setImage('https://cdn.discordapp.com/attachments/948615835369472064/1096304859256459385/Miosha_-_FAQ.png')
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })

        await interaction.reply({
            embeds: [HeadEmbed],
            components: [desc_row1]
        })
        //Execute Lệnh
        const filter = a => a.user.id === user;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 })
        collector.on('collect', async a => {
            //Lấy Giá Trị Menu
            var c = false
            const allvalues = ['d1', 'd2', 'd3', 'd4']
            for (vcount in allvalues) {
                if (a.customId === allvalues[vcount])
                    c = true
            }
            //Xuất Giá Trị Menu
            if (c) {
                const selected = a.values[0]
                if (selected === 'cmd') {
                    j = 0
                    await wait(500)
                    await interaction.editReply({
                        embeds: [CmdEmbed[0]],
                        components: [GetRow(j), desc_row2]
                    })
                }
                if (selected === 'clog') {
                    await wait(500)
                    await interaction.editReply({
                        embeds: [InfoEmbed],
                        components: [ CreditButton, desc_row3]
                    })
                }
                if (selected === 'faq') {
                    await wait(500)
                    await interaction.editReply({
                        embeds: [FAQEmbed],
                        components: [desc_row4]
                    })
                }
                if (selected === 'main') {
                    await wait(500)
                    await interaction.editReply({
                        embeds: [HeadEmbed],
                        components: [desc_row1]
                    })
                }
            }
            //Command Row Button
            if (a.customId === 'lpage' && j >= 0) {
                j--
                await wait(500)
                await interaction.editReply({
                    embeds: [CmdEmbed[j]],
                    components: [GetRow(j), desc_row2]
                })
            }
            if (a.customId === 'rpage' && j <= CmdEmbed.length) {
                j++
                await wait(500)
                await interaction.editReply({
                    embeds: [CmdEmbed[j]],
                    components: [GetRow(j), desc_row2]
                })
            }
            if (a.customId === 'credit1') {
                await wait(500)
                await interaction.editReply({
                    embeds: [CreditEmbed],
                    components: [ChangelogButton, desc_row3]
                })
            }
            if (a.customId === 'credit2') {
                await wait(500)
                await interaction.editReply({
                    embeds: [InfoEmbed],
                    components: [CreditButton, desc_row3]
                })
            }
        })
    }
}