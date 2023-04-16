const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout
const cd = new Set();
const cdend = new Set();
const cdtime = 100000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command Purpose...')
        .addStringOption(option =>
            option.setName('amount')
                .setDescription('Số Lượng Giả Sử Bạn Ném Vô (Max: 150000), Keyword: "all"')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.user.id
        const str = interaction.options.getString('amount')
        const spinstr = '<a:LYG_SlSpin:1097139730635833415>'
        const blankstr = '<:LYG_blank:1097172753985056859>'
        const maxamount = 150000
        const numarr = '0123456789'
        const emoarr = ['<:LYG_SlNormal:1097003902857121934>', '<:LYG_SlStar:1097003847303577660>', '<:LYG_SlCorn:1097003771906764921>', '<:LYG_SlCover:1097003703128555614>', '<:LYG_SlMio:1097003631783456909>']
        var result = []
        var color = ''
        var stramount = ''
        var numcount = 0
        var multi = 0
        var resultamount = ''
        var err = false
        stramount = str.toLowerCase()
        if (stramount === 'all') {
            stramount = maxamount
            err = false
        } else {
            for (i in stramount) {
                var num = stramount[i]
                var checknum = numarr.indexOf(num)
                if (checknum != -1) {
                    numcount++
                }
            }
            if (numcount === stramount.length) {
                err = false
                stramount = str
                if(Number(stramount) > maxamount){
                    err = true
                }
            }
            else {
                err = true
            }
        }
        var resultdesc = []
        const desc1 = `> ${interaction.user} Đã Cược Vô Slot Lần Này: **${stramount}** <:LYG_Cowoncy:1097147478018629632>\n\n` + '`————SLOTS————`\n' + '| ' + `${blankstr}${spinstr}${spinstr}${spinstr}${blankstr}` + ' |\n' + `| ${blankstr}${blankstr}${blankstr}${blankstr}${blankstr} |\n| ${blankstr}${blankstr}${blankstr}${blankstr}${blankstr} |`
        var rng = Math.random()
        if (rng <= 0.20) {
            multi = 1
        }
        else if (rng <= 0.40) {
            multi = 2
        }
        else if (rng <= 0.45) {
            multi = 3
        }
        else if (rng <= 0.475) {
            multi = 4
        }
        else if (rng <= 0.875) {
            multi = 9
        }
        else {
            multi = -1
        }
        switch (multi) {
            case 1:
                {
                    result.push(emoarr[0])
                    result.push(emoarr[0])
                    result.push(emoarr[0])
                    resultamount = Number(stramount) * multi
                    break
                }
            case 2:
                {
                    result.push(emoarr[1])
                    result.push(emoarr[1])
                    result.push(emoarr[1])
                    resultamount = Number(stramount) * multi
                    break
                }
            case 3:
                {
                    result.push(emoarr[2])
                    result.push(emoarr[2])
                    result.push(emoarr[2])
                    resultamount = Number(stramount) * multi
                    break
                }
            case 4:
                {
                    result.push(emoarr[3])
                    result.push(emoarr[3])
                    result.push(emoarr[3])
                    resultamount = Number(stramount) * multi
                    break
                }
            case 9:
                {
                    result.push(emoarr[4])
                    result.push(emoarr[4])
                    result.push(emoarr[4])
                    resultamount = Number(stramount) * multi
                    break
                }
            default:
                {
                    var s1, s2, s3
                    s1 = Math.floor(Math.random() * (emoarr.length - 1))
                    s2 = Math.floor(Math.random() * (emoarr.length - 1))
                    s3 = Math.floor(Math.random() * (emoarr.length - 1))
                    if (s1 == s3) {
                        s2 = s2 = (s1 + Math.ceil(Math.random() * (emoarr.length - 2))) % (emoarr.length - 1)
                    }
                    result.push(emoarr[s1])
                    result.push(emoarr[s2])
                    result.push(emoarr[s3])
                    resultamount = Number(stramount) * multi * -1
                }
        }
        resultdesc[0] = `> ${interaction.user} Đã Cược Vô Slot Lần Này: **${stramount}** <:LYG_Cowoncy:1097147478018629632>\n\n` + '`————SLOTS————`\n' + '| ' + `${blankstr}${result[0]}${spinstr}${spinstr}${blankstr}` + ' |\n' + `| ${blankstr}${blankstr}${blankstr}${blankstr}${blankstr} |\n| ${blankstr}${blankstr}${blankstr}${blankstr}${blankstr} |`
        resultdesc[1] = `> ${interaction.user} Đã Cược Vô Slot Lần Này: **${stramount}** <:LYG_Cowoncy:1097147478018629632>\n\n` + '`————SLOTS————`\n' + '| ' + `${blankstr}${result[0]}${spinstr}${result[2]}${blankstr}` + ' |\n' + `| ${blankstr}${blankstr}${blankstr}${blankstr}${blankstr} |\n| ${blankstr}${blankstr}${blankstr}${blankstr}${blankstr} |`
        resultdesc[2] = `> ${interaction.user} Đã Cược Vô Slot Lần Này: **${stramount}** <:LYG_Cowoncy:1097147478018629632>\n\n` + '`————SLOTS————`\n' + '| ' + `${blankstr}${result[0]}${result[1]}${result[2]}${blankstr}` + ' |\n' + `| ${blankstr}${blankstr}${blankstr}${blankstr}${blankstr} |\n| ${blankstr}${blankstr}${blankstr}${blankstr}${blankstr} |`
        if (multi !== -1) {
            resultdesc[3] = resultdesc[2] + `\n> Bạn Đã Thắng ${resultamount} <:LYG_Cowoncy:1097147478018629632>!!!\n**Note:** Đây Chỉ Là Giả Sử Thôi Nhé, Kết Quả Thật Tùy May Mắn Nhá!`
            color = '#00FF05'
        }
        else {
            resultdesc[3] = resultdesc[2] + `\n> Bạn Đã Mất ${resultamount} <:LYG_Cowoncy:1097147478018629632>!!!\n**Note:** Đây Chỉ Là Giả Sử Thôi Nhé, Kết Quả Thật Tùy May Mắn Nhá!`
            color = '#FF0000'
        }
        const ErrorEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_Slots:1096856649051938916> **Game - Slots**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | Oi! Hãy Định Giá Lúc Bạn Giả Sử Coi Nào! (**${stramount}**)`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        const ReadyEmbed = new EmbedBuilder()
            .setColor('Purple')
            .setTitle(`<a:LYG_Slots:1096856649051938916> **Game - Slots**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(desc1)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        const Embed1 = new EmbedBuilder()
            .setColor('Purple')
            .setTitle(`<a:LYG_Slots:1096856649051938916> **Game - Slots**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(resultdesc[0])
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        const Embed2 = new EmbedBuilder()
            .setColor('Purple')
            .setTitle(`<a:LYG_Slots:1096856649051938916> **Game - Slots**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(resultdesc[1])
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        const Embed3 = new EmbedBuilder()
            .setColor(color)
            .setTitle(`<a:LYG_Slots:1096856649051938916> **Game - Slots**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(resultdesc[3])
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        var check = false
        const userarr2 = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '729671009631862834', '1084992470074531960']
        function checkID(user) {
            var i
            for (i in userarr2) {
                if (user === userarr2[i])
                    check = true
            }
        }
        var CDBool = false
        const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '729671009631862834', '1084992470074531960']
        function checkCD(user) {
            var i
            for (i in userarr) {
                if (user === userarr[i])
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
            checkID(user)
            if (check === false) {
                await interaction.reply({
                    content: 'No! Bạn Không Có Quyền Sử Dụng Command Này!',
                })
            }
            else {
                if (!err) {
                    await interaction.reply({
                        embeds: [ReadyEmbed],
                        ephemeral: true
                    })
                    await wait(1000)
                    await interaction.editReply({
                        embeds: [Embed1],
                        ephemeral: true
                    })
                    await wait(1000)
                    await interaction.editReply({
                        embeds: [Embed2],
                        ephemeral: true
                    })
                    await wait(1000)
                    await interaction.editReply({
                        embeds: [Embed3],
                        ephemeral: true
                    })
                }
                else {
                    await interaction.reply({
                        embeds: [ErrorEmbed],
                        ephemeral: true
                    })
                }
            }
            cd.add(interaction.user.id)
            setTimeout(() => {
                cd.delete(interaction.user.id)
            }, cdtime)
        }
        console.log(user, ' ', cdend[user])
    }
};