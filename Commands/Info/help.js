const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Hiển Thị Sự Trợ Giúp Của Bot Trong Server...'),
    async execute(interaction) {
        const server_options_only = '900742301373042809'
        var n //Ám Chỉ Server LYG Có Thêm Category Dùng Riêng Ý :vvvvvvv
        if (interaction.guild.id === server_options_only) {
            n = 8
        }
        else n = 6
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
        const time = 1697886000
        const HeadEmbed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: Trang Chủ <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** **[LYG]** v.0.10.0/**[Game Over]** v.0.7.0\n<a:LYG_Clock:1084322030331105370> **Last Update:** <t:${time}> (<t:${time}:R>)\n\n**Lựa Chọn Các Phần Bên Dưới Để Xem Thông Tin Nhá!**\n> <:LYG_LaylaHmm:1086172125955633192> **Commands**\n> <a:LYG_OkayuLove:1087692048280334347> **Changelogs**\n> <a:LYG_FubukiWhat:1084085930266218556> **FaQs**\n\n❌**Link Mời Bot (KHÔNG KHẢ DỤNG)**\n🔗[[Support Server Link 1]](https://discord.gg/NA7AqG49xN)\n🔗[[Support Server Link 2]](https://discord.gg/jAsPDpaC8v)\n*(Note: Đang Trong Quá Trình Test Nhá...)*`)
            .setImage('https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png')
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        //Embed Commands
        const titlearr = [
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Overall)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Fun)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Info)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Emo)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (Misc)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Commands (User)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Private Commands (Moderation)** <a:LYG_Sparkle:1084084997398470747>',
            '<a:LYG_Sparkle:1084084997398470747> **LYG Bot: Private Commands (.Utils)** <a:LYG_Sparkle:1084084997398470747>'
        ]
        const descarr = [
            '<a:LYG_FubukiWhat:1084085930266218556> **Chào Mừng Bạn Đến Với Bảng Trợ Giúp Command**\n\n**Hãy Nhấn Nút Bên Dưới Để Coi Chi Tiết Nhá!**\n<a:LYG_TighnariNotes:1090126010571300874> **Lưu Ý:**\n1. Desc Ở Slash Command Sẽ Không Chi Tiết Như Trong Này Nhé!\n2. Đã Add Hệ Thống Bypass CD Cho Một Số Người Dùng, Họ Sẽ Không Bị Ảnh Hưởng Bởi CD Nhé!',
            '<:LYG_XD:1087375888276000788> **Fun Commands** (Số Lệnh Hiện Có: 5)\n\n> **• /howgay**\nCấu Trúc Lệnh: `/howgay [target] [avgset]`\nCD: 5 Phút\nCheck Chỉ Số Gay Của Ai Đó\nTrong Đó: `[target]` (Bắt Buộc): `(@user)` Chỉ Mention Người Dùng, `[avgset]` (Không Bắt Buộc): `(true/false)` Tính Giá Trị Trung Bình (3 Lần) Bật/Tắt (Giá Trị Mặc Định: `false`)\nLƯU Ý: Command Dễ Gây Nghiện, Lạm Dụng Quá Dễ Addiction Và Khó Thoát Ra Lắm, Quạo Ráng Chịu, Đồng Thời Sẽ Có Một Số User Được Bypass Nó Nhá =))\n\n> **• /omikuji**\nCấu Trúc Lệnh: `/omikuji`\nCD: 1 Ngày\nBốc Thẻ Vui Hàng Ngày\n\n> **• /coinflip**\nCấu Trúc Lệnh: `/coinflip [facing]`\nCD: 15 Giây\nDùng Để Tung Đồng Xu\nTrong Đó: `[Facing]` (Bắt Buộc): `(Head/Tail/Stand)` Chọn 1 Trong 3 Giá Trị Trên\n\n> **• /dice**\nCấu Trúc Lệnh: `/dice [quantity]`\nCD: 15 Giây\nDùng Để Tung Xúc Xắc (Loại 6 Mặt)\nTrong Đó: `[quantity]` (Không Bắt Buộc): Số Lượng Xúc Xăc Bạn Muốn Roll `(Tối Đa: 10)` \n\n> **• /slot**\nCấu Trúc Lệnh: `/slot [amount]`\nCD: 15 Giây\nDùng Để Chơi Slot (Giả Sử Nếu Bạn Muốn Không Mất Tiền Bot XD)\nTrong Đó: `[amount]` (Bắt Buộc): Trong Khoảng `0 - 250000`, Có Keyword `all` Ứng Với `250000`',
            '<:LYG_LaylaHmm:1086172125955633192> **Info Commands** (Số Lệnh Hiện Có: 3)\n\n> **• /info**\nCấu Trúc Lệnh: `/info`\nCD: Không Có\nHiển Thị Info Của Bot\n\n> **• /help**\nCấu Trúc Lệnh: `/help`\nCD: Không Có\nHiển Thị Trợ Giúp Của Bot (Bạn Đang Ở Đây)\n\n> **• /ping**\nCấu Trúc Lệnh: `/ping`\nCD: 5 Giây\nKiểm Tra Độ Trễ Của Bot Trong Server',
            '<:LYG_AyameYoDayo:1086171244031922237> **Emo Commands** (Số Lệnh Hiện Có: 1)\n\n> **• /happy**\nCấu Trúc Lệnh: `/happy`\nCD: 10s\nThể Hiện Cảm Xúc Của Bạn: Vui Vẻ',
            '<:LYG_Error:1087366990160740452> **Misc Commands** (Số Lệnh Hiện Có: 4)\n\n> **• /test**\nCấu Trúc Lệnh: `/test` (TESTER ONLY)\nCD: [___]\nCâu Lệnh Này Chỉ Dùng Để Test Một Số Chức Năng Từ Chủ Bot Thôi\n\n> **• /numconv**\nCấu Trúc Lệnh `/numconv [number]`\nCD: 10 Giây\nNhập Vào Một Giá Trị Số Nguyên Dương Bất Kì, Sau Đó Trả Về Giá Trị Đã Quy Đổi\nTrong Đó: `[number]` (Bắt Buộc): `(Số Nguyên Dương Bất Kì)`\n\n> **• /roll**\nCấu Trúc Lệnh: `/roll [minlimit] [maxlimit]`\nCD: 10 Giây\nRoll Sô Random Bất Kì Theo Giới Hạn\nTrong Đó: `[minlimit]` (Không Bắt Buộc): Giới Hạn Dưới Bạn Nhập Vào, Default: `0`, `[maxlimit]` (Không Bắt Buộc): Giới Hạn Trên Bạn Nhập Vào, Default: `100`\n\n> **• /pick**\nCấu Trúc Lệnh: `/pick [option]`\nCD: 10 Giây\nPick Lựa Chọn Bất Kì Mà Bạn Đưa Ra\nTrong Đó: `[Option]` (Băt Buộc): `[str], ...` Chuỗi Bạn Nhập Vào, Ngăn Cách Nhau Bởi Dấu Phẩy (,)',
            '<a:LYG_FubukiBorger:975937199486951464> **User Commands** (Số Lệnh Hiện Có: 4)\n\n> **• /avatar**\nCấu Trúc Lệnh: `/avatar [user]`\nCD: 5 Giây\nLấy Avatar Của Người Dùng (Hoặc Của Bạn)\nTrong Đó: `[user]` (Không Bắt Buộc): `(@user)` Chỉ Người Bạn Muốn Lấy Avatar\n\n> **• /guildavt**\nCấu Trúc Lệnh: `/guildavt [user]`\nCD: 5 Giây\nTrong Đó: `[user]` (Bắt Buộc): `(@user)` Chỉ User Nào Đó\nDùng Để Lấy Avatar Của User (Nếu User Đó Có Guild Avatar)\n\n> **• /server**\nCấu Trúc Lệnh: `/server`\nCD: 10 Giây\nHiển Thị Thông Tin Về Server\n\n> **• /user**\nCấu Trúc Lệnh: `/user [name]`\nCD: 10 Giây\nDùng Để Coi Thông Tin Cơ Bản Của Người Dùng\nTrong Đó: `[name]` (Bắt Buộc): `(@user)`: Chỉ Mention Người Dùng',
            '<a:LYG_ReimuVibe:1133752889051975810> **Moderation Commands** (Số Lệnh Hiện Có: 4)\n\n**• /ban**\nCấu Trúc Lệnh: `/ban [user] [reason]`\nCD: Không Có\nBan Người Dùng Khỏi Server\n\nTrong Đó: `[user]` (Bắt Buộc): Chỉ Người Dùng Bạn Muốn Ban `[reason]` (Không Bắt Buộc): Chỉ Lí Do Bạn Muốn Ban\n\n> **• /kick**\nCấu Trúc Lệnh `/kick [user] [reason]`\nCD: Không Có\nKick Người Dùng Khỏi Server\nTrong Đó: `[user]` (Bắt Buộc): Người Dùng Bạn Muốn Kick, `[reason]` (Không Bắt Buộc): Lí Do Bạn Muốn Kick\n\n**• /timeout**\nCấu Trúc Lệnh: `/timeout [user] [duration] [reason]`\nCD: Không Có\nDùng Để Timeout (Rọ Mõm) Người Dùng Nào Đáy Trong Server Theo Thời Gian Nhất Định\nTrong Đó: `[user]` (Bắt Buộc): Chỉ Người Bạn Muốn Rọ Mõm, `[duration]` (Bắt Buộc): Thời Gian Bạn Muốn Rọ Mõm `1m, 1h, 1d...` (Note: Max: 28 Ngày, `0` Gỡ Timeout), `[Reason]` (Không Bắt Buộc): Lí Do Bạn Muốn Rọ Mõm\n\n**• /unban**\nCấu Trúc Lệnh: `/unban [user_id] [reason]`\nCD: Không Có\nDùng Để Gỡ Ban Người Dùng Nào Đó\nTrong Đó: `[user_id]` (Bắt Buộc): ID Người Dùng Bạn Muốn Gỡ Ban, `[reason]` (Không Bắt Buộc): Lí Do Bạn Muốn Gỡ Ban',
            '<:LYG_OkayuBOOM:1138231827140706304> **Util Commands** (Số Lệnh Hiện Có: 3)\n\n**• /announcement**\nCấu Trúc Lệnh: `/announcement [channel] [title] [message] [imglink]`\nGửi Thông Báo Cho Toàn Server Biết\nTrong Đó: `[channel]` (Bắt Buộc): Kênh Để Gửi Thông Báo, `[title]` (Bắt Buộc): Tiêu Đề Của Thông Báo, `[message]` (Bắt Buộc): Nội Dung Để Gửi Thông Báo, `[context]` (Không Bắt Buộc): Nội Dung Đi Kèm Cho Thông Báo Kèm Theo <@&901074521824559125> (Mặc Định Là <@&901074521824559125>), `[imglink]` (Không Bắt Buộc): Link Ảnh Đi Kèm Cho Thông Báo\n\n> **• /rank**\nCấu Trúc Lệnh: `/rank [user]`\nCD: 10 Giây\nDùng Để Check Rank Level Của Ai Đó\nTrong Đó: `[user]` (Không Bắt Buộc): `(@user)`: Chỉ Mention Người Dùng\n\n> **• /resetrank**\nCấu Trúc Lệnh `/resetrank`\nCD: Không Có\nDùng Để Reset Toàn Bộ Rank Của Server' 
        ]
        const colorarr = [
            '#EFFFB3',
            '#F6B3FF',
            '#B3FFF6',
            '#dd9bff',
            '#D3FFB3',
            '#F90000',
            '#a1a7a7',
            '#a1a7a7',
        ]
        const imgarr = [
            'https://cdn.discordapp.com/attachments/948615835369472064/1096305458400206850/Miosha_-_CMD_Overall.png',
            'https://cdn.discordapp.com/attachments/948615835369472064/1096306123369369640/Miosha_-_CMD_Fun.png',
            'https://cdn.discordapp.com/attachments/948615835369472064/1096306678565187614/Miosha_-_CMD_Info.png',
            'https://cdn.discordapp.com/attachments/948615835369472064/1096307354577936394/Miosha_-_CMD_Emo.png',
            'https://cdn.discordapp.com/attachments/948615835369472064/1096308114069925928/Miosha_-_CMD_Mysc.png',
            'https://cdn.discordapp.com/attachments/948615835369472064/1096308694775496724/Miosha_-_CMD_User.png',
            'https://cdn.discordapp.com/attachments/1098463225986678925/1138240605043040396/20230808_053826_0000.png',
            'https://cdn.discordapp.com/attachments/1098463225986678925/1138240605592498357/20230808_054124_0000.png'
        ]
        const CmdEmbed = []
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
            .setDescription('**```\nCẢM ƠN RẤT NHIỀU VÌ SỰ ĐÓNG GÓP CỦA NHỮNG NGƯỜI DƯỚI ĐÂY!!!```**\n> <a:LYG_Fubuki_Chill:903085553145249822> **• Contributor**\n- <@751225225047179324>\n- <@809259609700302935>\n- <@729671009631862834>\n\n> <:LYG_FubukiMoney:1096296266822062080> **• Sponsor**\n- <@888738277044133899>\n- <@912514337602666526>\n- <a:LYG_LoadSlot:1087377575107645569>\n\n> <a:LYG_OkayuLove:1087692048280334347> **• Special Thanks**\n- <@961838901792735243>\n- <a:LYG_LoadSlot:1087377575107645569>')
            .setImage('https://cdn.discordapp.com/attachments/948615835369472064/1096299975530524703/Miosha_-_Credits.png')
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        //Embed Changelog 
        const InfoEmbed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: Changelogs <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> **Phiên Bản:** **[LYG]** v.0.10.0/**[Game Over]** v.0.7.0\n> <:LYG_OkayuBOOM:1138231827140706304> SPECIAL: Ranking System Đã Được Tạo!!!\n> Thêm Lệnh: **/rank** Và **/resetrank**\n<a:LYG_Butterfly:1084085919210012722> **Tiến Độ:** ▰▰▰▰▰▰▰▱▱▱ 70%\n<a:LYG_Clock:1084322030331105370> **Last Update:** <t:${time}> (<t:${time}:R>)`)
            .setImage('https://cdn.discordapp.com/attachments/948615835369472064/1096301056188760084/Miosha_-_Info.png')
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        //Embed FaQ
        const FAQEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`<a:LYG_Sparkle:1084084997398470747> LYG Bot: FaQs <a:LYG_Sparkle:1084084997398470747>`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('<:LYG_LaylaHmm:1086172125955633192> • Người Tạo Bot Là Ai?\n- <@751225225047179324>\n\n<:LYG_LaylaHmm:1086172125955633192> • Từ Đâu Mà Lại Làm Ra Con Bot Này?\n- Ý Tưởng Dựa Trên Pre Release Venti Bot Của <@809259609700302935>\n\n<:LYG_LaylaHmm:1086172125955633192> • Đâu Là Câu Lệnh Dễ Gây Nghiện Nhất?\n- `/howgay`, Ngay Cả Chủ Bot Còn Bị Addicted Mà <:LYG_XD:1087375888276000788>\n\n<:LYG_LaylaHmm:1086172125955633192> • Vậy Con Bot Này Có Thể Cho Vào Server Khác Ngoài 2 Server Này Chứ?\n- Chỉ Có Số Ít Thôi, Nên Link Mời Không Khả Dụng, Và Vì Đây Là Private Bot, Nên Sẽ Là Không Đâu Nhá\n\n<:LYG_LaylaHmm:1086172125955633192> Vậy Nếu Bot Là Private, Thì Có Thể Lấy Source Code Để Tham Khảo Được Chứ?\n- Được Nhé, Nó Ở Trên GitHub Và Sẽ Là Template Cho Bạn Sử Dụng Nhé, Nhớ Clone Repository Qua Và Sửa Khá Nhiều Ở Title Embed Nhé! [[GitHub/KitsuneTohru/Miosha]](https://github.com/KitsuneTohru/Miosha)')
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