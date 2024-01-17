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
        .addStringOption(option =>
            option.setName('special')
                .setDescription('Các Quy Tắc Đặc Biệt Của Game (Chi Tiết Xem /minigames)')
                .addChoices(
                    {
                        name: "[Rush]",
                        value: "rush"
                    },
                    {
                        name: "[Extra]",
                        value: "extra"
                    }
                )
                .setRequired(false)),

    async execute(interaction) {
        //Setup Cơ Bản... (ỐI DỒI ÔI NHIỀU BIẾN QUÁ ĐÊ XD)
        await interaction.deferReply() //Defer Chống Bug Lol
        //DÀN BIẾN HỦY DIỆT
        const FooterEmbeds_ = FooterEmbeds
        const user = interaction.user
        const MathGameAsset = MathGame1

        let cdtime = 0

        const GameKey = interaction.options.getString('difficulty')
        const RunKey = interaction.options.getString('special') || 'none'
        const GameKey1 = GameKey.slice(0, 1).toUpperCase() + GameKey.slice(1)

        var CheckIKey = false, Time, Multi, Emoji, Color

        const KeyList = MathGameAsset[7]
        const CDList = [3600000, 1920000, 720000, 360000, 180000]
        const Time1 = MathGameAsset[5][0], Time2 = MathGameAsset[5][1], Bonus1 = MathGameAsset[6][0], Bonus2 = MathGameAsset[6][1]
        
        //Tạo Dựng Time Và Bonus Cho Key None Và Extra
        for (var i = 0; i < KeyList.length; i++) {
            if (GameKey === KeyList[i]) {
                CheckIKey = true
                Time = Time1[i]
                Multi = Bonus1[i]
                Emoji = MathGameAsset[8][i]
                Color = MathGameAsset[9][i]
                cdtime = CDList[i]
                break
            }
        }
        //Key Extra
        if (RunKey === 'extra') {
            for (var i = 0; i < KeyList.length; i++) {
                if (GameKey === KeyList[i]) {
                    CheckIKey = true
                    Time = Time2[i]
                    Multi = Bonus2[i]
                    Emoji = MathGameAsset[8][i]
                    Color = MathGameAsset[9][i]
                    cdtime = CDList[i]
                    break
                }
            }
        }
        //Run Time (Key: Rush)
        function RunTime(Time, RunKey, level) {
            if (RunKey === 'rush') {
                if (Number(level) >= 10) {
                    return Time * 0.3
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
                if (Number(level) >= 9) {
                    return Time * 0.3
                }
                return Time
            }
        }
        //Bonus (Key: Rush)
        function Bonus(Multi, RunKey, level) {
            if (RunKey === 'rush') {
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
        //Tạo Phép Tính Và Kết Quả (Normal)
        function CreateEqtNormal(level, GameKey) {
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
            let rng_
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

        function CalcNormal(Eqt_Q) {
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

        //Tạo Phép Tính Và Kết Quả (Extra)
        function CreateEqtExtra(level, GameKey) {
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
            if (level >= 25) {
                rng_ = 100000
            }
            if (level > 100) {
                rng_ = 1000000000
            }
            const EqCharArr = ['+', '-', '*', '/']
            const EqCharArr2 = ['+', '-', '*']
            let rng_
            switch (level) {
                case 0: {
                    rng_ = ValueArr[0]
                    break
                }
                case 1: {
                    rng_ = ValueArr[1]
                    break
                }
                case 2: {
                    rng_ = ValueArr[2]
                    break
                }
                case 3: {
                    rng_ = ValueArr[3]
                    break
                }
                case 4: {
                    rng_ = ValueArr[4]
                    break
                }
                case 5: {
                    rng_ = ValueArr[5]
                    break
                }
                default: {
                    rng_ = ValueArr[5]
                }
            }
            var a = Math.floor(Math.random() * rng_)
            var b = Math.floor(Math.random() * rng_ / 2)
            var c = Math.floor(Math.random() * rng_ / 3)
            var Eq1 = EqCharArr[Math.floor(Math.random() * EqCharArr.length)]
            var Eq2 = EqCharArr[Math.floor(Math.random() * EqCharArr.length)]
            a = Number(a)
            b = Number(b)
            if (Eq1 === '/' && Eq2 !== '/') {
                if (b === 0) {
                    b = Number(Math.floor(Math.random() * (rng_ / 2) - 1) + 1)
                }
                if (a % b !== 0) {
                    let d = Number(a * Math.floor(Math.random() * (rng_ / 4)))
                    return d + Eq1 + a + Eq2 + c
                }
            }
            if (Eq1 !== '/' && Eq2 === '/') {
                if (c === 0) {
                    c = Number(Math.floor(Math.random() * (rng_ / 3) - 1) + 1)
                }
                if (b % c !== 0) {
                    let d = Number(b * Math.floor(Math.random() * (rng_ / 4)))
                    return a + Eq1 + d + Eq2 + b
                }
            }
            if (Eq1 === '/' && Eq2 === '/') {
                if (b === 0) {
                    b = Number(Math.floor(Math.random() * (rng_ / 2) - 1) + 1)
                }
                if (c === 0) {
                    c = Number(Math.floor(Math.random() * (rng_ / 3) - 1) + 1)
                }
                if (a % b === 0) {
                    let d = a / b
                    if (d % c === 0) {
                        return a + Eq1 + b + Eq2 + c
                    } else {
                        Eq2 = EqCharArr2[Math.floor(Math.random() * EqCharArr2.length)]
                        return a + Eq1 + b + Eq2 + c
                    }
                }
                if (a % b !== 0) {
                    if (b % c === 0) {
                        Eq1 = EqCharArr2[Math.floor(Math.random() * EqCharArr2.length)]
                        return a + Eq1 + b + Eq2 + c
                    } else {
                        let e = Number(b * Math.floor(Math.random() * (rng_ / 4)))
                        Eq1 = EqCharArr2[Math.floor(Math.random() * EqCharArr2.length)]
                        return a + Eq1 + e + Eq2 + b
                    }
                }
            }
            return a + Eq1 + b + Eq2 + c
        }

        function CalcExtra(Eqt_Q) {
            let CalcStr = Split(Eqt_Q, ['+', '-', '*', '/'])

            var x = Number(CalcStr[0])
            var y = Number(CalcStr[1])
            var z = Number(CalcStr[2])
            const query = /[/*+-]/g
            let Eq = Eqt_Q.match(query)
            let Eq1 = Eq[0], Eq2 = Eq[1]
            switch (Eq1) {
                case '+': {
                    switch (Eq2) {
                        case '+':
                            {
                                return x + y + z
                            }
                        case '-':
                            {
                                return x + y - z
                            }
                        case '*':
                            {
                                return x + y * z
                            }
                        case '/':
                            {
                                return x + y / z
                            }
                    }
                }
                case '-': {
                    switch (Eq2) {
                        case '+':
                            {
                                return x - y + z
                            }
                        case '-':
                            {
                                return x - y - z
                            }
                        case '*':
                            {
                                return x - y * z
                            }
                        case '/':
                            {
                                return x - y / z
                            }
                    }
                }
                case '*': {
                    switch (Eq2) {
                        case '+':
                            {
                                return x * y + z
                            }
                        case '-':
                            {
                                return x * y - z
                            }
                        case '*':
                            {
                                return x * y * z
                            }
                        case '/':
                            {
                                return x * y / z
                            }
                    }
                }
                case '/': {
                    switch (Eq2) {
                        case '+':
                            {
                                return x / y + z
                            }
                        case '-':
                            {
                                return x / y - z
                            }
                        case '*':
                            {
                                return x / y * z
                            }
                        case '/':
                            {
                                return x / y / z
                            }
                    }
                }
            }
        }

        //Hàm Tách Chuỗi Extra
        function Split(str, Tokens) {
            var TempChar = Tokens[0]
            for (var i = 0; i < Tokens.length; i++) {
                str = str.split(Tokens[i]).join(TempChar)
            }
            str = str.split(TempChar)
            return str
        }
        //* Ghi Chú: Test Kênh Ngoài Thì Nguyên Block Này Là Để Vô Dấu Này Nhé! -> /*
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
        //*/ // <- Kết Thúc Block
        
        //CD Check Và Chạy Lệnh
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
                        var desc1
                        switch (RunKey) {
                            case 'rush':
                                {
                                    desc1 = `${Emoji} **Chào Mừng Người Chơi ${user} Đến Với QuickMath!!!**\n> **Độ Khó:** ${GameKey1} (Rush)\n> **Thời Gian:** ${Time}s\n\n**Game Sẽ Tạo Trong Chốc Lát... Xin Vui Lòng Chờ!!!**\n<:SanaePout:1152875631386832946> **Lưu Ý:**  Để Có Được Trải Nghiệm Tốt Nhất Thì Làm Ơn:\n> 1. Đừng Dùng Bot Khác Khi Đang Chơi Minigame Này\n> 2. Đừng Dùng Máy Tính Bỏ Túi Như Casio, Máy Tính Ở Điện Thoại, PC, Laptop Hay TV...\n> 3. Không Giới Hạn Nhận Tin Nhắn, Nếu Quá Thời Gian, Coi Như Game Over\n\n<:OrinMenace:1169857691456372766> **SPECIAL RULE:** [Rush] - Giảm \`10%/20%/30%/40%/50%\` Thời Gian Tính Mỗi Khi Lên 1 Level (Nhiều Nhất Là \`50%\`)`
                                    break
                                }
                            case 'extra':
                                {
                                    desc1 = `${Emoji} **Chào Mừng Người Chơi ${user} Đến Với QuickMath!!!**\n> **Độ Khó:** Ex-${GameKey1}\n> **Thời Gian:** ${Time}s\n\n**Game Sẽ Tạo Trong Chốc Lát... Xin Vui Lòng Chờ!!!**\n<:SanaePout:1152875631386832946> **Lưu Ý:**  Để Có Được Trải Nghiệm Tốt Nhất Thì Làm Ơn:\n> 1. Đừng Dùng Bot Khác Khi Đang Chơi Minigame Này\n> 2. Đừng Dùng Máy Tính Bỏ Túi Như Casio, Máy Tính Ở Điện Thoại, PC, Laptop Hay TV...\n> 3. Không Giới Hạn Nhận Tin Nhắn, Nếu Quá Thời Gian, Coi Như Game Over\n\n<:OrinMenace:1169857691456372766> **SPECIAL RULE:** [Extra] - Tăng Số Chữ Số Cần Tính Toán Từ **2** Lên **3**`
                                    break
                                }
                            default:
                                {
                                    desc1 = `${Emoji} **Chào Mừng Người Chơi ${user} Đến Với QuickMath!!!**\n> **Độ Khó:** ${GameKey1}\n> **Thời Gian:** ${Time}s\n\n**Game Sẽ Tạo Trong Chốc Lát... Xin Vui Lòng Chờ!!!**\n<:SanaePout:1152875631386832946> **Lưu Ý:**  Để Có Được Trải Nghiệm Tốt Nhất Thì Làm Ơn:\n> 1. Đừng Dùng Bot Khác Khi Đang Chơi Minigame Này\n> 2. Đừng Dùng Máy Tính Bỏ Túi Như Casio, Máy Tính Ở Điện Thoại, PC, Laptop Hay TV...\n> 3. Không Giới Hạn Nhận Tin Nhắn, Nếu Quá Thời Gian, Coi Như Game Over`
                                }

                        }
                        const StartEmbed = new EmbedBuilder()
                            .setColor(Color)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            .setTitle('<a:LYG_TighnariNotes:1090126010571300874> **Minigame - QuickMath**')
                            .setDescription(`${desc1}`)
                            .setTimestamp()
                        await interaction.editReply({
                            embeds: [StartEmbed]
                        })
                        await wait(2500)
                        var key = 0, score = 0, level = 0, restrictkey = false, i = 0
                        while (key === 0) {
                            if (!restrictkey) {
                                restrictkey = true
                                let Eqt_Q, Result
                                if (RunKey === 'extra') {
                                    Eqt_Q = CreateEqtExtra(level, GameKey)
                                    Result = CalcExtra(Eqt_Q)
                                } else {
                                    Eqt_Q = CreateEqtNormal(level, GameKey)
                                    Result = CalcNormal(Eqt_Q)
                                }
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
                                    const collector = await interaction.channel.awaitMessages({ msg, filter, time: Number(RunTime(Time, RunKey, level)) * 1000, errors: ['time'], max: 1 })
                                    if (collector) {
                                        score += (i + 1) * Number(Bonus(Multi, RunKey, level))
                                        score = Math.round(score)
                                        i++
                                        restrictkey = false
                                    }
                                } catch (err) {
                                    var desc2 
                                    switch (RunKey) {
                                        case 'rush':
                                            {
                                                desc2 = `${Emoji} **Kết Thúc Trò Chơi!!!**\n> **Độ Khó:** ${GameKey1} (Rush)\n> **Điểm Số:**  ${score}\n> **Level: ${level}**\n> **Câu Hỏi:** ${i + 1}\n\n**Câu Trả Lời:**\n` + '```js\n' + Eqt_Q + '=' + Result + '```'
                                                break
                                            }
                                        case 'extra':
                                            {
                                                desc2 = `${Emoji} **Kết Thúc Trò Chơi!!!**\n> **Độ Khó:** Ex-${GameKey1}\n> **Điểm Số:**  ${score}\n> **Level: ${level}**\n> **Câu Hỏi:** ${i + 1}\n\n**Câu Trả Lời:**\n` + '```js\n' + Eqt_Q + '=' + Result + '```'
                                                break
                                            }
                                        default:
                                            {
                                                desc2 = `${Emoji} **Kết Thúc Trò Chơi!!!**\n> **Độ Khó:** ${GameKey1}\n> **Điểm Số:**  ${score}\n> **Level: ${level}**\n> **Câu Hỏi:** ${i + 1}\n\n**Câu Trả Lời:**\n` + '```js\n' + Eqt_Q + '=' + Result + '```'
                                            }
                                    }
                                    const GameOverEmbed = new EmbedBuilder()
                                        .setColor(Color)
                                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                                        .setTitle('<a:LYG_TighnariNotes:1090126010571300874> **Minigame - QuickMath**')
                                        .setDescription(`${desc2}`)
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
                                                    Score: score,
                                                    Note: RunKey.slice(0, 1).toUpperCase() + RunKey.slice(1),
                                                })
                                            }
                                            if (data1) {
                                                const PreScore = data1.Score
                                                if (score > PreScore) {
                                                    data1.Level = level
                                                    data1.Score = score
                                                    data1.Note = RunKey.slice(0, 1).toUpperCase() + RunKey.slice(1)
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
        //Achievements (Not Figured Out Yet...)
        //Quantity: 2 (4*), 2 (5*), 1 (6*)
        //4* - Easy, Normal (Level 12)
        //5* - Hard, Lunatic (Level 10)
        //6* - Phantasm (Level 5)
        //<Code Lines Goes Here...>
    }
}
