const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const RolePass = require('../../Utils/rolebypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Dùng Để Timeout Một Ai Đó Trong Server')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Người Dùng Bạn Muốn Timeout')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('duration')
                .setDescription('Thời Lượng Mà Bạn Muốn Timeout (Ví Dụ: 1d, 1m,...)')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Lí Do Bạn Timeout (Không Bắt Buộc)')
                .setRequired(false)),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds

        const target = interaction.options.getUser('user')
        const timestring = interaction.options.getString('duration')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả'

        const member = await interaction.guild.members.fetch(target.id)
        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        const logchannel = await interaction.guild.channels.fetch('1165537322943643678')

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
                if (Number(timestring.substr(0, timestring.length - 1)) > 28) {
                    time = 28 * 24 * 3600 * 1000
                } else {
                    time = Number(timestring.substr(0, timestring.length - 1)) * 24 * 3600 * 1000
                }
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
                if (Number(timestring.substr(0, timestring.length - 1)) > 28) {
                    context = `28 Ngày`
                } else {
                    context = `${Number(timestring.substr(0, timestring.length - 1))} Ngày`
                    return context
                }
            }
        }
        var color, desc, logdesc
        const resulttime = getduration(timestring)
        const durationshow = getcontext(timestring)

        var key = false
        const PassList = RolePass
        for (var i = 0; i < PassList.length; i++) {
            if (member.roles.cache.has(PassList[i])) {
                key = true
                break
            }
        }

        if (resulttime > 0) {
            const endtimeout = Math.floor((Date.now() + resulttime) / 1000)
            if (key) {
                color = 'Red'
                desc = `<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Thể Timeout ${target} Được Vì Tớ Không Đủ Thẩm Quyền!!!`
            } else {
                color = 'Green'
                desc = `<:LYG_Yae_Sip:954973168123134002> | Đã Timeout Người Dùng ${target}\n> Thời Gian Timeout: **${durationshow}** **(<t:${endtimeout}> | <t:${endtimeout}:R>)**\n> **Lí Do Timeout:** ${reason}`
                logdesc = `<:LYG_Yae_Sip:954973168123134002> **__Hành Động: Timeout__**\n\n> **Người Dùng:** ${target}\n> **Thời Gian Timeout:** ${durationshow} **(<t:${endtimeout}> | <t:${endtimeout}:R>)**\n> **Lí Do Timeout:** ${reason}\n> **Người Thực Hiện:** ${interaction.user}`
                if (Number(timestring.substr(0, timestring.length - 1)) > 28) {
                    desc = `${desc}\nNote: Thời Gian Bạn Nhập Quá 28 Ngày, Discord Chỉ Cho Phép Bạn Timeout Tối Đa 28 Ngày Thôi`
                    logdesc = `${logdesc}\n> **Note:** Thời Gian Quá 28 Ngày, Discord Chỉ Cho Phép Bạn Timeout Tối Đa 28 Ngày Thôi`
                }
            }
        } else if (resulttime === 0) {
            color = 'Green'
            desc = `<:LYG_Yae_Sip:954973168123134002> | Đã Gỡ Timeout Người Dùng ${target}\n\n> **Lí Do Gỡ Timeout:** ${reason}`
            logdesc = `<:LYG_Yae_Sip:954973168123134002> **__Hành Động: Gỡ Timeout__**\n\n> **Người Dùng:** ${target}\n> **Lí Do Gỡ Timeout:** ${reason}\n> **Người Thực Hiện:** ${interaction.user}`
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

        const TimeoutEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`Miosha#5189 - Timeout`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(desc)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const LogEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`Miosha#5189 - Logger`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(logdesc)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        
        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        if (!usingkey) {
            return interaction.reply({
                embeds: [NoPerm]
            })
        } else {
            if (key) {
                return interaction.reply({
                    embeds: [TimeoutEmbed]
                })
            } else if (resulttime > 0) {
                await member.timeout(resulttime)
                await interaction.reply({
                    embeds: [TimeoutEmbed]
                })
                logchannel.send({
                    embeds: [LogEmbed]
                })
            } else if (resulttime === 0) {
                await member.timeout(null)
                await interaction.reply({
                    embeds: [TimeoutEmbed]
                })
                logchannel.send({
                    embeds: [LogEmbed]
                })
            } else {
                await interaction.reply({
                    embeds: [TimeoutEmbed]
                })
            }
        }
    }
}