const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Level = require('../../Database/level')
const cdSchema = require('../../Database/cooldown')
const lvlcalc = require('../../Utils/lvlcalc')
const RankKey = require('../../Database/rankkeydb')
const rankingarr = require('../../Assets/Ranking/rankingastarr')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')

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
        const FooterEmbeds_ = FooterEmbeds

        await interaction.deferReply()
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
        const emolist = rankingarr[5]
        const keylist = rankingarr[0]
        var emoji = []
        for (var i = 0; i < allLevels.length; i++) {
            const a = allLevels[i].UserID
            let KeyList = await RankKey.findOne({ UserID: a }).select('-_id Key')
            var key = 'none'
            if (!KeyList) { 
                emoji[i] = emolist[0] 
                continue
            }
            key = KeyList.Key
            switch(key){
                case 'admin':
                    {
                        key = 'yuyuko'
                        break
                    }
                case 'mod':
                    {
                        key = 'youmu'
                        break
                    }
                case 'staff':
                    {
                        key = 'chen'
                        break
                    }
                default:
                    {
                        key = key
                    }
            }
            for(var j = 0; j < keylist.length; j++){
                if(key === keylist[j]){
                    emoji[i] = emolist[j]
                    break
                }
            }
        }
        const toplist = []
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
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })

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
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDTop = Date.now() + cdtime
                    data.save()
                    await interaction.editReply({
                        embeds: [TopEmbed]
                    })
                }
            }
        })
    }
}