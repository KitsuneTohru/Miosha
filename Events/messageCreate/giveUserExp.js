const { Client, Message, EmbedBuilder } = require('discord.js')
const Level = require('../../Database/level')
const LvlCalc = require('../../Utils/lvlcalc')
const cd = new Set()

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const channel1 = client.channels.cache.get('900760973953093664')
    const channel2 = client.channels.cache.get('1165485511142551702')
    const channel3 = client.channels.cache.get('1165485813774172240')
    const channel4 = client.channels.cache.get('1165485684354723910')
    if (message.guild.id !== '900742301373042809' || message.author.bot || cd.has(message.author.id)) return
    if ((message.content.length) <= 1) return
    const WhiteList = ['900755787142545438', '911536436522659890', '900756132002426880', '901068976455565343', '1020209620473626696', '1084370333622083624', '901075313491066890', '900752091654553620']
    var key = false
    for (i in WhiteList) {
        if (message.channel.id === WhiteList[i])
            key = true
    }
    if (key === false) return
    const xpToGive = Math.floor(Math.random() * 15) + 1
    const query = {
        UserID: message.author.id,
        GuildID: message.guild.id
    }
    try {
        const level = await Level.findOne(query)

        if (level) {
            level.exp += xpToGive
            level.total += xpToGive

            if (level.exp > LvlCalc(level.level)) {
                level.exp = level.exp - LvlCalc(level.level)
                level.level += 1
                const LvlUpEmbed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`**Server Ranking - Level Up**`)
                    .setDescription(`**<:LYG_MioAwoo:942060912351772774> Chúc Mừng ${message.member} Đã Lên 1 Level!!!**\n> <:LYG_MioWink:1086172116916912198> Cấp Bậc Hiện Tại Của Bạn: **${level.level - 1} >>> ${level.level}**\n\n<a:OrinSway:1160295722009251870> *Nên Nhớ Rằng:* Level Càng Cao Thì Sẽ Có Nhiều Quyền Lợi Nhé!`)
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                channel1.send({ content: message.member, embeds: [LvlUpEmbed] })
            }
            if (level.total >= 30000 && level.total < 50000 && level.role === false) {
                level.role = true
                const RoleRequestEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(`**Server Ranking - Role Request**`)
                    .setDescription(`**<:LYG_MioAwoo:942060912351772774> Chúc Mừng ${message.member} Đã Vượt Qua Mốc 30K EXP!!!**\n> <:LYG_MioWink:1086172116916912198> Bạn Đã **Có Đủ** Điều Kiện Để Nhận Role Riêng Rồi Nhé!\n\n<:FeelsRan:1152866964637745215> • **Tên Role:** *(Tên Tự Chọn)*\n<:FeelsYukari:1152873847113134140> • **Màu Role:** *(Màu Tự Chọn Theo Mã Hex)*\n\n<:YuyukoWoke:1152872728194469888> **Lưu Ý:** Bạn Đã Có Role Riêng Trước Đó Rồi Thì **MIỄN XIN ROLE** Nhá! Chỉ Có Quyền Thay Tên Và Màu Role Thôi!`)
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                channel2.send({ content: message.member, embeds: [RoleRequestEmbed] })
            } else if (level.total >= 50000 && level.total <= 80000 && level.background === false) {
                level.background = true
                const BackgroundRequestEmbed = new EmbedBuilder()
                    .setColor('Yellow')
                    .setTitle(`**Server Ranking - Background Request**`)
                    .setDescription(`**<:LYG_MioAwoo:942060912351772774> Chúc Mừng ${message.member} Đã Vượt Qua Mốc 50K EXP!!!**\n> <:LYG_MioWink:1086172116916912198> Bạn Đã **Có Đủ** Điều Kiện Để Mở Background Riêng Rồi Nhé!\n\n<:FeelsYoumu:1152874972876898364> Loại Ảnh Dùng Cho Background Bạn Có Quyền Chọn Nhé! **Kích Cỡ Ảnh** (934px ⨯ 282px)\n\n<:YuyukoWoke:1152872728194469888> **Lưu Ý:** Bạn Đã Có Background Trước Đó Rồi Thì **MIỄN XIN BACKGROUND** Nhá! Chỉ Có Quyền Thay Ảnh Background Thôi!`)
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                channel3.send({ content: message.member, embeds: [BackgroundRequestEmbed] })
            } else if (level.total >= 80000 && level.titleicon === false) {
                level.titleicon = true
                const TitleIconRequestEmbed = new EmbedBuilder()
                    .setColor('Blue')
                    .setTitle(`**Server Ranking - Title Icon**`)
                    .setDescription(`**<:LYG_MioAwoo:942060912351772774> Chúc Mừng ${message.member} Đã Vượt Qua Mốc 80K EXP!!!**\n> <:LYG_MioWink:1086172116916912198> Bạn Đã **Có Đủ** Điều Kiện Để Mở Title Và Icon Riêng Rồi Nhé!\n\n<:FeelsOrin:1152867805692170281> **Icon:** Ảnh 1:1 Bất Kì\n<:FeelsYuyuko:1152872215583408138> **Title:** Dòng Title Bất Kì Nhưng **Không Quá 50 Kí Tự VÀ BẰNG TIẾNG ANH** Nhá!\n\n<:YuyukoWoke:1152872728194469888> **Lưu Ý:** Bạn Đã Có Title Và Icon Trước Đó Rồi Thì **MIỄN XIN TITLE VÀ ICON** Nhá! Chỉ Có Quyền Thay Title Và Icon Thôi!`)
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                channel4.send({ content: message.member, embeds: [TitleIconRequestEmbed] })
            }
            await level.save().catch((e) => {
                console.log(`Lỗi Khi Update Level: ${e}`)
                return
            })
            cd.add(message.author.id)
            setTimeout(() => {
                cd.delete(message.author.id)
            }, 30 * 1000)
        }
        //if (!level)
        else {
            const newLevel = new Level({
                UserID: message.author.id,
                GuildID: message.guild.id,
                exp: xpToGive,
                total: xpToGive,
                role: false,
                background: false,
                titleicon: false,
            })
            await newLevel.save()
            cd.add(message.author.id)
            setTimeout(() => {
                cd.delete(message.author.id)
            }, 30 * 1000)
        }
    } catch (error) {
        console.log(`Lỗi Khi Ném Exp: ${error}`)
    }
}