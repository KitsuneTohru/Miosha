const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Level = require('../../Database/level')
const cdSchema = require('../../Database/cooldown')
const lvlcalc = require('../../Utils/lvlcalc')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Hiển Thị Top Ranking Của Toàn Server')
        .addNumberOption(option =>
            option.setName('page')
                .setDescription('Hiển Thị Bảng Xếp Hạng Trong Server')
                .setMinValue(1)
                .setRequired(false)),
    async execute(interaction) {
        var page = interaction.options.getNumber('page')
        const cdtime = 30000
        if (page < 1 || page === null) {
            page = 1
        }
        let allLevels = await Level.find({ GuildID: interaction.guild.id }).select('-_id UserID exp level total')
        allLevels.sort((a, b) => {
            if (a.total < b.total) return 1
            if (a.total > b.total) return -1
            return 0
        })

        const toplist = []
        var emoji = []
        const PreUserList = ['751225225047179324', '747664833423343677', '212214500999299072', '888738277044133899', '729671009631862834', '912514337602666526', '853182970838646794', '786816081032773662', '927221951439700058']
        for (var i = 0; i < allLevels.length; i++) {
            const userid = allLevels[i].UserID
            switch (userid) {
                case PreUserList[0]:
                    {
                        emoji[i] = '<:OrinSmile:1146170313445494875>'
                        break
                    }
                case PreUserList[1]:
                    {
                        emoji[i] = '<:OkuuFlare:1165494255733715007>'
                        break
                    }
                case PreUserList[2]:
                    {
                        emoji[i] = '<:FlandreHappy:1109772150979694652>'
                        break
                    }
                case PreUserList[3]:
                    {
                        emoji[i] = '<:Satori:1165494474508607568>'
                        break
                    }
                case PreUserList[4]:
                    {
                        emoji[i] = '<:MarisaHappy:1152871855514984460>'
                        break
                    }
                case PreUserList[5]:
                    {
                        emoji[i] = '<:RemiliaSmile:1152869440577347655>'
                        break
                    }
                case PreUserList[6]:
                    {
                        emoji[i] = '<:seiran:1165494670575538237>'
                        break
                    }
                case PreUserList[7]:
                    {
                        emoji[i] = '<:YukariSmile:1152874226458558464>'
                        break
                    }
                case PreUserList[8]:
                    {
                        emoji[i] = '<:RanSleep:1152867071332466689>'
                        break
                    }
                default:
                    {
                        emoji[i] = '<:LYG_blank:1097172753985056859>'
                    }
            }
        }
        for (var i = 0; i < allLevels.length; i++) {
            let ReqExp = lvlcalc(allLevels[i].level)
            const Progressnum = allLevels[i].exp / ReqExp * 100
            const Progress = `${Progressnum.toFixed(2)}%`
            const Progresstxt = `[${Progress}] ${allLevels[i].exp}/${ReqExp}`
            toplist[i] = `### • [${emoji[i]}] **__Rank:__** #${i + 1}\n• **__User:__** <@${allLevels[i].UserID}> • **__Total Exp:__** ${allLevels[i].total}\n• **__Level:__** ${allLevels[i].level} • **__Progress:__** ${Progresstxt}\n`
        }

        const pageuplim = (page * 10)
        const pagedownlim = (page * 10) - 10
        const resultlist = toplist.slice(pagedownlim, pageuplim)

        var desc = ''
        for (j = 0; j < resultlist.length; j++) {
            desc += resultlist[j]
        }
        if (desc === '') {
            desc = '<:LYG_Mio_Worry:939046404133879829>  **Không Có Đủ Số Liệu** Thống Kê Cho Việc Set Top Cho Những Người Phía Sau... Chờ Đến Khi Nào Đủ Người Rồi Mới Dùng Tiếp Page Này Nhé!!!'
        }

        const TopEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle(`<:YuyukoWoah:1152872168439423050> **Lazy Gang - Bảng Xếp Hạng Toàn Tập** (Trang: ${page})`)
            .setColor('Blurple')
            .setDescription(`${desc}\n\n<a:LYG_TighnariNotes:1090126010571300874> • Dùng **/top ${page + 1}** Để Xem Page ${page + 1} Nhé!`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })

        const auser = interaction.user.id
        function BypassCD(auser) {
            const CDPassList = ['751225225047179324', '786816081032773662', '927221951439700058', '809259609700302935', '729671009631862834', '888738277044133899', '912514337602666526', '961838901792735243']
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
                    CDTop: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDTop
                console.log('[Command: Top]', cduser, CDTime, Date.now())
                if (CDTime > Date.now() && !Bypass_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                    await interaction.reply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDTop = Date.now() + cdtime
                    data.save()
                    await interaction.reply({
                        embeds: [TopEmbed]
                    })
                }
            }
        })
    }
}