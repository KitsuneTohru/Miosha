const { Client, Message, EmbedBuilder, ChannelType } = require('discord.js')
const Level = require('../../Database/level')
const LvlCalc = require('../../Utils/lvlcalc')
const cd = new Set()
const WhiteListedChannel = require('../../Utils/rankchannels')
const FooterEmbeds = require('../../Utils/embed')
const RankingRoles = require('../../Utils/ranking')
const AchievementList = require('../../Database/achievement')
const AchievementAssets = require('../../Assets/Achievements/achievements')

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

    const FooterEmbeds_ = FooterEmbeds

    if (message.channel.type === ChannelType.DM || message.channel.type === ChannelType.GroupDM) return
    if (message.guild.id !== '900742301373042809' || message.author.bot || cd.has(message.author.id)) return

    if ((message.content.length) <= 1) return

    const DMUser = message.author
    const WhiteList = WhiteListedChannel
    var key = false
    for (i in WhiteList) {
        if (message.channel.id === WhiteList[i])
            key = true
    }
    if (key === false) return
    const xpToGive = Math.floor(Math.random() * 10) + 1 //Random Exp Line
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
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.member.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`**<:LYG_MioAwoo:942060912351772774> Chúc Mừng ${message.member} Đã Lên 1 Level!!!**\n> <:LYG_MioWink:1086172116916912198> Cấp Bậc Hiện Tại Của Bạn: **${level.level - 1} >>> ${level.level}**\n\n<a:OrinSway:1160295722009251870> *Nên Nhớ Rằng:* Level Càng Cao Thì Sẽ Có Nhiều Quyền Lợi Nhé!`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                channel1.send({ content: `<@${message.member.id}> Thông Báo Level Up`, embeds: [LvlUpEmbed] })
            }
            if (level.level === 20 && level.role === false) {
                level.role = true
                const RoleRequestEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(`**Server Ranking - Role Request**`)
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.member.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<:LYG_MioAwoo:942060912351772774> Chúc Mừng ${message.member} Đã Chạm **Level 20!!!**\n> <:LYG_MioWink:1086172116916912198> Bạn Đã **Có Đủ** Điều Kiện Để Nhận Role Riêng Rồi Nhé!\n\n<:FeelsRan:1152866964637745215> • **Tên Role:** *(Tên Tự Chọn)*\n<:FeelsYukari:1152873847113134140> • **Màu Role:** *(Màu Tự Chọn Theo Mã Hex)*\n\n<:YuyukoWoke:1152872728194469888> **Lưu Ý:** Bạn Đã Có Role Riêng Trước Đó Rồi Thì **MIỄN XIN ROLE** Nhá! Chỉ Có Quyền Thay Tên Và Màu Role Thôi!`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                try {
                    DMUser.send({
                        content: `<@${message.member.id}> Thông Báo Nhận Role`, embeds: [RoleRequestEmbed]
                    })
                } catch (err) {
                    channel2.send({ content: `<@${message.member.id}> Thông Báo Nhận Role (Vì DMs Của Người Dùng Không Mở)`, embeds: [RoleRequestEmbed] })
                }
            } else if (level.level === 30 && level.background === false) {
                level.background = true
                const BackgroundRequestEmbed = new EmbedBuilder()
                    .setColor('Yellow')
                    .setTitle(`**Server Ranking - Background Request**`)
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.member.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<:LYG_MioAwoo:942060912351772774> Chúc Mừng ${message.member} Đã Chạm **Level 30!!!**\n> <:LYG_MioWink:1086172116916912198> Bạn Đã **Có Đủ** Điều Kiện Để Mở Background Riêng Rồi Nhé!\n\n<:FeelsYoumu:1152874972876898364> Loại Ảnh Dùng Cho Background Bạn Có Quyền Chọn Nhé! **Kích Cỡ Ảnh** (934px ⨯ 282px)\n\n<:YuyukoWoke:1152872728194469888> **Lưu Ý:** Bạn Đã Có Background Trước Đó Rồi Thì **MIỄN XIN BACKGROUND** Nhá! Chỉ Có Quyền Thay Ảnh Background Thôi!`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                try {
                    DMUser.send({
                        content: `<@${message.member.id}> Thông Báo Nhận Role`, embeds: [BackgroundRequestEmbed]
                    })
                } catch (err) {
                    channel3.send({ content: `<@${message.member.id}> Thông Báo Nhận Role (Vì DMs Của Người Dùng Không Mở)`, embeds: [BackgroundRequestEmbed] })
                }
            } else if (level.level === 40 && level.titleicon === false) {
                level.titleicon = true
                const TitleIconRequestEmbed = new EmbedBuilder()
                    .setColor('Blue')
                    .setTitle(`**Server Ranking - Title Icon**`)
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.member.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<:LYG_MioAwoo:942060912351772774> Chúc Mừng ${message.member} Đã Chạm **Level 40!!!**\n> <:LYG_MioWink:1086172116916912198> Bạn Đã **Có Đủ** Điều Kiện Để Mở Title Và Icon Riêng Rồi Nhé!\n\n<:FeelsOrin:1152867805692170281> **Icon:** Ảnh 1:1 Bất Kì\n<:FeelsYuyuko:1152872215583408138> **Title:** Dòng Title Bất Kì Nhưng **Không Quá 45 Kí Tự (Tính Cả Dấu Cách) VÀ BẰNG TIẾNG ANH** Nhá!\n\n<:YuyukoWoke:1152872728194469888> **Lưu Ý:** Bạn Đã Có Title Và Icon Trước Đó Rồi Thì **MIỄN XIN TITLE VÀ ICON** Nhá! Chỉ Có Quyền Thay Title Và Icon Thôi!`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                try {
                    DMUser.send({
                        content: `<@${message.member.id}> Thông Báo Nhận Role`, embeds: [TitleIconRequestEmbed]
                    })
                } catch (err) {
                    channel4.send({ content: `<@${message.member.id}> Thông Báo Nhận Role (Vì DMs Của Người Dùng Không Mở)`, embeds: [TitleIconRequestEmbed] })
                }
            }
            await level.save().catch((e) => {
                console.log(`Lỗi Khi Update Level: ${e}`)
                return
            })
            cd.add(message.author.id)
            setTimeout(() => {
                cd.delete(message.author.id)
            }, 5 * 1000) //CD Give Exp
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
            }, 5 * 1000) //CD Give Exp
        }
    } catch (error) {
        console.log(`Lỗi Khi Ném Exp: ${error}`)
    }

    Level.findOne({ UserID: message.author.id }, async (err, data) => {
        if (err) throw err
        if (!data) return
        if (data) {
            const level = data.level
            const total = data.total

            if (level > 0 && level <= 4) {
                const role = message.guild.roles.cache.get(RankingRoles[0])
                if ((level % 4) === 0) {
                    if (!message.member.roles.cache.has(RankingRoles[0])) {
                        message.member.roles.add(role)
                    }
                }
            } else if (level !== 0) {
                for (var i = 0; i < RankingRoles.length; i++) {
                    var role1 = message.guild.roles.cache.get(RankingRoles[i])
                    var role2 = message.guild.roles.cache.get(RankingRoles[i + 1])
                    if (((level / 4) - 1) === RankingRoles.indexOf(RankingRoles[i + 1]) && level <= RankingRoles.length * 3) {
                        if (!message.member.roles.cache.has(RankingRoles[i + 1])) {
                            message.member.roles.add(role2)
                            message.member.roles.remove(role1)
                            break
                        }
                    }
                }
            }
            if (total >= 12000) {
                const role3 = message.guild.roles.cache.get('967803874259898388')
                if (!message.member.roles.cache.has('967803874259898388')) {
                    message.member.roles.add(role3)
                }
            }
            if (total >= 60000) {
                const role4 = message.guild.roles.cache.get('900750143605866516')
                if (!message.member.roles.cache.has('900750143605866516')) {
                    message.member.roles.add(role4)
                }
            }
        }
    })

    //Level Achievements
    Level.findOne({ UserID: message.author.id }, async (err, data) => {
        if (err) throw err
        if (!data) return
        if (data) {
            const curlvl = data.level
            var a6key = "No", a7key = "No", a8key = "No", a9key = "No", a10key = "No", a11key = "No"
            var achievementdesc, achievementlink, achievementcolor = '#000000'

            if (1 <= curlvl && curlvl < 5) {
                a6key = "Yes"
            } else if (5 <= curlvl && curlvl < 10) {
                a7key = "Yes"
            } else if (10 <= curlvl && curlvl < 20) {
                a8key = "Yes"
            } else if (20 <= curlvl && curlvl < 30) {
                a9key = "Yes"
            } else if (30 <= curlvl && curlvl < 40) {
                a10key = "Yes"
            } else if (40 <= curlvl) {
                a11key = "Yes"
            }

            if (a6key === "Yes") {
                achievementdesc = `> Chúc Mừng Người Dùng ${message.member} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][5]}`
                achievementlink = AchievementAssets[0][5]
                achievementcolor = AchievementAssets[2][5]
            }

            if (a7key === "Yes") {
                achievementdesc = `> Chúc Mừng Người Dùng ${message.member} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][6]}`
                achievementlink = AchievementAssets[0][6]
                achievementcolor = AchievementAssets[2][4]
            }

            if (a8key === "Yes") {
                achievementdesc = `> Chúc Mừng Người Dùng ${message.member} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][7]}`
                achievementlink = AchievementAssets[0][7]
                achievementcolor = AchievementAssets[2][3]
            }

            if (a9key === "Yes") {
                achievementdesc = `> Chúc Mừng Người Dùng ${message.member} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][8]}`
                achievementlink = AchievementAssets[0][8]
                achievementcolor = AchievementAssets[2][2]
            }

            if (a10key === "Yes") {
                achievementdesc = `> Chúc Mừng Người Dùng ${message.member} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][9]}`
                achievementlink = AchievementAssets[0][9]
                achievementcolor = AchievementAssets[2][1]
            }

            if (a11key === "Yes") {
                achievementdesc = `> Chúc Mừng Người Dùng ${message.member} Đã Mở Khóa Thành Tựu Mới!!!\n${AchievementAssets[1][10]}`
                achievementlink = AchievementAssets[0][10]
                achievementcolor = AchievementAssets[2][0]
            }

            const RankingAchivements = new EmbedBuilder()
                .setColor(achievementcolor)
                .setTitle(`<:YuyukoWoah:1152872168439423050> **Achievement Unlocked!!!**`)
                .setAuthor({ name: `${message.author.username}`, iconURL: `${message.member.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setDescription(`${achievementdesc}`)
                .setTimestamp()
                .setImage(achievementlink)
                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

            AchievementList.findOne({ UserID: message.author.id }, async (err, data1) => {
                if (err) throw err
                if (!data1) {
                    AchievementList.create({
                        UserID: message.author.id,
                        A6: a6key,
                        A7: a7key,
                        A8: a8key,
                        A9: a9key,
                        A10: a10key,
                        A11: a11key
                    })
                    if (a6key === "Yes" || a7key === "Yes" || a8key === "Yes" || a9key === "Yes" || a10key === "Yes" || a11key === "Yes") {
                        await message.channel.send({
                            embeds: [RankingAchivements]
                        })
                    }
                }
                if (data1) {
                    const A6 = data1.A6
                    const A7 = data1.A7
                    const A8 = data1.A8
                    const A9 = data1.A9
                    const A10 = data1.A10
                    const A11 = data1.A11

                    if (!A6) {
                        data1.A6 = a6key
                    }
                    if (!A7) {
                        data1.A7 = a7key
                    }
                    if (!A8) {
                        data1.A8 = a8key
                    }
                    if (!A9) {
                        data1.A9 = a9key
                    }
                    if (!A10) {
                        data1.A10 = a10key
                    }
                    if (!A11) {
                        data1.A11 = a11key
                    }

                    if (A6 === "No") {
                        if (1 <= curlvl && curlvl < 5) {
                            data1.A6 = "Yes"
                            await message.channel.send({
                                embeds: [RankingAchivements]
                            })
                        }
                    }

                    if (A7 === "No") {
                        if (5 <= curlvl && curlvl < 10) {
                            data1.A7 = "Yes"
                            await message.channel.send({
                                embeds: [RankingAchivements]
                            })
                        }
                    }

                    if (A8 === "No") {
                        if (10 <= curlvl && curlvl < 20) {
                            data1.A8 = "Yes"
                            await message.channel.send({
                                embeds: [RankingAchivements]
                            })
                        }
                    }

                    if (A9 === "No") {
                        if (20 <= curlvl && curlvl < 30) {
                            data1.A9 = "Yes"
                            await message.channel.send({
                                embeds: [RankingAchivements]
                            })
                        }
                    }

                    if (A10 === "No") {
                        if (30 <= curlvl && curlvl < 40) {
                            data1.A10 = "Yes"
                            await message.channel.send({
                                embeds: [RankingAchivements]
                            })
                        }
                    }

                    if (A11 === "No") {
                        if (40 <= curlvl) {
                            data1.A11 = "Yes"
                            await message.channel.send({
                                embeds: [RankingAchivements]
                            })
                        }
                    }
                    data1.save()
                }
            })
        }
    })
}