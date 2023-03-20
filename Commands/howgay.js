//-----Check How Gay, Bản Cải Tiến-----\\
//Giải Thích Code
//======================================================
/*1. Tỉ Lệ: 0% - 101% (Đồng Nghĩa Random 101.1)
**2. Easter Egg (Hiếm) Kích Hoạt Khi Đạt Từ 100.1 - 101%
**3. Có Một Số Entry Đặc Biệt Như 403, 404, 727, ...
/*3. Có Một Số User Sẽ Được Bypass Nó (Tùy Thuộc)
========================================================*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('howgay')
        .setDescription('Check Độ Gay Của Một User Nào ĐÓ (J4F, RAGE BỊ TRÊU RÁNG CHỊU!)')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('Mục Tiêu Mà Bạn Muón Nhắm Tới')
            .setRequired(true)),

    async execute(interaction){
        const user = interaction.options.getUser('target')

        var rng = Math.random()*101.1
        rng = (Math.floor(rng*10)/10).toFixed(1)
        const rngv2 = Math.floor(Math.random()*100)
        const easter_url = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087363317309394984/Page_07.jpg'
        const easter_result = '<:LYG_XD:1087375888276000788> **|** Không Sao Không Sao, Có Chủ Nhân Ở Đây Biến Đổi Cậu Rồi, Cậu Sẽ Là Thuộc Hạ Của Tôi Thôi\nSrc: Manga From: **Shio Ayatsuki**'
        const spcl_chr = ('`/howgay`')
        var img_url
    
        let color, result
        if(user.id == '751225225047179324' || user.id == '809259609700302935' || user.id == '786816081032773662'){
            color = "#6E0000"
            result = `<:LYG_KeqingDoi:1086190826536849499> **|** Oi! Bạn **KHÔNG THỂ** Check Câu Lệnh ${spcl_chr} Lên ${user} Được! Hãy Thử Với Người Khác Đi!`
            img_url = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087382405943402558/genshin-impact-yae-miko.gif'
        }
        else if(rng<=10){
            color = "#000000"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<a:LYG_GigaChad:1086172112080867359> **|** *Nhận Xét:* GIGA CHAD Đây Rồi, Bạn Xứng Đáng Có 10 Người Vợ, Respect++`
            img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
        }
        else if(rng <= 25){
            color = "#00FFE8"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_OkayuYay:1084085932254298122> **|** *Nhận Xét:* Bạn Cũng Khỏe Phết Đấy, Không Biết Có Thể Giữ Yên Như Thế Không Nữa` 
            img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
        }
        else if(rng <= 40.2 || rng <= 50){
            color = "#44FF00"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_MioWink:1086172116916912198> **|** *Nhận Xét:* Oya? Có Chắc Chắn Rằng Bạn Có Ổn Không Đấy? Sao Có Cảm Giác Bất An Thế Này?` 
            img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
        }
        else if(rng == 40.3){
            color = "#727272"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_Error:1087366990160740452> **|** *Nhận Xét:* 403 - Forbidden: Bro, What Have You Done? Sao Lại Bị Cấm Thế Này?` 
            img_url = 'https://www.kindpng.com/picc/m/164-1647256_403-error-png-download-403-forbidden-png-transparent.png'
        }
        else if(rng == 40.4){
            color = "#727272"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<a:LYG_404:1086172141998833684> **|** *Nhận Xét:* 404 - Command Not Found: Lmao, Chúng Tui Đùa Đấy, Command Sao Mà Not Found Được` 
            img_url = 'https://upload.wikimedia.org/wikipedia/commons/8/8a/404_File_not_found.png'
        }
        else if(rng <= 72.6 || rng <= 75){
            color = "#DFD704"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_LaylaHmm:1086172125955633192> **|** *Nhận Xét:* Ai Chà, Coi Bộ Pha Này Phải Ghi Chú Giám Sát Rồi, Bạn Có Dấu Hiệu Bị Gay Không Đấy?`
            img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
        }
        else if(rng == 72.7){
            color = "#727272"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<a:LYG_WYSI:1087359689035104307> **|** *Nhận Xét:* WYSI, POG, Nhưng God Shigetora Sẽ Slap Bạn Vì Bạn Đã Có Dấu Hiệu Bị Gay Nặng`
            img_url = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087382370430242887/727-wysi.gif'
        }
        else if(rng <= 90){
            color = "#D26400"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_AyameEh:1086172364414386206> **|** *Nhận Xét:* Oh Nyo, Quả Này Gay Quá Rồi, Gọi Cha Sứ Đến Mau`
            img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
        }
        else if(rng <= 100){
            color = "#6D00D2"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<:LYG_PepeHoly:1086172373306323016> **|** *Nhận Xét:* CODE RED CODE RED!!! Nguy Hiểm Rồi, Không Ổn Rồi Bà Con Ơi, Thằng Cha Đó Gay Quá Rồi!!!`
            img_url = 'https://media0.giphy.com/headers/jmckeehen/s2wy7iphPP98.gif'
        }
        else {
            color = "#FF00A8"
            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n<a:LYG_AquaBlessing:1086173173113966702>**|** *Nhận Xét:* Yo, Listen Up, Here's A Story About A Little Guy That Lives In A **GAY** World\nAnd All Day And All Night And Everything He Sees Is Just **Gay**\nLike Him Inside And Outside\n**GAY** His House With A **GAY** Little Window\nAnd A **GAY** Corvette\nAnd Everything Is **GAY** For Him\nAnd Himself And Everybody Around\n'Cause He Ain't Got Nobody To Listen...\n-Effiel 65 ft. iDubbbz-`
            img_url = 'https://cdn.discordapp.com/attachments/1084992874212495393/1087382367158669362/idubbbz-youtuber.gif'
        }
        const CalcEmbed = new EmbedBuilder()
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
            .setColor('#FFFFFF')
            .setDescription(`<a:LYG_LoadSlot:1087377575107645569> **|** Hệ Thống Đang Kiểm Tra Độ Gay Của ${user}... Xin Chờ Một Lát...\n**LƯU Ý:** Đừng Lấy Chuyện Này Làm Chuyện Nghiêm Túc Nhá! Quạo Rồi Không Ai Chịu Trách Nhiệm Đâu!`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        const GayEmbed = new EmbedBuilder()
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
            .setColor(color)
            .setDescription(`${result}`)
            .setTimestamp()
            .setImage(img_url)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        const H100PlusEmbed = new EmbedBuilder()
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setTitle('🏳️‍🌈 **- Bí Mật Của Command XD...**')
            .setColor(color)
            .setDescription(`${easter_result}`)
            .setTimestamp()
            .setImage(easter_url)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        console.log('========================================\nRng Encounter:',rng,'\nRngv2 Encounter:',rngv2,'\n========================================')
        await interaction.reply({
            embeds: [CalcEmbed] 
        })
        await wait(3000)
        await interaction.editReply({
            embeds: [GayEmbed]
        })
        await wait(500)
        if(rngv2 >= 95 && user.id != '751225225047179324' && user.id != '809259609700302935' && user.id != '786816081032773662')
            await interaction.followUp({
                embeds: [H100PlusEmbed]
            })
    },
};