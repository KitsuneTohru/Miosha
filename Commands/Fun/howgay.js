//-----Check How Gay, Bản Cải Tiến (v3.0)-----\\
//Giải Thích Code
//======================================================
/*1. Tỉ Lệ: 0% - 101% (Đồng Nghĩa Random 101.1)
**2. Easter Egg (Hiếm) Kích Hoạt Khi Đạt Từ 100.1 - 101%
**3. Có Một Số Entry Đặc Biệt Như 403, 404, 727, ...
/*3. Có Một Số User Sẽ Được Bypass Nó (Tùy Thuộc)
========================================================*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const chalk = require('chalk')

const wait = require('node:timers/promises').setTimeout;
const cdSchema = require('../../Database/cooldown')
const HGList = require('../../Assets/Howgay/hglist')
const HGAssets = require('../../Assets/Howgay/hgassets')
const HGColors = require('../../Assets/Howgay/hgcolors')
const FooterEmbeds = require('../../Utils/embed')
const BanList = require('../../Database/banlist')
const BypassList = require('../../Utils/cdbypass')
const AchievementList = require('../../Database/achievement')
const AchievementAssets = require('../../Assets/Achievements/achievements')
const FunWhiteList = require('../../Utils/funwhitelist')

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
                .setRequired(false)),

    async execute(interaction) {
        //Setup Nhẹ
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        let colortype
        const iuser = await interaction.guild.members.fetch(interaction.user.id)
        //CDTime
        const cdtime = 45000
        //Lấy User Và AvgSet
        const user = interaction.options.getMember('target')
        var avgbool = interaction.options.getBoolean('avgset')
        if (avgbool === null) {
            avgbool = false
        }
        //Set Mảng
        const HGAsset = HGAssets
        const HGColor = HGColors
        const EntryList = HGList
        const NumEntry = [10, 25, 50, 75, 90, 100, 101]
        const SpecialEntry = [40.3, 40.4, 72.7]
        //Easter
        var rngv2 = Math.floor(Math.random() * 100)
        //rngv2 = 95 //Test Thì Gỡ, Còn Không Thì Đừng Lạm Dụng XD
        const easter_url = HGAsset[0][3]
        const easter_result = '<:LYG_XD:1087375888276000788> **|** Không Sao Không Sao, Có Chủ Nhân Ở Đây Biến Đổi Cậu Rồi, Cậu Sẽ Là Thuộc Hạ Của Tôi Thôi\nSrc: Manga From: **Shio Ayatsuki** ||Thực Chất Là Bộ "210" Đấy Á =))||'
        const spcl_chr = ('`/howgay`')
        const H100PlusEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle('🏳️‍🌈 **- Bí Mật Của Command XD...**')
            .setColor(HGColor[1][1])
            .setDescription(`${easter_result}`)
            .setTimestamp()
            .setImage(easter_url)
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        //Chờ Embed...
        const CalcEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
            .setColor('#FFFFFF')
            .setDescription(`<a:LYG_LoadSlot:1087377575107645569> **|** Hệ Thống Đang Kiểm Tra Độ Gay Của ${user}... Xin Chờ Một Lát...\n**LƯU Ý:** Đừng Lấy Chuyện Này Làm Chuyện Nghiêm Túc Nhá! Quạo Rồi Không Ai Chịu Trách Nhiệm Đâu!`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        //Lock User + Hàm Lấy So Sánh
        const lock_user = FunWhiteList
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
        var lock_desc, lock_img
        lock_desc = `<:LYG_KeqingDoi:1086190826536849499> **|** Oi! Bạn **KHÔNG THỂ** Check Câu Lệnh ${spcl_chr} Lên ${user} Được! Hãy Thử Với Người Khác Đi!`
        lock_img = HGAsset[0][0]
        if (user.id === '764825231335620619') {
            lock_desc = `<:go_MokouFire:1092052285732954132> **|** Để Tưởng Nhớ Người Bạn Đã Khuất Của Chủ Bot, Bạn **KHÔNG THỂ** Check Câu Lệnh ${spcl_chr} Lên ${user} Được! Hãy Thử Với Người Khác Đi Nhá!\n> **Kitsunezi's Note:** *"Vĩnh Biệt, Người Bạn Tốt Của Tôi, Ông Là Người Đã Mở Đường Cho Tôi Đến Với Sự Nghiệp Này. An Nghỉ Nhé, Shen, Bạn Tôi..."*`
            lock_img = HGAsset[0][1]
        }

        const SpecialEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
            .setColor('#6E0000')
            .setDescription(lock_desc)
            .setTimestamp()
            .setImage(lock_img)
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        //Ban Function
        let banbool = await BanList.findOne({ UserID: interaction.user.id })
        if (!banbool) {
            if (user.id === '1061527111829041242') {
                BanList.create({
                    UserID: interaction.user.id,
                    Key: true,
                    Time: Date.now() + (86400000 * 9999999)
                })
            }
            else if (user.id === '764825231335620619') {
                BanList.create({
                    UserID: interaction.user.id,
                    Key: true,
                    Time: Date.now() + (86400000 * 9999999)
                })
            }
            else if (lock_output && user.id === '751225225047179324') {
                BanList.create({
                    UserID: interaction.user.id,
                    Key: true,
                    Time: Date.now() + 86400000 * 14
                })
            }
        }
        if (banbool) {
            if (banbool.Time > Date.now()) {
                //Ban Embed
                var timetxt = `<t:${Math.floor(banbool.Time / 1000)}> (<t:${Math.floor(banbool.Time / 1000)}:R>)`
                if ((banbool.Time - Date.now()) > 86400000 * 365 * 100) {
                    timetxt = '**(VÔ THỜI HẠN)**'
                }
                const BanEmbed = new EmbedBuilder()
                    .setColor('DarkOrange')
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    .setTitle('<:OrinMenace:1169857691456372766> **Banned From Using Command**')
                    .setDescription(`<a:LYG_FububiShake:1129764112004558950> • Bạn Đã Bị BAN, Bạn Hoàn Toàn KHÔNG CÓ QUYỀN ĐƯỢC SỬ DỤNG LỆNH NÀY!!!\n<a:LYG_Clock:1084322030331105370> **Thời Gian Bị Ban:** ${timetxt} `)
                    .setTimestamp()
                await interaction.editReply({
                    embeds: [BanEmbed]
                })
            } else {
                //Unban Embed
                const UnbanEmbed = new EmbedBuilder()
                    .setColor('DarkGreen')
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    .setTitle('<:YayyShinki:1184437427050381342> **Unbanned From Using Command**')
                    .setDescription(`<a:LYG_FububiShake:1129764112004558950> • Đã Gỡ Ban Sử Dụng Command Này Cho Bạn, Vì Vậy Hãy Cẩn Thận Khi Động Phải Nhầm Người Nhá!`)
                    .setTimestamp()
                await interaction.editReply({
                    embeds: [UnbanEmbed]
                })
                banbool.deleteOne({ UserID: interaction.user.id })
            }
            return
        }

        //avgbool == False
        if (avgbool == false) {
            var rng = Math.random() * 101.1
            rng = (Math.floor(rng * 10) / 10).toFixed(1)
            //rng = 0.1 //CHỈ GỠ KHI TEST (CẤM LẠM DỤNG NHÁ XD)

            var img_url, color, result

            for (var i = 0; i < NumEntry.length; i++) {
                if (rng <= NumEntry[i]) {
                    img_url = HGAsset[0][2]
                    color = HGColor[0][i]
                    colortype = chalk.hex(`${color}`)
                    result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n` + EntryList[i][Math.floor(Math.random() * EntryList[i].length)]
                    for (var j = 0; j < SpecialEntry.length; j++) {
                        if (rng === SpecialEntry[j]) {
                            color = HGColor[1][0]
                            img_url = HGAsset[3][j]
                            result = `Chỉ Số Gay Của ${user} Là: **${rng}%**\n` + EntryList[7][j]
                            break
                        }
                    }
                    if (interaction.guild.id === '900742301373042809') {
                        if (rng < 1) {
                            img_url = HGAsset[1][Math.floor(Math.random() * HGAsset[1].length)]
                            if (interaction.guild.id === '900742301373042809') {
                                result += '\n> Bạn Đã Được Nhận Role Tặng Kèm: <@&1171750121109733438>\n> Ghi Chú: Nếu Bạn Có Role <@&1162944612508377088> Thì Bạn Chỉ Được Gỡ Role Này Thôi, Không Nhận Role Kia'
                            }
                            break
                        }
                        if (rng > 100) {
                            img_url = HGAsset[2][Math.floor(Math.random() * HGAsset[2].length)]
                            if (interaction.guild.id === '900742301373042809') {
                                result += '\n> Bạn Đã Được Nhận Role Tặng Kèm: <@&1162944612508377088>\n> Ghi Chú: Nếu Bạn Có Role <@&1171750121109733438> Thì Bạn Chỉ Được Gỡ Role Này Thôi, Không Nhận Role Kia'
                            }
                            break
                        }
                    }
                    break
                }
            }
            console.log('========================================\nRng Encounter:', colortype(`${rng}`), '\nRngv2 Encounter:', rngv2, '\n========================================')
        }
        //avgbool == True
        else {
            var a = []
            var avgpt = 0, colorv2, resultv2, resultv3, img_urlv2, rngv3, colorv3

            for (var i = 0; i < 3; i++) {
                rngv3 = Math.random() * 101.1
                rngv3 = (Math.floor(rngv3 * 10) / 10).toFixed(1)
                avgpt = avgpt + Number(rngv3)
                for (var j = 0; j < NumEntry.length; j++) {
                    if (rngv3 <= NumEntry[j]) {
                        colorv3 = HGColor[0][j]
                        colortype = chalk.hex(`${colorv3}`)
                        break
                    }
                }
                resultv2 = (`<a:LYG_Ping:900775951317737473> **|** Chỉ Số Gay Của ${user} **__(Lần: ${i + 1})__** Là: **${rngv3}%**`)
                a[i] = resultv2
                console.log('========================================\nTính Toán Theo Rngv3 (Lần', `${i + 1}) =`, colortype(`${rngv3}`), '\n========================================')
            }

            avgpt = avgpt / 3
            avgpt = (Math.floor(avgpt * 10) / 10).toFixed(1)
            //avgpt = 0.1 //CHỈ GỠ KHI TEST (CẤM LẠM DỤNG NHÁ XD)

            for (var i = 0; i < NumEntry.length; i++) {
                if (avgpt <= NumEntry[i]) {
                    img_urlv2 = HGAsset[0][2]
                    colorv2 = HGColor[0][i]
                    colortype = chalk.hex(`${colorv2}`)
                    resultv3 = `Chỉ Số Gay Của ${user} Là: **${avgpt}%**\n` + EntryList[i][Math.floor(Math.random() * EntryList[i].length)]
                    for (var j = 0; j < SpecialEntry.length; j++) {
                        if (avgpt === SpecialEntry[j]) {
                            colorv2 = HGColor[1][0]
                            img_urlv2 = HGAsset[3][j]
                            resultv3 = `Chỉ Số Gay Của ${user} Là: **${avgpt}%**\n` + EntryList[7][j]
                            break
                        }
                    }
                    if (interaction.guild.id === '900742301373042809') {
                        if (avgpt < 1) {
                            img_urlv2 = HGAsset[1][Math.floor(Math.random() * HGAsset[1].length)]
                            if (interaction.guild.id === '900742301373042809') {
                                resultv3 += '\n> Bạn Đã Được Nhận Role Tặng Kèm: <@&1171750121109733438>\n> Ghi Chú: Nếu Bạn Có Role <@&1162944612508377088> Thì Bạn Chỉ Được Gỡ Role Này Thôi, Không Nhận Role Kia'
                            }
                            break
                        }
                        if (avgpt > 100) {
                            img_urlv2 = HGAsset[2][Math.floor(Math.random() * HGAsset[2].length)]
                            if (interaction.guild.id === '900742301373042809') {
                                resultv3 += '\n> Bạn Đã Được Nhận Role Tặng Kèm: <@&1162944612508377088>\n> Ghi Chú: Nếu Bạn Có Role <@&1171750121109733438> Thì Bạn Chỉ Được Gỡ Role Này Thôi, Không Nhận Role Kia'
                            }
                            break
                        }
                    }
                    break
                }
            }
            console.log('========================================\nAvgpt Calc:', colortype(`${avgpt}`), '\nRngv2 Encounter:', rngv2, '\n========================================')
        }

        const auser = interaction.user.id
        const CDPassList = BypassList
        function BypassCD(auser) {
            for (var i in CDPassList) {
                if (auser === CDPassList[i]) {
                    return true
                }
            }
            return false
        }
        const Bypass_ = BypassCD(auser)
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDHowgay: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDHowgay
                console.log(chalk.yellow('[Command: Howgay]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)
                if (CDTime > Date.now() && !Bypass_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDHowgay = Date.now() + cdtime
                    data.save()
                    //Reply(Phụ Thuộc Vào Điều Kiện)
                    if (lock_output) {
                        await interaction.editReply({
                            embeds: [SpecialEmbed]
                        })
                    } else {
                        if (!avgbool) {
                            await interaction.editReply({
                                embeds: [CalcEmbed]
                            })
                            await wait(1000)
                            const GayEmbed_1 = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
                                .setColor(color)
                                .setDescription(`${result}`)
                                .setTimestamp()
                                .setImage(img_url)
                                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

                            await interaction.editReply({
                                embeds: [GayEmbed_1]
                            })

                            await wait(500)
                            if (rng > 100 && rngv2 >= 95) {
                                await interaction.followUp({
                                    embeds: [H100PlusEmbed]
                                })
                            }
                        }
                        else {
                            await interaction.editReply({
                                embeds: [CalcEmbed]
                            })

                            await wait(1000)
                            const AvgGayEmbed = []
                            const color1 = 'DarkButNotBlack'
                            const color2 = colorv2
                            const imgv2 = img_urlv2
                            const avgdesc = [
                                `<a:LYG_Clock:1084322030331105370> Đang Trong Tính Toán... Xin Hãy Kiên Nhẫn...\n> ${a[0]}`,
                                `<a:LYG_Clock:1084322030331105370> Đang Trong Tính Toán... Xin Hãy Kiên Nhẫn...\n> ${a[0]}\n> ${a[1]}`,
                                `<a:LYG_Clock:1084322030331105370> Đang Trong Tính Toán... Xin Hãy Kiên Nhẫn...\n> ${a[0]}\n> ${a[1]}\n> ${a[2]}`,
                                `<a:LYG_Star:1084085189174632538> Kết Quả Khảo Sát:\n> ${a[0]}\n> ${a[1]}\n> ${a[2]}\n${resultv3}`,
                            ]
                            for (var count = 0; count <= 3; count++) {
                                var finalcolor
                                if (count < 3) {
                                    finalcolor = color1
                                }
                                else {
                                    finalcolor = color2
                                }
                                AvgGayEmbed[count] = new EmbedBuilder()
                                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                    .setTitle('🏳️‍🌈 **- Check Chỉ Số Gay Của Ai Đó...**')
                                    .setColor(finalcolor)
                                    .setDescription(avgdesc[count])
                                    .setTimestamp()
                                    .setImage(imgv2)
                                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            }
                            for (var embed = 0; embed <= 3; embed++) {
                                if (!lock_output) {
                                    await wait(500)
                                    await interaction.editReply({
                                        embeds: [AvgGayEmbed[embed]]
                                    })
                                }
                                else break
                            }

                            await wait(500)
                            if (rng > 100 && rngv2 >= 95) {
                                await interaction.editReply({
                                    embeds: [H100PlusEmbed]
                                })
                            }
                        }
                    }
                }
            }
            //Roles On Howgay
            if (interaction.guild.id === '900742301373042809') {
                const role1 = interaction.guild.roles.cache.get('1171750121109733438') //Giga Chad
                const role2 = interaction.guild.roles.cache.get('1162944612508377088') //Gay
                if (rng < 1 || avgpt < 1) {
                    if (user.roles.cache.has(role2.id)) {
                        user.roles.remove(role2)
                    }
                    else {
                        user.roles.add(role1)
                    }
                }
                if (rng > 100 || avgpt > 100) {
                    if (user.roles.cache.has(role1.id)) {
                        user.roles.remove(role1)
                    }
                    else {
                        user.roles.add(role2)
                    }
                }

            }

            //Achievements On Howgay
            var achievementdesc, achievementlink, achievementcolor = '#000000'
            var a1key = "No", a2key = "No", a3key = "No"
            if (rng > 100 || avgpt > 100) {
                achievementdesc = `> Chúc Mừng Người Dùng ${user} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][0]}`
                achievementlink = AchievementAssets[0][0]
                achievementcolor = AchievementAssets[2][1]
                a1key = "Yes"
            }
            if (rng < 1 || avgpt < 1) {
                achievementdesc = `> Chúc Mừng Người Dùng ${user} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][1]}`
                achievementlink = AchievementAssets[0][1]
                achievementcolor = AchievementAssets[2][1]
                a2key = "Yes"
            }
            if (rng === 72.7 || avgpt === 72.7) {
                achievementdesc = `> Chúc Mừng Người Dùng ${user} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][2]}`
                achievementlink = AchievementAssets[0][2]
                achievementcolor = AchievementAssets[2][0]
                a3key = "Yes"
            }

            const HGAchivements = new EmbedBuilder()
                .setColor(achievementcolor)
                .setTitle(`<:YuyukoWoah:1152872168439423050> **Achievement Unlocked!!!**`)
                .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setDescription(`${achievementdesc}`)
                .setTimestamp()
                .setImage(achievementlink)
                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

            AchievementList.findOne({ UserID: user.id }, async (err, data1) => {
                if (err) throw err
                if (!data1) {
                    AchievementList.create({
                        UserID: user.id,
                        A1: a1key,
                        A2: a2key,
                        A3: a3key
                    })
                    if (a1key === "Yes " || a2key === "Yes" || a3key === "Yes") {
                        await interaction.followUp({
                            embeds: [HGAchivements],
                        })
                    }
                } if (data1) {
                    const A1 = data1.A1
                    const A2 = data1.A2
                    const A3 = data1.A3

                    if (!A1) {
                        data1.A1 = a1key
                    }
                    if (!A2) {
                        data1.A2 = a2key
                    }
                    if (!A3) {
                        data1.A3 = a3key
                    }

                    if (A1 === 'No') {
                        if (rng > 100 || avgpt > 100) {
                            data1.A1 = 'Yes'
                            await interaction.followUp({
                                embeds: [HGAchivements],
                            })
                        }
                    }
                    if (A2 === 'No') {
                        if (rng < 1 || avgpt < 1) {
                            data1.A2 = 'Yes'
                            await interaction.followUp({
                                embeds: [HGAchivements],
                            })
                        }
                    }
                    if (A3 === 'No') {
                        if (rng === 72.7 || avgpt === 72.7) {
                            data1.A3 = 'Yes'
                            await interaction.followUp({
                                embeds: [HGAchivements],
                            })
                        }
                    }
                    data1.save()
                }
            })
        })
    }
}