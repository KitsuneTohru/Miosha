//-----Check How Gay, Bản Cải Tiến (v3.0)-----\\
//Giải Thích Code
//======================================================
/*1. Tỉ Lệ: 0% - 101% (Đồng Nghĩa Random 101.1)
**2. Easter Egg (Hiếm) Kích Hoạt Khi Đạt Từ 100.1 - 101%
**3. Có Một Số Entry Đặc Biệt Như 403, 404, 727, ...
/*3. Có Một Số User Sẽ Được Bypass Nó (Tùy Thuộc)
========================================================*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const cd = new Set();
const cdend = new Set();
const cdtime = 300000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('howgay')
        .setDescription('Check Độ Gay Của Một User Nào Đó (J4F, RAGE BỊ TRÊU RÁNG CHỊU!)')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Mục Tiêu Mà Bạn Muón Nhắm Tới')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('avgset')
                .setDescription('Tính Trung Bình Gay Của User Nào Đó (CỐ ĐỊNH: 3 LẦN)')
                .setRequired(true)),

    async execute(interaction) {
        //Lấy User Và AvgSet
        const user = interaction.options.getUser('target')
        const avgbool = interaction.options.getBoolean('avgset')
        //Easter
        const rngv2 = Math.floor(Math.random() * 100)
        const easter_url = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087363317309394984/Page_07.jpg'
        const easter_result = '<:LYG_XD:1087375888276000788> **|** Không Sao Không Sao, Có Chủ Nhân Ở Đây Biến Đổi Cậu Rồi, Cậu Sẽ Là Thuộc Hạ Của Tôi Thôi\nSrc: Manga From: **Shio Ayatsuki**'
        const spcl_chr = ('`/howgay`')
        const H100PlusEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setTitle('🏳️‍🌈 **- Bí Mật Của Command XD...**')
            .setColor('LuminousVividPink')
            .setDescription(`${easter_result}`)
            .setTimestamp()
            .setImage(easter_url)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //Chờ Embed...
        const CalcEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
            .setColor('#FFFFFF')
            .setDescription(`<a:LYG_LoadSlot:1087377575107645569> **|** Hệ Thống Đang Kiểm Tra Độ Gay Của ${user}... Xin Chờ Một Lát...\n**LƯU Ý:** Đừng Lấy Chuyện Này Làm Chuyện Nghiêm Túc Nhá! Quạo Rồi Không Ai Chịu Trách Nhiệm Đâu!`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //Lock User + Hàm Lấy So Sánh
        const lock_user = ['751225225047179324', '786816081032773662', '927221951439700058', '809259609700302935', '888738277044133899']
        var lock_output = false
        function Compare(user, lock_user) {
            for (var count in lock_user) {
                if (user.id === lock_user[count]) {
                    lock_output = true
                }
            }
        }
        Compare(user, lock_user)
        //Lock Embed
        const SpecialEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
            .setColor('#6E0000')
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> **|** Oi! Bạn **KHÔNG THỂ** Check Câu Lệnh ${spcl_chr} Lên ${user} Được! Hãy Thử Với Người Khác Đi!`)
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/1084992874212495393/1087382405943402558/genshin-impact-yae-miko.gif')
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //avgbool == False
        if (avgbool == false) {
            var rng = Math.random() * 101.1
            rng = (Math.floor(rng * 10) / 10).toFixed(1)
            var img_url, color, result
            if (rng <= 10) {
                color = "#000000"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<a:LYG_GigaChad:1086172112080867359> **|** *Nhận Xét:* GIGA CHAD Đây Rồi, Bạn Xứng Đáng Có 10 Người Vợ, Respect++`
                img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (rng <= 25) {
                color = "#00FFE8"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_OkayuYay:1084085932254298122> **|** *Nhận Xét:* Bạn Cũng Khỏe Phết Đấy, Không Biết Có Thể Giữ Yên Như Thế Không Nữa`
                img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (rng <= 40.2 || rng <= 50) {
                color = "#44FF00"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_MioWink:1086172116916912198> **|** *Nhận Xét:* Oya? Có Chắc Chắn Rằng Bạn Có Ổn Không Đấy? Sao Có Cảm Giác Bất An Thế Này?`
                img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (rng == 40.3) {
                color = "#727272"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_Error:1087366990160740452> **|** *Nhận Xét:* 403 - Forbidden: Bro, What Have You Done? Sao Lại Bị Cấm Thế Này?`
                img_url = 'https://www.kindpng.com/picc/m/164-1647256_403-error-png-download-403-forbidden-png-transparent.png'
            }
            else if (rng == 40.4) {
                color = "#727272"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<a:LYG_404:1086172141998833684> **|** *Nhận Xét:* 404 - Command Not Found: Lmao, Chúng Tui Đùa Đấy, Command Sao Mà Not Found Được`
                img_url = 'https://upload.wikimedia.org/wikipedia/commons/8/8a/404_File_not_found.png'
            }
            else if (rng <= 72.6 || rng <= 75) {
                color = "#DFD704"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_LaylaHmm:1086172125955633192> **|** *Nhận Xét:* Ai Chà, Coi Bộ Pha Này Phải Ghi Chú Giám Sát Rồi, Bạn Có Dấu Hiệu Bị Gay Không Đấy?`
                img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (rng == 72.7) {
                color = "#727272"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<a:LYG_WYSI:1087359689035104307> **|** *Nhận Xét:* WYSI, POG, Nhưng God Shigetora Sẽ Slap Bạn Vì Bạn Đã Có Dấu Hiệu Bị Gay Nặng`
                img_url = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087382370430242887/727-wysi.gif'
            }
            else if (rng <= 90) {
                color = "#D26400"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_AyameEh:1086172364414386206> **|** *Nhận Xét:* Oh Nyo, Quả Này Gay Quá Rồi, Gọi Cha Sứ Đến Mau`
                img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (rng <= 100) {
                color = "#6D00D2"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_PepeHoly:1086172373306323016> **|** *Nhận Xét:* CODE RED CODE RED!!! Nguy Hiểm Rồi, Không Ổn Rồi Bà Con Ơi, Thằng Cha Đó Gay Quá Rồi!!!`
                img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else {
                color = "#FF00A8"
                result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<a:LYG_AquaBlessing:1086173173113966702>**|** *Nhận Xét:* Yo, Listen Up, Here's A Story About A Little Guy That Lives In A **GAY** World\nAnd All Day And All Night And Everything He Sees Is Just **Gay**\nLike Him Inside And Outside\n**GAY** His House With A **GAY** Little Window\nAnd A **GAY** Corvette\nAnd Everything Is **GAY** For Him\nAnd Himself And Everybody Around\n'Cause He Ain't Got Nobody To Listen...\n-Effiel 65 ft. iDubbbz-`
                img_url = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087382367158669362/idubbbz-youtuber.gif'
            }
            console.log('========================================\nRng Encounter:', rng, '\nRngv2 Encounter:', rngv2, '\n========================================')
        }
        //avgbool == True
        else {
            var a = []
            var avgpt = 0, colorv2, resultv2, resultv3, img_urlv2, rngv3
            for (var i = 0; i < 3; i++) {
                rngv3 = Math.random() * 101.1
                rngv3 = (Math.floor(rngv3 * 10) / 10).toFixed(1)
                avgpt = avgpt + Number(rngv3)
                resultv2 = (`<a:LYG_Ping:900775951317737473> **|** Chỉ Số Gay Của ${user} **__(Lần: ${i + 1})__** Là: **${rngv3}%**`)
                a[i] = resultv2
                console.log('========================================\nTính Toán Theo Rngv3 (Lần', i + 1, ') =', rngv3, '\n========================================')
            }
            avgpt = avgpt / 3
            avgpt = (Math.floor(avgpt * 10) / 10).toFixed(1)
            if (avgpt <= 10) {
                colorv2 = "#000000"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<a:LYG_GigaChad:1086172112080867359> **|** *Nhận Xét:* GIGA CHAD Đây Rồi, Bạn Xứng Đáng Có 10 Người Vợ, Respect++`
                img_urlv2 = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (avgpt <= 25) {
                colorv2 = "#00FFE8"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<:LYG_OkayuYay:1084085932254298122> **|** *Nhận Xét:* Bạn Cũng Khỏe Phết Đấy, Không Biết Có Thể Giữ Yên Như Thế Không Nữa`
                img_urlv2 = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (avgpt <= 40.2 || avgpt <= 50) {
                colorv2 = "#44FF00"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<:LYG_MioWink:1086172116916912198> **|** *Nhận Xét:* Oya? Có Chắc Chắn Rằng Bạn Có Ổn Không Đấy? Sao Có Cảm Giác Bất An Thế Này?`
                img_urlv2 = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (avgpt == 40.3) {
                colorv2 = "#727272"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<:LYG_Error:1087366990160740452> **|** *Nhận Xét:* 403 - Forbidden: Bro, What Have You Done? Sao Lại Bị Cấm Thế Này?`
                img_urlv2 = 'https://www.kindpng.com/picc/m/164-1647256_403-error-png-download-403-forbidden-png-transparent.png'
            }
            else if (avgpt == 40.4) {
                colorv2 = "#727272"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<a:LYG_404:1086172141998833684> **|** *Nhận Xét:* 404 - Command Not Found: Lmao, Chúng Tui Đùa Đấy, Command Sao Mà Not Found Được`
                img_urlv2 = 'https://upload.wikimedia.org/wikipedia/commons/8/8a/404_File_not_found.png'
            }
            else if (avgpt <= 72.6 || avgpt <= 75) {
                colorv2 = "#DFD704"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<:LYG_LaylaHmm:1086172125955633192> **|** *Nhận Xét:* Ai Chà, Coi Bộ Pha Này Phải Ghi Chú Giám Sát Rồi, Bạn Có Dấu Hiệu Bị Gay Không Đấy?`
                img_urlv2 = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (avgpt == 72.7) {
                colorv2 = "#727272"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<a:LYG_WYSI:1087359689035104307> **|** *Nhận Xét:* WYSI, POG, Nhưng God Shigetora Sẽ Slap Bạn Vì Bạn Đã Có Dấu Hiệu Bị Gay Nặng`
                img_urlv2 = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087382370430242887/727-wysi.gif'
            }
            else if (avgpt <= 90) {
                colorv2 = "#D26400"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<:LYG_AyameEh:1086172364414386206> **|** *Nhận Xét:* Oh Nyo, Quả Này Gay Quá Rồi, Gọi Cha Sứ Đến Mau`
                img_urlv2 = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else if (avgpt <= 100) {
                colorv2 = "#6D00D2"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<:LYG_PepeHoly:1086172373306323016> **|** *Nhận Xét:* CODE RED CODE RED!!! Nguy Hiểm Rồi, Không Ổn Rồi Bà Con Ơi, Thằng Cha Đó Gay Quá Rồi!!!`
                img_urlv2 = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
            }
            else {
                colorv2 = "#FF00A8"
                resultv3 = `Chỉ Số Gay Của ${user} **(Đã Tính Toán)** Là: **${avgpt}%**\n<a:LYG_AquaBlessing:1086173173113966702>**|** *Nhận Xét:* Yo, Listen Up, Here's A Story About A Little Guy That Lives In A **GAY** World\nAnd All Day And All Night And Everything He Sees Is Just **Gay**\nLike Him Inside And Outside\n**GAY** His House With A **GAY** Little Window\nAnd A **GAY** Corvette\nAnd Everything Is **GAY** For Him\nAnd Himself And Everybody Around\n'Cause He Ain't Got Nobody To Listen...\n-Effiel 65 ft. iDubbbz-`
                img_urlv2 = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087382367158669362/idubbbz-youtuber.gif'
            }
            console.log('========================================\nRng Encounter:', avgpt, '\nRngv2 Encounter:', rngv2, '\n========================================')
        }
        var GayEmbed_1, GayEmbed_2, GayEmbed_3, GayEmbed_4, GayEmbed_5
        //Embed(False)
        if (avgbool === false) {
            GayEmbed_1 = new EmbedBuilder()
                .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
                .setColor(color)
                .setDescription(`${result}`)
                .setTimestamp()
                .setImage(img_url)
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        }
        //Embed(True)
        if (avgbool === true) {
            GayEmbed_2 = new EmbedBuilder()
                .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
                .setColor('DarkButNotBlack')
                .setDescription(`<a:LYG_Clock:1084322030331105370> Đang Trong Tính Toán... Xin Hãy Kiên Nhẫn...\n> ${a[0]}`)
                .setTimestamp()
                .setImage(img_urlv2)
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
            GayEmbed_3 = new EmbedBuilder()
                .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
                .setColor('DarkButNotBlack')
                .setDescription(`<a:LYG_Clock:1084322030331105370> Đang Trong Tính Toán... Xin Hãy Kiên Nhẫn...\n> ${a[0]}\n> ${a[1]}`)
                .setTimestamp()
                .setImage(img_urlv2)
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
            GayEmbed_4 = new EmbedBuilder()
                .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
                .setColor('DarkButNotBlack')
                .setDescription(`<a:LYG_Clock:1084322030331105370> Đang Trong Tính Toán... Xin Hãy Kiên Nhẫn...\n> ${a[0]}\n> ${a[1]}\n> ${a[2]}`)
                .setTimestamp()
                .setImage(img_urlv2)
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
            GayEmbed_5 = new EmbedBuilder()
                .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
                .setColor(colorv2)
                .setDescription(`<a:LYG_Star:1084085189174632538> Kết Quả Khảo Sát:\n> ${a[0]}\n> ${a[1]}\n> ${a[2]}\n${resultv3}`)
                .setTimestamp()
                .setImage(img_urlv2)
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        }
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
            //Reply(Phụ Thuộc Vào Điều Kiện)
            await interaction.reply({
                embeds: [CalcEmbed]
            })
            await wait(3000)
            if (avgbool === false) {
                if (lock_output) {
                    await interaction.editReply({
                        embeds: [SpecialEmbed]
                    })
                }
                else {
                    await interaction.editReply({
                        embeds: [GayEmbed_1]
                    })
                }
                await wait(500)
                if (rng > 100 && rngv2 >= 95 && !lock_output) {
                    await interaction.followUp({
                        embeds: [H100PlusEmbed]
                    })
                }
            }
            else {
                if (lock_output) {
                    await interaction.editReply({
                        embeds: [SpecialEmbed]
                    })
                }
                else {
                    await interaction.editReply({
                        embeds: [GayEmbed_2]
                    })
                }
                await wait(500)
                if (!lock_output) {
                    await interaction.editReply({
                        embeds: [GayEmbed_3]
                    })
                }
                await wait(500)
                if (!lock_output) {
                    await interaction.editReply({
                        embeds: [GayEmbed_4]
                    })
                }
                await wait(500)
                if (!lock_output) {
                    await interaction.editReply({
                        embeds: [GayEmbed_5]
                    })
                }
                await wait(500)
                if (rng > 100 && rngv2 >= 95 && !lock_output) {
                    await interaction.editReply({
                        embeds: [H100PlusEmbed]
                    })
                }
            }
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
        }
    },
};