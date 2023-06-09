const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Dùng Để Timeout Một Ai Đó Trong Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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

        const target = interaction.options.getUser('user')
        const timestring = interaction.options.getString('duration')
        const reason = interaction.options.getString('reason') || 'Không Có Lí Do Nào Cả'

        const member = await interaction.guild.members.fetch(target.id)

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
        var color, desc
        const resulttime = getduration(timestring)
        const durationshow = getcontext(timestring)

        if (resulttime > 0) {
            const endtimeout = Math.floor((Date.now() + resulttime) / 1000)
            if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                color = 'Red'
                desc = `<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Thể Timeout ${target} Được Vì Tớ Không Đủ Thẩm Quyền!!!`
            } else {
                color = 'Green'
                desc = `<:LYG_Yae_Sip:954973168123134002> | Đã Timeout Người Dùng ${target}\n> Thời Gian Timeout: **${durationshow}** **(<t:${endtimeout}> | <t:${endtimeout}:R>)**\n> **Lí Do Timeout:** ${reason}`
                if (Number(timestring.substr(0, timestring.length - 1)) > 28) {
                    desc = `${desc}\nNote: Thời Gian Bạn Nhập Quá 28 Ngày, Discord Chỉ Cho Phép Bạn Timeout Tối Đa 28 Ngày Thôi`
                }
            }
        } else if (resulttime === 0) {
            color = 'Green'
            desc = `<:LYG_Yae_Sip:954973168123134002> | Đã Gỡ Timeout Người Dùng ${target}\n\n> **Lí Do Gỡ Timeout:** ${reason}`
        } else {
            color = 'Red'
            desc = `<:LYG_KeqingDoi:1086190826536849499> | Hãy Nhập Giá Trị Thời Gian Hợp Lệ Đi Bạn!!!`
        }


        const TimeoutEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`Miosha#5189 - Timeout`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(desc)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                embeds: [TimeoutEmbed]
            })
        } else if (resulttime > 0) {
            await member.timeout(resulttime)
            await interaction.reply({
                embeds: [TimeoutEmbed]
            })
        } else if (resulttime === 0) {
            await member.timeout(null)
            await interaction.reply({
                embeds: [TimeoutEmbed]
            })
        } else {
            await interaction.reply({
                embeds: [TimeoutEmbed]
            })
        }
    }
}