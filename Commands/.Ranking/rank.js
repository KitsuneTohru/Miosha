const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')
const Canvas = require('@napi-rs/canvas')
const Level = require('../../Database/level')
const cdSchema = require('../../Database/cooldown')
const lvlcalc = require('../../Utils/lvlcalc')
const RankKey = require('../../Database/rankkeydb')
const rankingarr = require('../../Assets/Ranking/rankingastarr')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Show Exp Và Level Của Bạn Trong Server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Xem Rank')
                .setRequired(false)
        ),
    async execute(interaction) {
        await interaction.deferReply()
        const cdtime = 10000
        var user = interaction.options.getUser('user')
        if (user === null) {
            user = interaction.user
        }

        const keylist = rankingarr[0]
        const colorlist = rankingarr[1]
        const imglist = rankingarr[2]
        const spectxtlist = rankingarr[3]
        const iconlist = rankingarr[4]


        var key
        let RankKey_ = await RankKey.findOne({ UserID: user.id }).select('-_id Key')
        if (!RankKey_) {
            key = 'none'
        } else {
            switch (RankKey_.Key) {
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
                        key = RankKey_.Key
                    }
            }
        }
        var color, img_url, special_txt, icon_url
        for (var i = 0; i < keylist.length; i++) {
            if (key === keylist[i]) {
                color = colorlist[i]
                img_url = imglist[i]
                special_txt = spectxtlist[i]
                icon_url = iconlist[i]
                break
            }
            color = colorlist[0]
            img_url = imglist[0]
            special_txt = spectxtlist[0]
            icon_url = iconlist[0]
        }

        const fetchedLevel = await Level.findOne({
            UserID: user.id,
            GuildID: interaction.guild.id
        })

        if (!fetchedLevel) {
            await interaction.editReply({
                content: `<:LYG_MioWink:1086172116916912198> **Rank Của Người Dùng: ${user.username} Hiện Chưa Có, Hãy Thử Lại Sau Nhé!**`,
            })
            return
        }

        let allLevels = await Level.find({ GuildID: interaction.guild.id }).select('-_id UserID level exp')
        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.exp - a.exp
            } else {
                return b.level - a.level
            }
        })
        let currentRank = allLevels.findIndex((lvl) => lvl.UserID === user.id) + 1
        function Ranking_Level(currentRank) {
            var rankcolor
            if (currentRank < 2) {
                rankcolor = '#FFDE00'
            } else if (currentRank < 3) {
                rankcolor = '#818181'
            } else if (currentRank < 4) {
                rankcolor = '#BD9000'
            } else if (currentRank <= 10) {
                rankcolor = '#FF4E4E'
            } else if (currentRank <= 50) {
                rankcolor = '#2D62FF'
            } else if (currentRank <= 100) {
                rankcolor = '#00FF30'
            } else {
                rankcolor = '#000000'
            }
            return rankcolor
        }
        let ReqExp = lvlcalc(fetchedLevel.level)
        const rankingcolor = Ranking_Level(currentRank)

        const canvas = Canvas.createCanvas(934, 282)
        const context = canvas.getContext('2d')

        const background = await Canvas.loadImage(img_url)
        context.drawImage(background, 0, 0, canvas.width, canvas.height)

        context.strokeStyle = color
        context.strokeRect(0, 0, canvas.width, canvas.height)

        context.globalAlpha = 0.5
        context.fillStyle = '#4F4F4F'
        context.fillRect(223, 8, 695, 262)
        context.fillStyle = color
        context.fillRect(18, 8, 205, 262)
        context.strokeRect(223, 8, 695, 262)

        context.globalAlpha = 0.85
        context.fillStyle = '#B7B7B7'
        context.fillRect(25, 215, 192, 48)
        context.strokeRect(25, 215, 192, 48)
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: 'jpg' }))
        context.drawImage(avatar, 25, 15, 192, 192)

        const iconimg = await Canvas.loadImage(icon_url)
        context.drawImage(iconimg, 825, 15, 80, 80)

        context.globalAlpha = 1.0
        context.fillStyle = rankingcolor
        context.textAlign = 'left'
        context.font = 'bold 36px Ubuntu'
        const ranktxt = `#${currentRank}`
        context.fillText(ranktxt, 27, 252)

        const NameText = (canvas, text) => {
            const context = canvas.getContext('2d')
            let fontSize = 50
            do {
                context.font = `bold ${fontSize -= 16}px Ubuntu`
            }
            while (context.measureText(text).width > canvas.width - 100)
            return context.font
        }

        context.fillStyle = color
        context.font = NameText(canvas, user.username)
        context.fillText(user.username, 245, 55)

        const SpecialText = (canvas, text) => {
            const context = canvas.getContext('2d')
            let fontSize = 30
            do {
                context.font = `bold ${fontSize -= 7}px Ubuntu`
            }
            while (context.measureText(text).width > canvas.width - 214)
            return context.font
        }

        context.fillStyle = color
        context.font = SpecialText(canvas, special_txt)
        context.fillText(special_txt, 245, 90)

        context.fillStyle = '#FFFFFF'
        context.font = 'bold 25px Ubuntu'
        const lvltxt = `Level • ${fetchedLevel.level}`
        context.fillText(lvltxt, 250, 150)
        const totalexp = `Total Exp • ${fetchedLevel.total}`
        context.fillText(totalexp, 650, 150)

        context.fillStyle = '#212121'
        context.beginPath()
        context.roundRect(240, 170, 633, 58, [0, 90, 90, 0])
        context.fill()
        context.strokeStyle = '#000000'
        context.stroke()

        context.fillStyle = color
        context.beginPath()
        const NewWidth = fetchedLevel.exp / ReqExp
        NewWidth.toFixed(2)
        context.roundRect(240, 170, NewWidth * 633, 58, [0, 90, 90, 0])
        context.fill()
        context.strokeStyle = '#FFFFFF'
        context.stroke()

        context.fillStyle = '#767676'
        context.textAlign = 'center'
        context.font = 'bold 25px Ubuntu'
        const Progressnum = fetchedLevel.exp / ReqExp * 100
        const Progress = `${Progressnum.toFixed(2)}%`
        const Progresstxt = `[${Progress}] ${fetchedLevel.exp}/${ReqExp}`
        context.fillText(Progresstxt, 555, 210)

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: `${user.username}-rank.png` })

        const auser = interaction.user.id
        function BypassCD(auser) {
            const CDPassList = ['751225225047179324', '786816081032773662', '927221951439700058', '809259609700302935', '892054339072438303', '888738277044133899', '912514337602666526', '961838901792735243']
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
                    CDRank: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDRank
                console.log('[Command: Rank]', cduser, CDTime, Date.now())
                if (CDTime > Date.now() && !Bypass_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDRank = Date.now() + cdtime
                    data.save()
                    await interaction.editReply({
                        content: `<:LYG_MioWink:1086172116916912198> **Rank Của Người Dùng: ${user.username}**`,
                        files: [attachment]
                    })
                }
            }
        })

    }
}