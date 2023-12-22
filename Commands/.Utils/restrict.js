const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const BanList = require('../../Database/banlist')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restrict')
        .setDescription('Ban Người Dùng Nào Đó Khi Sử Dụng Một Số Lệnh')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Ban Sử Dụng Lệnh')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Thời Gian Ban Sử Dụng (1m, 1h, 1d, 1w...)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Lí Do Bạn Muốn Ban Người Dùng Đó Sử Dụng Lệnh')
                .setRequired(false)),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getUser('user')
        const timestring = interaction.options.getString('duration')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả'

        function getduration(timestring) {
            var time
            timestring.toLowerCase()
            const sec = timestring.lastIndexOf('s')
            if (sec !== -1) {
                time = Number(timestring.substr(0, timestring.length - 1)) * 1000
                return time
            }
            const min = timestring.lastIndexOf('m')
            if (min !== -1) {
                time = Number(timestring.substr(0, timestring.length - 1)) * 1000 * 60
                return time
            }
            const hrs = timestring.lastIndexOf('h')
            if (hrs !== -1) {
                time = Number(timestring.substr(0, timestring.length - 1)) * 1000 * 3600
                return time
            }
            const day = timestring.lastIndexOf('d')
            if (day !== -1) {
                time = Number(timestring.substr(0, timestring.length - 1)) * 24 * 3600 * 1000
                return time
            }
            return time = 0
        }

        function getcontext(timestring) {
            var context
            timestring.toLowerCase()
            const sec = timestring.lastIndexOf('s')
            if (sec !== -1) {
                context = `${Number(timestring.substr(0, timestring.length - 1))} Giây`
                return context
            }
            const min = timestring.lastIndexOf('m')
            if (min !== -1) {
                context = `${Number(timestring.substr(0, timestring.length - 1))} Phút`
                return context
            }
            const hrs = timestring.lastIndexOf('h')
            if (hrs !== -1) {
                context = `${Number(timestring.substr(0, timestring.length - 1))} Giờ`
                return context
            }
            const day = timestring.lastIndexOf('d')
            if (day !== -1) {

                context = `${Number(timestring.substr(0, timestring.length - 1))} Ngày`
                return context
            }
        }

        var color, desc
        const resulttime = getduration(timestring)
        const durationshow = getcontext(timestring)
        if (resulttime > 0) {
            const bantime = Math.floor((Date.now() + resulttime) / 1000)
            const bantime2 = Date.now() + resulttime
            color = 'Red'
            desc = `<:OrinMenace:1169857691456372766> | Đã Ban Nguời Dùng ${target} Khỏi Một Số Lệnh Nhất Định\n> Thời Gian Ban: **${durationshow}** **(<t:${bantime}> | <t:${bantime}:R>)**\n> **Lí Do Ban:** ${reason}`
            if ((bantime2 - Date.now()) > 86400000 * 365 * 100) {
                desc = `<:OrinMenace:1169857691456372766> | Đã Ban Nguời Dùng ${target} Khỏi Một Số Lệnh Nhất Định\n> Thời Gian Ban: **(VÔ THỜI HẠN)**\n> **Lí Do Ban:** ${reason}`
            }
        }
        else if (resulttime === 0) {
            color = 'Green'
            desc = `<:OrinBruh:1160295126996881448> | Thời Gian Là **0** Thì Ban Người Dùng ${target} Dùng Lệnh Để Làm Gì?`
        } else {
            color = 'Red'
            desc = `<:LYG_KeqingDoi:1086190826536849499> | Hãy Nhập Giá Trị Thời Gian Hợp Lệ Đi Bạn!!!`
        }

        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const RestrictEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`Miosha#5189 - Restriction`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(desc)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }
        if (!usingkey) {
            interaction.reply({
                embeds: [NoPerm]
            })
        } else {
            BanList.findOne({ UserID: target.id }, async (err, data) => {
                if (err) throw err
                if (!data) {
                    if (resulttime > 0) {
                        BanList.create({
                            UserID: target.id,
                            Key: true,
                            Time: resulttime + Date.now()
                        })
                        await interaction.reply({
                            embeds: [RestrictEmbed]
                        })
                    } else {
                        await interaction.reply({
                            embeds: [RestrictEmbed]
                        })
                    }
                } if (data) {
                    if (resulttime > 0) {
                        data.Time = resulttime
                        await interaction.reply({
                            embeds: [RestrictEmbed]
                        })
                        data.save
                    } else {
                        await interaction.reply({
                            embeds: [RestrictEmbed]
                        })
                    }
                }
            })
        }
    }
}