const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const AchievementList = require('../../Database/achievement')
const AchievementAssets = require('../../Assets/Achievements/achievements')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('achievementcheck')
        .setDescription('Kiểm Tra Số Thành Tựu Bạn Có Trong Server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Check Thành Tựu')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const user = interaction.options.getUser('user') || interaction.user

        AchievementList.findOne({ UserID: user.id }, async (err, data) => {
            if (err) return err
            if (!data) {
                const NoData = new EmbedBuilder()
                    .setColor('DarkGreen')
                    .setTitle(`**No Achievement Data**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Người Dùng Là ${user} Hiện Không Có Thành Tựu Nào Cả`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                await interaction.editReply({
                    embeds: [NoData]
                })
            } if (data) {
                //Khai Báo Key, Desc, Type
                //Key
                const AKeys = [
                    data.A1, data.A2, data.A3,
                    data.A4, data.A5, data.A6,
                    data.A7, data.A8, data.A9,
                    data.A10, data.A11
                ]
                //Desc Chuẩn
                var ALog = []
                var AStatement = []
                var AIndexes = [4, 7, 8, 9, 10, 11]
                //Type
                var ARarity = [
                    5, 5, 6,
                    6, 6, 1,
                    2, 3, 4,
                    5, 6
                ]
                var ACounts = 0

                //Nhập Desc Chuẩn
                for (var i = 0; i < AKeys.length; i++) {
                    var Name = AchievementAssets[1][i].slice(17)
                    ALog[i] = Name
                    if (AKeys[i] === "Yes") {
                        ACounts++
                        AStatement[i] = '`✔ Đã Nhận!`'
                    } else {
                        AStatement[i] = '`❌ Chưa Nhận`'
                    }
                    ALog[i] += ` | ${AStatement[i]}`
                }

                //Desc Chuẩn Chính
                var desc = `<:SanaeSparkle:1152875383293743184> • **Số Thành Tựu Của ${user}:** ${ACounts}/${AKeys.length}`
                
                //Gộp 2 Mảng Desc Chuẩn Và Type, Tạo Desc Raw
                var ALog2 = []
                for (var i = 0; i < ALog.length; i++) {
                    ALog2[i] = ARarity[i] + ALog[i]
                }

                //Sort Desc Raw
                ALog2.sort((a, b) => {
                    if (a.slice(0, 1) > b.slice(0, 1)) return -1
                    if (a.slice(0, 1) < b.slice(0, 1)) return 1
                    return 0
                })

                //Nối Desc Lại
                for (var i = 0; i < ALog2.length; i++) {
                    if (i < AIndexes[0]) {
                        if (i === 0) {
                            desc += `\n\n**Thành Tựu 6<:6_s:1193595282714279967>**\n> ${ALog2[i].slice(1)}`
                        } else {
                            desc += `\n> ${ALog2[i].slice(1)}`
                        }
                    } else if (i < AIndexes[1]) {
                        if (i === AIndexes[0]) {
                            desc += `\n\n**Thành Tựu 5<:5_s:1193595526097145906>**\n> ${ALog2[i].slice(1)}`
                        } else {
                            desc += `\n> ${ALog2[i].slice(1)}`
                        }
                    } else if (i < AIndexes[2]) {
                        if (i === AIndexes[1]) {
                            desc += `\n\n**Thành Tựu 4<:4_s:1193595536666804306>**\n> ${ALog2[i].slice(1)}`
                        } else {
                            desc += `\n> ${ALog2[i].slice(1)}`
                        }
                    } else if (i < AIndexes[3]) {
                        if (i === AIndexes[2]) {
                            desc += `\n\n**Thành Tựu 3<:3_s:1193595623883157534>**\n> ${ALog2[i].slice(1)}`
                        } else {
                            desc += `\n> ${ALog2[i].slice(1)}`
                        }
                    } else if (i < AIndexes[4]) {
                        if (i === AIndexes[3]) {
                            desc += `\n\n**Thành Tựu 2<:2_s:1193596744685060127>**\n> ${ALog2[i].slice(1)}`
                        } else {
                            desc += `\n> ${ALog2[i].slice(1)}`
                        }
                    } else if (i < AIndexes[5]) {
                        if (i === AIndexes[4]) {
                            desc += `\n\n**Thành Tựu 1<:1_s:1193597415945678988>**\n> ${ALog2[i].slice(1)}`
                        } else {
                            desc += `\n> ${ALog2[i].slice(1)}`
                        }
                    }
                }

                const AchievementEmbed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`**Miosha - Check Thành Tựu**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`${desc}`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

                await interaction.editReply({
                    embeds: [AchievementEmbed]
                })
            }
        })
    }
}