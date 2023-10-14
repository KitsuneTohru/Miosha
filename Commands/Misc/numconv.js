const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const cdSchema = require('../../Database/cooldown')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('numconv')
        .setDescription('Nhập Vào Một Giá Trị Số Nguyên Dương Bất Kì, Sau Đó Trả Về Giá Trị Đã Quy Đổi')
        .addStringOption(option =>
            option.setName('number')
                .setDescription('Giá Trị Số Nhập Vào (Giới Hạn 32 Chữ Số)')
                .setMaxLength(32)
                .setRequired(true)),
    async execute(interaction) {
        const cdtime = 10000
        const user = interaction.user.id
        const auser = interaction.user.id
        const str = interaction.options.getString('number')
        var checkstr = str.toUpperCase()
        const NumRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('dec')
                    .setLabel('[DEC]')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('hex')
                    .setLabel('[HEX]')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('bin')
                    .setLabel('[BIN]')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('oct')
                    .setLabel('[OCT]')
                    .setStyle(ButtonStyle.Primary)
            )
        var key = 'NONE' //Check Key, Khi Lấy Custom ID ==> Chạy Function Nhất Định
        function CheckStr(key) {
            if (key === 'DEC') {
                const decarr = '0123456789'
                var dcount = 0
                for (i in checkstr) {
                    var ch = checkstr[i]
                    var dnum = decarr.indexOf(ch)
                    if (dnum !== -1) {
                        dcount++
                    }
                }
                if (dcount === checkstr.length) {
                    key = 'DEC'
                }
                else key = 'ERROR'
            }
            if (key === 'HEX') {
                const hexarr = '0123456789ABCDEF'
                var hcount = 0
                for (i in checkstr) {
                    var ch = checkstr[i]
                    var hnum = hexarr.indexOf(ch)
                    if (hnum !== -1) {
                        hcount++
                    }
                }
                if (hcount === checkstr.length) {
                    key = 'HEX'
                }
                else key = 'ERROR'
            }
            if (key === 'BIN') {
                const binarr = '01'
                var bcount = 0
                for (i in checkstr) {
                    var ch = checkstr[i]
                    var bnum = binarr.indexOf(ch)
                    if (bnum !== -1) {
                        bcount++
                    }
                }
                if (bcount === checkstr.length) {
                    key = 'BIN'
                }
                else key = 'ERROR'
            }
            if (key === 'OCT') {
                const octarr = '01234567'
                var ocount = 0
                for (i in checkstr) {
                    var ch = checkstr[i]
                    var onum = octarr.indexOf(ch)
                    if (onum !== -1) {
                        ocount++
                    }
                }
                if (ocount === checkstr.length) {
                    key = 'OCT'
                }
                else key = 'ERROR'
            }
            return key
        }
        //Ready Embed
        const ReadyEmbed = new EmbedBuilder()
            .setColor('Default')
            .setTitle(`<a:LYG_GanyuNap:1096457111094964277> **Quy Đổi Số**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | Quy Đổi Số: (**${checkstr}**)\n\n**Hãy Chọn Nút Bên Dưới Để Chọn Kiểu Giá Trị Nhập Vào Nhé!!!**\n• [DEC]\n• [HEX]\n• [BIN]\n• [OCT]`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        //Error Embed
        const ErrorEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_GanyuNap:1096457111094964277> **Quy Đổi Số**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | Oi! Bạn Đã Nhập Sai Định Dạng Số Rồi! (**${checkstr}**)`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        //Wait Embed
        function SetWaitEmbed(key) {
            var WaitEmbed
            if (key === 'DEC') {
                WaitEmbed = new EmbedBuilder()
                    .setColor('Grey')
                    .setTitle(`<a:LYG_GanyuNap:1096457111094964277> **Quy Đổi Số**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<a:LYG_Loading:900784653701627925> | ${interaction.user}... Xin Chờ Một Lát, Số Sẽ Được Chuyển Đổi: **[DEC]** ` + '`' + checkstr + '`')
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            }
            if (key === 'HEX') {
                WaitEmbed = new EmbedBuilder()
                    .setColor('Grey')
                    .setTitle(`<a:LYG_GanyuNap:1096457111094964277> **Quy Đổi Số**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<a:LYG_Loading:900784653701627925> | ${interaction.user}... Xin Chờ Một Lát, Số Sẽ Được Chuyển Đổi: **[HEX]** ` + '`' + checkstr + '`')
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            }
            if (key === 'BIN') {
                WaitEmbed = new EmbedBuilder()
                    .setColor('Grey')
                    .setTitle(`<a:LYG_GanyuNap:1096457111094964277> **Quy Đổi Số**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<a:LYG_Loading:900784653701627925> | ${interaction.user}... Xin Chờ Một Lát, Số Sẽ Được Chuyển Đổi: **[BIN]** ` + '`' + checkstr + '`')
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            }
            if (key === 'OCT') {
                WaitEmbed = new EmbedBuilder()
                    .setColor('Grey')
                    .setTitle(`<a:LYG_GanyuNap:1096457111094964277> **Quy Đổi Số**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`<a:LYG_Loading:900784653701627925> | ${interaction.user}... Xin Chờ Một Lát, Số Sẽ Được Chuyển Đổi: **[OCT]** ` + '`' + checkstr + '`')
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            }
            return WaitEmbed
        }
        //Function End Embed
        //Key = DEC
        function decconv(checkstr) {
            var hexnumber = Number(checkstr), binnumber = Number(checkstr), octnumber = Number(checkstr),
                hexch = '0123456789ABCDEF',
                hexresult = '', binresult = [], octresult = [],
                i = 0, j = 0, result = []
            //DEC => HEX
            while (hexnumber > 0) {
                var a
                a = hexnumber % 16
                hexresult += hexch[Number(a)]
                hexnumber = Math.floor(hexnumber / 16)
            }
            result[0] = hexresult
            result[0] = result[0].split("").reverse().join("")
            result[0] = result[0].replace(/,/g, "")
            //DEC => BIN
            while (binnumber > 0) {
                binresult[i] = binnumber % 2
                binnumber = Math.floor(binnumber / 2)
                i++
            }
            result[1] = binresult.toString()
            result[1] = result[1].split("").reverse().join("")
            result[1] = result[1].replace(/,/g, "")
            //DEC => OCT
            while (octnumber > 0) {
                octresult[j] = octnumber % 8
                octnumber = Math.floor(octnumber / 8)
                j++
            }
            result[2] = octresult.toString()
            result[2] = result[2].split("").reverse().join("")
            result[2] = result[2].replace(/,/g, "")
            //Desc Embed
            const D_Desc = `<a:LYG_TighnariNotes:1090126010571300874> | **Số Cần Quy Đổi:** **[DEC]** ` + '`' + checkstr + '`' + `\n\n> [HEX] ${result[0]}\n> [BIN] ${result[1]}\n> [OCT] ${result[2]}`
            return D_Desc
        }
        //Key = HEX
        function hexconv(checkstr) {
            var decnumber = checkstr.toUpperCase(), binnumber, octnumber
            hexch = '0123456789ABCDEF',
                decresult = 0, binresult = [], octresult = [],
                i = 0, j = 0, k = 0, result = []
            //HEX => DEC
            for (i = 0; i < decnumber.length; i++) {
                var ch = decnumber[i]
                var x = hexch.indexOf(ch)
                decresult = decresult + x * Math.pow(16, decnumber.length - (i + 1))
            }
            result[0] = decresult
            //HEX => BIN
            binnumber = Number(decresult)
            while (binnumber > 0) {
                binresult[j] = binnumber % 2
                binnumber = Math.floor(binnumber / 2)
                j++
            }
            result[1] = binresult.toString()
            result[1] = result[1].split("").reverse().join("")
            result[1] = result[1].replace(/,/g, "")
            //HEX => OCT
            octnumber = Number(decresult)
            while (octnumber > 0) {
                octresult[k] = octnumber % 8
                octnumber = Math.floor(octnumber / 8)
                k++
            }
            result[2] = octresult.toString()
            result[2] = result[2].split("").reverse().join("")
            result[2] = result[2].replace(/,/g, "")
            //Desc Embed
            const H_Desc = `<a:LYG_TighnariNotes:1090126010571300874> | **Số Cần Quy Đổi:** [HEX] ` + '`' + checkstr + '`' + `\n\n> [DEC] ${result[0]}\n> [BIN] ${result[1]}\n> [OCT] ${result[2]}`
            return H_Desc
        }
        //KEY = BIN
        function binconv(checkstr) {
            var decnumber = checkstr, hexnumber, octnumber
            hexch = '0123456789ABCDEF'
            decresult = 0, hexresult = '', octresult = [],
                i = 0, j = 0, result = []
            //BIN => DEC
            for (i = 0; i < decnumber.length; i++) {
                if (Number(decnumber[i]) == 1) {
                    decresult = decresult + Math.pow(2, decnumber.length - (i + 1))
                }
            }
            result[0] = decresult
            //BIN => HEX
            hexnumber = Number(decresult)
            while (hexnumber > 0) {
                var a
                a = hexnumber % 16
                hexresult += hexch[Number(a)]
                hexnumber = Math.floor(hexnumber / 16)
            }
            result[1] = hexresult
            result[1] = result[1].split("").reverse().join("")
            result[1] = result[1].replace(/,/g, "")
            //BIN => OCT
            octnumber = Number(decresult)
            while (octnumber > 0) {
                octresult[j] = octnumber % 8
                octnumber = Math.floor(octnumber / 8)
                j++
            }
            result[2] = octresult.toString()
            result[2] = result[2].split("").reverse().join("")
            result[2] = result[2].replace(/,/g, "")
            //Desc Embed
            const B_Desc = `<a:LYG_TighnariNotes:1090126010571300874> | **Số Cần Quy Đổi:** [BIN] ` + '`' + checkstr + '`' + `\n\n> [DEC] ${result[0]}\n> [HEX] ${result[1]}\n> [OCT] ${result[2]}`
            return B_Desc
        }
        //Key = OCT
        function octconv(checkstr) {
            var decnumber = Number(checkstr), hexnumber, binnumber
            hexch = '0123456789ABCDEF'
            decresult = 0, hexresult = [], binresult = [],
                i = 0, j = 0, result = []
            //OCT => DEC
            while (decnumber > 0) {
                decresult = decresult + (decnumber % 10) * Math.pow(8, i)
                decnumber = Math.floor(decnumber / 10)
                i++
            }
            result[0] = decresult
            //OCT => HEX
            hexnumber = Number(decresult)
            while (hexnumber > 0) {
                var a
                a = hexnumber % 16
                hexresult += hexch[Number(a)]
                hexnumber = Math.floor(hexnumber / 16)
            }
            result[1] = hexresult.toString()
            result[1] = result[1].split("").reverse().join("")
            result[1] = result[1].replace(/,/g, "")
            //OCT => BIN
            binnumber = Number(decresult)
            while (binnumber > 0) {
                binresult[i] = binnumber % 2
                binnumber = Math.floor(binnumber / 2)
                i++
            }
            result[2] = binresult.toString()
            result[2] = result[2].split("").reverse().join("")
            result[2] = result[2].replace(/,/g, "")
            //Desc Embed
            const O_Desc = `<a:LYG_TighnariNotes:1090126010571300874> | **Số Cần Quy Đổi:** [OCT] ` + '`' + checkstr + '`' + `\n\n> [DEC] ${result[0]}\n> [HEX] ${result[1]}\n> [BIN] ${result[2]}`
            return O_Desc
        }
        //DEC Embed
        function FinalEmbed(key) {
            var FinalEmbed
            if (key === 'DEC') {
                FinalEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(`**<a:LYG_GanyuNap:1096457111094964277> Quy Đổi Số**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(decconv(checkstr))
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            }
            if (key === 'HEX') {
                FinalEmbed = new EmbedBuilder()
                    .setColor('Yellow')
                    .setTitle(`**<a:LYG_GanyuNap:1096457111094964277> Quy Đổi Số**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(hexconv(checkstr))
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })

            }
            if (key === 'BIN') {
                FinalEmbed = new EmbedBuilder()
                    .setColor('Blue')
                    .setTitle(`**<a:LYG_GanyuNap:1096457111094964277> Quy Đổi Số**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(binconv(checkstr))
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })

            }
            if (key === 'OCT') {
                FinalEmbed = new EmbedBuilder()
                    .setColor('Purple')
                    .setTitle(`**<a:LYG_GanyuNap:1096457111094964277> Quy Đổi Số**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(octconv(checkstr))
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })

            }
            return FinalEmbed
        }
        const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '729671009631862834', '1084992470074531960']
        function checkCD(auser) {
            var i
            for (i in userarr) {
                if (auser === userarr[i])
                    return true
            }
            return false
        }
        const Bypass_ = checkCD(auser)
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDNumconv: Date.now() + cdtime,
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDNumconv
                console.log('[Command: Numconv]', cduser, CDTime, Date.now())
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
                    data.CDNumconv = Date.now() + cdtime
                    data.save()
                    await interaction.reply({
                        embeds: [ReadyEmbed],
                        components: [NumRow],
                    })
                    const filter = a => a.user.id === user;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 })
                    collector.on('collect', async a => {
                        switch (a.customId) {
                            default:
                                {
                                    break
                                }
                            case 'dec':
                                {
                                    key = 'DEC'
                                    key = CheckStr(key)
                                    console.log(key)
                                    if (key === 'ERROR') {
                                        await interaction.editReply({
                                            embeds: [ErrorEmbed],
                                            components: [],
                                        })
                                    }
                                    else {
                                        await interaction.editReply({
                                            embeds: [SetWaitEmbed(key)],
                                            components: [],

                                        })
                                        await wait(2500)
                                        await interaction.editReply({
                                            embeds: [FinalEmbed(key)],
                                            components: [],
                                        })
                                    }
                                    break
                                }
                            case 'hex':
                                {
                                    key = 'HEX'
                                    key = CheckStr(key)
                                    console.log(key)
                                    if (key === 'ERROR') {
                                        await interaction.editReply({
                                            embeds: [ErrorEmbed],
                                            components: [],
                                        })
                                    }
                                    else {
                                        await interaction.editReply({
                                            embeds: [SetWaitEmbed(key)],
                                            components: [],
                                        })
                                        await wait(2500)
                                        await interaction.editReply({
                                            embeds: [FinalEmbed(key)],
                                            components: [],
                                        })
                                    }
                                    break
                                }
                            case 'bin':
                                {
                                    key = 'BIN'
                                    key = CheckStr(key)
                                    console.log(key)
                                    if (key === 'ERROR') {
                                        await interaction.editReply({
                                            embeds: [ErrorEmbed],
                                            components: [],
                                        })
                                    }
                                    else {
                                        await interaction.editReply({
                                            embeds: [SetWaitEmbed(key)],
                                            components: [],
                                        })
                                        await wait(2500)
                                        await interaction.editReply({
                                            embeds: [FinalEmbed(key)],
                                            components: [],
                                        })
                                    }
                                    break
                                }
                            case 'oct':
                                {
                                    key = 'OCT'
                                    key = CheckStr(key)
                                    console.log(key)
                                    if (key === 'ERROR') {
                                        await interaction.editReply({
                                            embeds: [ErrorEmbed],
                                            components: [],
                                        })
                                    }
                                    else {
                                        await interaction.editReply({
                                            embeds: [SetWaitEmbed(key)],
                                            components: [],
                                        })
                                        await wait(2500)
                                        await interaction.editReply({
                                            embeds: [FinalEmbed(key)],
                                            components: [],
                                        })
                                    }
                                }
                        }
                    })
                }
            }
        })
    }
}