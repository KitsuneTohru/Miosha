const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const Canvas = require('@napi-rs/canvas')
const Level = require('../../Database/level')
const cdSchema = require('../../Database/cooldown')
const lvlcalc = require('../../Utils/lvlcalc')
const RankKey = require('../../Database/rankkeydb')
const rankingarr = require('../../Assets/Ranking/rankingastarr')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')

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
        const FooterEmbeds_ = FooterEmbeds
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
        const iconembed = rankingarr[5]


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

        var type = 'type1'
        RankKey.findOne({ UserID: user.id }, async (err, data) => {
            if (err) throw (err)
            if (!data) {
                RankKey.create({
                    UserID: user.id,
                    RankCardType: 'type1'
                })
                type = 'type1'
            }
            if (data) {
                const a = data.RankCardType
                if (!a) {
                    data.RankCardType = 'type1'
                    data.save()
                }
                type = data.RankCardType
            }
        })
        var color, img_url, special_txt, icon_url, embed_icon
        for (var i = 0; i < keylist.length; i++) {
            if (key === keylist[i]) {
                color = colorlist[i]
                img_url = imglist[i]
                special_txt = spectxtlist[i]
                icon_url = iconlist[i]
                embed_icon = iconembed[i]
                break
            }
            color = colorlist[0]
            img_url = imglist[0]
            special_txt = spectxtlist[0]
            icon_url = iconlist[0]
            embed_icon = iconembed[0]
        }

        const fetchedLevel = await Level.findOne({
            UserID: user.id,
            GuildID: interaction.guild.id
        })

        if (!fetchedLevel) {
            const NoData = new EmbedBuilder()
                .setColor('DarkGreen')
                .setTitle(`**No Ranking Data**`)
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Người Dùng Là ${user} Hiện Không Có Exp Chat Nào Cả, Hãy Chờ Người Đó Chat Đi Rồi Mới Tính Nhé!`)
                .setTimestamp()
                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
            await interaction.editReply({
                embeds: [NoData]
            })
            return
        }

        let allLevels = await Level.find({ GuildID: interaction.guild.id }).select('-_id UserID total')
        allLevels.sort((a, b) => {
            if (Number(a.total) < Number(b.total)) return 1
            if (Number(a.total) > Number(b.total)) return -1
            return 0
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

        //RankCard Size
        const canvas = Canvas.createCanvas(934, 282)
        const context = canvas.getContext('2d')

        //RankCard Background
        const background = await Canvas.loadImage(img_url)
        context.drawImage(background, 0, 0, canvas.width, canvas.height)

        //Type 1 Card
        if (type === 'type1') {
            //Detail 1 - Frame 1
            context.strokeStyle = color
            context.strokeRect(0, 0, canvas.width, canvas.height)

            //Detail 2 - Fill Frame 1 
            context.globalAlpha = 0.5
            context.fillStyle = '#4F4F4F'
            context.fillRect(223, 8, 695, 262)
            context.fillStyle = color
            context.fillRect(18, 8, 205, 262)
            context.strokeRect(223, 8, 695, 262)

            //Detail 3 - Avatar
            context.globalAlpha = 1.0
            context.fillStyle = '#B7B7B7'
            context.fillRect(25, 215, 192, 48)
            context.strokeRect(25, 215, 192, 48)
            const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: 'jpg' }))
            context.drawImage(avatar, 25, 15, 192, 192)

            //Detail 4 - Icon
            const iconimg = await Canvas.loadImage(icon_url)
            context.drawImage(iconimg, 825, 15, 80, 80)

            //Detail 5 - Ranking Level
            context.globalAlpha = 1.0
            context.fillStyle = rankingcolor
            context.textAlign = 'left'
            context.font = 'bold 36px Ubuntu'
            const ranktxt = `#${currentRank}`
            context.fillText(ranktxt, 27, 252)

            //Detail 6 - Username + Title
            context.fillStyle = color
            context.font = 'bold 36px Ubuntu'
            context.fillText(user.username, 245, 55)

            context.fillStyle = color
            context.font = `bold 25px Ubuntu`
            context.fillText(special_txt, 245, 90)

            //Detail 7: Ranking Progress + Exp
            context.fillStyle = '#FFFFFF'
            context.font = 'bold 25px Ubuntu'
            const lvltxt = `Level • ${fetchedLevel.level}`
            context.fillText(lvltxt, 250, 150)
            const totalexp = `Total Exp • ${fetchedLevel.total}`
            context.fillText(totalexp, 650, 150)

            context.fillStyle = '#212121'
            context.strokeStyle = color
            context.beginPath()
            context.roundRect(240, 170, 633, 58, [0, 90, 90, 0])
            context.fill()
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
        }

        //Type 2 Card
        if (type === 'type2') {
            //Detail 1 - Frame 1
            context.strokeStyle = color
            context.strokeRect(0, 0, canvas.width, canvas.height)

            //Detail 2 - Fill Frame 1 
            context.globalAlpha = 0.5
            context.fillStyle = '#4F4F4F'
            context.beginPath()
            context.moveTo(17, 282)
            context.lineTo(132, 0)
            context.lineTo(345, 0)
            context.lineTo(229, 282)
            context.lineTo(17, 282)
            context.closePath()
            context.fill()

            context.fillStyle = color
            context.lineWidth = 4
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke()

            context.fillStyle = '#B7B7B7'
            context.globalAlpha = 0.85
            context.beginPath()
            context.roundRect(56, 222, 164, 47, [22])
            context.fill()
            context.closePath()
            context.stroke()

            context.fillStyle = '#4F4F4F'
            context.globalAlpha = 0.5
            context.beginPath()
            context.roundRect(369, 20, 475, 78, [22])
            context.closePath()
            context.fill()
            context.fillStyle = color
            context.stroke()

            context.fillStyle = '#4F4F4F'
            context.beginPath()
            context.roundRect(326, 130, 517, 125, [30])
            context.closePath()
            context.fill()
            context.fillStyle = color
            context.stroke()

            //Detail 3 - Icon
            context.globalAlpha = 1.0
            const iconimg = await Canvas.loadImage(icon_url)
            context.drawImage(iconimg, 197, 200, 38, 38)

            //Detail 4 - Ranking Level
            context.globalAlpha = 1.0
            context.fillStyle = rankingcolor
            context.textAlign = 'left'
            context.font = 'bold 23px Ubuntu'
            const ranktxt = `#${currentRank}`
            context.fillText(ranktxt, 68, 254)

            //Detail 5 - Username + Title
            context.fillStyle = color
            context.font = 'bold 30px Ubuntu'
            context.fillText(user.username, 383, 55)

            context.font = 'bold 20px Ubuntu'
            context.fillText(special_txt, 382, 85)

            //Detail 6: Hexagon Level Lol
            context.beginPath()
            context.moveTo(346, 174)
            context.lineTo(384, 152)
            context.lineTo(422, 174)
            context.lineTo(422, 218)
            context.lineTo(384, 240)
            context.lineTo(346, 218)
            context.lineTo(346, 174)
            context.closePath()
            context.lineWidth = 6
            context.stroke()
            context.fillStyle = '#707070'
            context.fill()
            context.textAlign = 'center'
            context.fillStyle = '#FFFFFF'
            context.font = 'bold 30px Ubuntu'
            const lvltxt = `${fetchedLevel.level}`
            context.fillText(lvltxt, 384, 208)

            //Detail 7: Ranking Progress + Exp
            context.fillStyle = '#212121'
            context.strokeStyle = color
            context.lineWidth = 1
            context.beginPath()
            context.roundRect(428, 174, 400, 44, [0, 90, 90, 0])
            context.fill()
            context.stroke()

            context.fillStyle = color
            context.beginPath()
            const NewWidth = fetchedLevel.exp / ReqExp
            NewWidth.toFixed(2)
            context.roundRect(428, 174, NewWidth * 400, 44, [0, 90, 90, 0])
            context.fill()
            context.strokeStyle = '#FFFFFF'
            context.stroke()

            context.fillStyle = '#FFFFFF'
            context.textAlign = 'left'
            context.font = 'bold 16px Ubuntu'
            const totalexp = `Total • ${fetchedLevel.total}`
            context.fillText(totalexp, 65, 213)

            context.textAlign = 'center'
            context.font = 'bold 18px Ubuntu'
            const Progressnum = fetchedLevel.exp / ReqExp * 100
            const Progress = `${Progressnum.toFixed(2)}%`
            const Progresstxt = `[${Progress}] ${fetchedLevel.exp}/${ReqExp}`
            context.fillText(Progresstxt, 620, 164)

            //Detail 8 - Avatar

            context.strokeStyle = color
            const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: 'jpg' }))
            context.beginPath()
            context.roundRect(136, 9, 136, 136, [28])
            context.closePath()
            context.clip()
            context.drawImage(avatar, 136, 9, 136, 136)
            context.stroke()
        }

        const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), { name: `${user.id}-rank.png` })

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
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDRank = Date.now() + cdtime
                    data.save()
                    const RankEmbed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`**LYG - Rank Card**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`${embed_icon} **Rank Của Người Dùng: ${user}**`)
                        .setTimestamp()
                        .setImage(`attachment://${user.id}-rank.png`)
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [RankEmbed],
                        files: [attachment]
                    })
                }
            }
        })

    }
}