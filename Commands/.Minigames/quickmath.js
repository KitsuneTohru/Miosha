const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const MathGame1 = require('../../Assets/MathGame/QuickMath')
const wait = require('node:timers/promises').setTimeout;
const cdSchema = require('../../Database/cooldown')
const QuickMathDb = require('../../Database/quickmath')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quickmath')
        .setDescription('Giải Toán Vui (Test Tốc Độ Tính Nhanh Của Bạn)')
        .addStringOption(option =>
            option.setName('difficulty')
                .setDescription('Chọn Độ Khó Của Game')
                .addChoices(
                    {
                        name: "Easy",
                        value: 'easy'
                    },
                    {
                        name: "Normal",
                        value: "normal"
                    },
                    {
                        name: "Hard",
                        value: 'hard'
                    },
                    {
                        name: "Lunatic",
                        value: "lunatic"
                    },
                    {
                        name: "Phantasm",
                        value: 'phantasm'
                    }
                )
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('rush')
                .setDescription('Giảm Thời Gian Mỗi Khi Lên Level (Chi Tiết /minigames)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const user = interaction.user
        const MathGameAsset = MathGame1
        let cdtime = 0
        const GameKey = interaction.options.getString('difficulty')
        const RushKey = interaction.options.getBoolean('rush') || false
        const GameKey1 = GameKey.slice(0, 1).toUpperCase() + GameKey.slice(1)
        var CheckIKey = false, Time, Multi, Emoji, Color
        const KeyList = MathGameAsset[7]
        const CDList = [3600000, 1920000, 720000, 360000, 180000]

        for (var i = 0; i < KeyList.length; i++) {
            if (GameKey === KeyList[i]) {
                CheckIKey = true
                Time = MathGameAsset[5][i]
                Multi = MathGameAsset[6][i]
                Emoji = MathGameAsset[8][i]
                Color = MathGameAsset[9][i]
                cdtime = CDList[i]
                break
            }
        }

        function RunTime(Time, RushKey, level) {
            if (RushKey) {
                if(Number(level) >= 10) {
                    return Time * 0.1
                }
                switch (Number(level)) {
                    case 0:
                        {
                            return Time
                        }
                    case 1:
                        {
                            return Time * 0.9
                        }
                    case 2:
                        {
                            return Time * 0.8
                        }
                    case 3:
                        {
                            return Time * 0.7
                        }
                    case 4:
                        {
                            return Time * 0.6
                        }
                    case 5:
                        {
                            return Time * 0.5
                        }
                    default:
                        {
                            return Time * 0.5
                        }
                }
            } else {
                if (Number(level) === 7) {
                    return Time * 0.7
                }
                if (Number(level) === 8) {
                    return Time * 0.5
                }
                if (Number(level) === 9) {
                    return Time * 0.3
                }
                if (Number(level) >= 10) {
                    return Time * 0.1
                }
                return Time
            }
        }

        function Bonus(Multi, RushKey, level) {
            if (RushKey) {
                switch (Number(level)) {
                    case 0:
                        {
                            return Multi
                        }
                    case 1:
                        {
                            return Multi * 1.1
                        }
                    case 2:
                        {
                            return Multi * 1.2
                        }
                    case 3:
                        {
                            return Multi * 1.3
                        }
                    case 4:
                        {
                            return Multi * 1.4
                        }
                    case 5:
                        {
                            return Multi * 1.5
                        }
                    default:
                        {
                            return Multi * 1.5
                        }
                }
            } else {
                return Multi
            }
        }

        function CreateEqt(level, GameKey) {
            const Value = MathGame1
            var ValueArr
            switch (GameKey) {
                case 'easy': {
                    ValueArr = Value[0]
                    break
                }
                case 'normal': {
                    ValueArr = Value[1]
                    break
                }
                case 'hard': {
                    ValueArr = Value[2]
                    break
                }
                case 'lunatic': {
                    ValueArr = Value[3]
                    break
                }
                case 'phantasm': {
                    ValueArr = Value[4]
                    break
                }
                default: {
                    console.error()
                }
            }
            const EqCharArr = ['+', '-', '*', '/']
            let rng_ = 11
            switch (level) {
                case 0: {
                    rng_ = Number(ValueArr[0]) + 1
                    break
                }
                case 1: {
                    rng_ = Number(ValueArr[1]) + 1
                    break
                }
                case 2: {
                    rng_ = Number(ValueArr[2]) + 1
                    break
                }
                case 3: {
                    rng_ = Number(ValueArr[3]) + 1
                    break
                }
                case 4: {
                    rng_ = Number(ValueArr[4]) + 1
                    break
                }
                case 5: {
                    rng_ = Number(ValueArr[5]) + 1
                    break
                }
                default: {
                    rng_ = Number(ValueArr[5]) + 1
                }
            }
            if (level >= 25) {
                rng_ = 100000   
            }
            if (level > 100) {
                rng_ = 1000000000
            }
            var a = Math.floor(Math.random() * rng_)
            var b = Math.floor(Math.random() * rng_)
            var Eq = EqCharArr[Math.floor(Math.random() * EqCharArr.length)]
            a = Number(a)
            b = Number(b)
            if (Eq === '/') {
                if (b === 0) {
                    b = Number(Math.floor(Math.random() * rng_ - 1) + 1)
                }
                if (a % b !== 0) {
                    let d = Number(a * Math.floor(Math.random() * rng_))
                    return d + Eq + a
                }
            }
            return a + Eq + b
        }

        function Calc(Eqt_Q) {
            let CalcStr = Eqt_Q
            const EqCharArr = ['+', '-', '*', '/']
            for (var i = 0; i < EqCharArr.length; i++) {
                if (CalcStr.indexOf(EqCharArr[i]) !== -1) {
                    CalcStr = CalcStr.split(EqCharArr[i])
                    break
                }
            }

            var x = Number(CalcStr[0])
            var y = Number(CalcStr[1])
            const query = /[/*+-]/g
            let Eq = Eqt_Q.match(query)
            Eq = Eq[0]
            switch (Eq) {
                case '+': {
                    return x + y
                }
                case '-': {
                    return x - y
                }
                case '*': {
                    return x * y
                }
                case '/': {
                    return x / y
                }
            }
        }
        //* 
        if (interaction.channel.id !== '1195982067780042863') {
            const WrongChannel = new EmbedBuilder()
                .setColor('DarkRed')
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                .setTitle('<a:LYG_TighnariNotes:1090126010571300874> **Minigame - QuickMath**')
                .setDescription(`<:OrinBruh:1160295126996881448> ${user} Oi Nhầm Kênh Rồi, Qua Kênh <#1195982067780042863> Để Có Thể Dùng Lệnh Nhé!`)
                .setTimestamp()
            return interaction.editReply({
                embeds: [WrongChannel]
            })
        }
        //*/
        cdSchema.findOne({ UserID: user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDRoll: Date.now(),
                })
            }
            if (data) {
                const cduser = data.UserID
                const CDTime = data.CDQuickMath
                console.log('[Command: QuickMath]', cduser, CDTime, Date.now())
                if (CDTime > Date.now()) {
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
                } else {
                    data.CDQuickMath = Date.now() + cdtime
                    data.save()
                    if (CheckIKey) {
                        var desc = `${Emoji} **Chào Mừng Người Chơi ${user} Đến Với QuickMath!!!**\n> **Độ Khó:** ${GameKey1}\n> **Thời Gian:** ${Time}s\n\n**Game Sẽ Tạo Trong Chốc Lát... Xin Vui Lòng Chờ!!!**\n<:SanaePout:1152875631386832946> **Lưu Ý:**  Để Có Được Trải Nghiệm Tốt Nhất Thì Làm Ơn:\n> 1. Đừng Dùng Bot Khác Khi Đang Chơi Minigame Này\n> 2. Đừng Dùng Máy Tính Bỏ Túi Như Casio, Máy Tính Ở Điện Thoại, PC, Laptop Hay TV...\n> 3. Không Giới Hạn Nhận Tin Nhắn, Nếu Quá Thời Gian, Coi Như Game Over`
                        if (RushKey) {
                            desc += '\n\n<:OrinMenace:1169857691456372766> **SPECIAL RULE:** [rush] - Giảm `10%/20%/30%/40%/50%` Thời Gian Tính Mỗi Khi Lên 1 Level (Nhiều Nhất Là `50%`)'
                        }
                        const StartEmbed = new EmbedBuilder()
                            .setColor(Color)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            .setTitle('<a:LYG_TighnariNotes:1090126010571300874> **Minigame - QuickMath**')
                            .setDescription(`${desc}`)
                            .setTimestamp()
                        await interaction.editReply({
                            embeds: [StartEmbed]
                        })
                        await wait(2500)
                        var key = 0, score = 0, level = 0, restrictkey = false, i = 0
                        while (key === 0) {
                            if (!restrictkey) {
                                restrictkey = true
                                const Eqt_Q = CreateEqt(level, GameKey)
                                const Result = Calc(Eqt_Q)
                                level = Math.floor(i / 20)
                                const RunEmbed = new EmbedBuilder()
                                    .setColor(Color)
                                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                                    .setTitle('<a:LYG_TighnariNotes:1090126010571300874> **Minigame - QuickMath**')
                                    .setDescription(`${Emoji} **Điểm Số:**  ${score}\n> **Level: ${level}** || **Câu Hỏi:** ${i + 1}\n` + '```js\n' + Eqt_Q + '=?```')
                                    .setTimestamp()
                                await interaction.followUp({
                                    embeds: [RunEmbed],
                                })
                                const msg = interaction.fetchReply()
                                try {
                                    const filter = m => {
                                        if (m.author.bot) return
                                        if (Number(m.content) === Result && m.author.id === interaction.user.id && m.channel.id === interaction.channel.id) {
                                            return true
                                        } else {
                                            return false
                                        }
                                    }
                                    const collector = await interaction.channel.awaitMessages({ msg, filter, time: Number(RunTime(Time, RushKey, level)) * 1000, errors: ['time'], max: 1 })
                                    if (collector) {
                                        score += (i + 1) * Number(Bonus(Multi, RushKey, level))
                                        score = Math.round(score)
                                        i++
                                        restrictkey = false
                                    }
                                } catch (err) {
                                    const GameOverEmbed = new EmbedBuilder()
                                        .setColor(Color)
                                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                                        .setTitle('<a:LYG_TighnariNotes:1090126010571300874> **Minigame - QuickMath**')
                                        .setDescription(`${Emoji} **Kết Thúc Trò Chơi!!!**\n> **Độ Khó:** ${GameKey1}\n> **Điểm Số:**  ${score}\n> **Level: ${level}**\n> **Câu Hỏi:** ${i + 1}\n\n**Câu Trả Lời:**\n` + '```js\n' + Eqt_Q + '=' + Result + '```')
                                        .setTimestamp()
                                    await interaction.followUp({
                                        embeds: [GameOverEmbed]
                                    })
                                    key++
                                    if (score > 0) {
                                        QuickMathDb.findOne({ UserID: user.id, GameKey: GameKey1 }, async (err, data1) => {
                                            if (err) throw (err)
                                            if (!data1) {
                                                QuickMathDb.create({
                                                    UserID: user.id,
                                                    GameKey: GameKey1,
                                                    Level: level,
                                                    Score: score
                                                })
                                            }
                                            if (data1) {
                                                const PreScore = data1.Score
                                                if (score > PreScore) {
                                                    data1.Level = level
                                                    data1.Score = score
                                                    data1.save()
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}
