const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cd = new Set();
const cdend = new Set();
const cdtime = 10000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('numconv')
        .setDescription('Chuyển Đổi Số Sang Các Hệ Cơ Số Khác Nhau (DEC/HEX/BIN)/OCT')
        .addStringOption(option =>
            option.setName('number')
                .setDescription('Nhập Số Bạn Cần Quy Đổi, Giới Hạn 32 Kí Tự (NOTE: OCT: CHỈ CÓ Ở OUTPUT DO THUỘC DEC)')
                .setMaxLength(32)
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.user.id
        //Lấy Dữ Liệu
        var prestr = interaction.options.getString('number')
        var typech //Key Xác Định Dữ Liệu Chạy Function
        //Lấy Key Xác Định
        function checknumtype(prestr) {
            prestr = prestr.toUpperCase()
            const decarr = '0123456789', hexarr = '0123456789ABCDEF', binarr = '01'
            var dcount = 0, hcount = 0, bcount = 0
            for (var i in prestr) {
                var ch = prestr[i]
                var dnum = decarr.indexOf(ch), hnum = hexarr.indexOf(ch), bnum = binarr.indexOf(ch)
                if (bnum !== -1) {
                    bcount++
                }
                if (dnum !== -1) {
                    dcount++
                }
                if (hnum !== -1) {
                    hcount++
                }
            }
            if (bcount === prestr.length) {
                typech = 'BIN'
                return
            }
            if (dcount === prestr.length) {
                typech = 'DEC'
                return
            }
            if (hcount === prestr.length) {
                typech = 'HEX'
                return
            }
            return typech = 'ERROR'
        }
        //Key = DEC
        function decconv(prestr) {
            var hexnumber = Number(prestr), binnumber = Number(prestr), octnumber = Number(prestr),
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
            const D_Desc = `<a:LYG_TighnariNotes:1090126010571300874> | **Số Cần Quy Đổi:** [DEC] ${prestr}\n\n> [HEX] ${result[0]}\n> [BIN] ${result[1]}\n> [OCT] ${result[2]}`
            return D_Desc
        }
        //Key = HEX
        function hexconv(prestr) {
            var decnumber = prestr.toUpperCase(), binnumber, octnumber
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
            const H_Desc = `<a:LYG_TighnariNotes:1090126010571300874> | **Số Cần Quy Đổi:** [HEX] ${prestr}\n\n> [DEC] ${result[0]}\n> [BIN] ${result[1]}\n> [OCT] ${result[2]}`
            return H_Desc
        }
        //KEY = BIN
        function binconv(prestr) {
            var decnumber = prestr, hexnumber, octnumber
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
            const B_Desc = `<a:LYG_TighnariNotes:1090126010571300874> | **Số Cần Quy Đổi:** [BIN] ${prestr}\n\n> [DEC] ${result[0]}\n> [HEX] ${result[1]}\n> [OCT] ${result[2]}`
            return B_Desc
        }
        //Chạy Key
        checknumtype(prestr)
        //DEC Embed
        const DecEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`**<a:LYG_GanyuNap:1096457111094964277> Quy Đối Số**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(decconv(prestr))
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //HEX Embed
        const HexEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`**<a:LYG_GanyuNap:1096457111094964277> Quy Đối Số**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(hexconv(prestr))
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //BIN Embed
        const BinEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`**<a:LYG_GanyuNap:1096457111094964277> Quy Đối Số**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(binconv(prestr))
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        //Khi Key = ERROR, Xuất Embed Này
        const ErrorEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_GanyuNap:1096457111094964277> **Quy Đối Số**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | Oi! Bạn Đã Nhập Sai Định Dạng Số Rồi! (**${prestr}**)`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });

        const cdembed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${user}> Oi! Bạn Phải Chờ Đến <t:${Math.round(cdend[user] / 1000)}> (<t:${Math.round(cdend[user] / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        
        var CDBool = false
        const CDPassList = ['751225225047179324', '786816081032773662', '927221951439700058','729671009631862834', '961838901792735243']
        function checkCD(user) {
            var i
            for (i in CDPassList) {
                if (user === CDPassList[i])
                    CDBool = true
            }
        }
        checkCD(user)
        if (cd.has(interaction.user.id) && !CDBool) {
            await interaction.reply({
                embeds: [cdembed]
            })
        } else {
            cdend[user] = Date.now()
            cdend[user] = cdend[user] + cdtime
                switch (typech) {
                    case 'DEC': {
                        await interaction.reply({
                            embeds: [DecEmbed],
                            ephemeral: true,
                        })
                        break
                    }
                    case 'HEX': {
                        await interaction.reply({
                            embeds: [HexEmbed],
                        })
                        break
                    }
                    case 'BIN': {
                        await interaction.reply({
                            embeds: [BinEmbed],
                        })
                        break
                    }
                    case 'ERROR': {
                        await interaction.reply({
                            embeds: [ErrorEmbed],
                        })
                        break
                    }
                    default:
                        await interaction.reply({
                            embeds: [ErrorEmbed],
                        })
                }
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
        }
    }
};