const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const cd = new Set();
const cdend = new Set();
const cdtime = 15000;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Tung Xúc Xắc (Loại 6 Mặt)')
        .addNumberOption(option =>
            option.setName('quantity')
                .setDescription('Số Lượng Xúc Xắc Bạn Nhập Vào (Max: 10 Xúc Xắc, Loại 6 Mặt)')
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(10)),
    async execute(interaction) {
        const user = interaction.user.id
        const quantity = interaction.options.getNumber('quantity')
        var runquantity = 0
        //runquantity (Biến Chính Để Chạy Function)
        if (quantity === null) {
            runquantity = 1
        }
        else {
            runquantity = quantity
        }
        //Face 6 Mặt
        const facearr = [
            '<:LYG_Dice1:1090613349571629096>',
            '<:LYG_Dice2:1090613355967959140>',
            '<:LYG_Dice3:1090613362292969512>',
            '<:LYG_Dice4:1090613368731226263>',
            '<:LYG_Dice5:1090613373198155846>',
            '<:LYG_Dice6:1090613378923372544>',
        ]
        const chrarr = ['`1 Nút`', '`2 Nút`', '`3 Nút`', '`4 Nút`', '`5 Nút`', '`6 Nút`',]
        var totalscore = 0
        var DiceEmbeds = []
        function Roll(runquantity) {
            var rollrng = []
            var rollrngchr = []
            var rollrngchr2 = []
            var finalrng = ['',]
            var total_scores = 0
            for (var i = 1; i <= runquantity; i++) {
                rollrng[i] = Math.floor(Math.random() * 6) + 1
                total_scores += rollrng[i]
                switch (rollrng[i]) {
                    default:
                        {
                            break
                        }
                    case 1:
                        {
                            rollrngchr[i] = facearr[0]
                            rollrngchr2[i] = chrarr[0]
                            break
                        }
                    case 2:
                        {
                            rollrngchr[i] = facearr[1]
                            rollrngchr2[i] = chrarr[1]
                            break
                        }
                    case 3:
                        {
                            rollrngchr[i] = facearr[2]
                            rollrngchr2[i] = chrarr[2]
                            break
                        }
                    case 4:
                        {
                            rollrngchr[i] = facearr[3]
                            rollrngchr2[i] = chrarr[3]
                            break
                        }
                    case 5:
                        {
                            rollrngchr[i] = facearr[4]
                            rollrngchr2[i] = chrarr[4]
                            break
                        }
                    case 6:
                        {
                            rollrngchr[i] = facearr[5]
                            rollrngchr2[i] = chrarr[5]
                            break
                        }
                }
                finalrng.push(rollrngchr[i] + ' ' + rollrngchr2[i])
            }
            finalrng.push(total_scores)
            return finalrng
        }
        const WaitEmbed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`<a:LYG_DiceRoll:1090613205149175941> Game: Tung Xúc Xắc`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<a:LYG_FubukiWhat:1084085930266218556> Đang Tung Xúc Xắc Cho ${interaction.user}... *(Xin Chờ Một Lát...)*`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        const final_arr = Roll(runquantity)
        totalscore = final_arr[final_arr.length - 1]
        const totaldesc = `<a:LYG_FubukiWhat:1084085930266218556> Tổng Số Nút Đã Roll Của ${interaction.user} Là: **${totalscore} Nút**`
        var executedesc = ''
        var descembed = []
        for (var embed = 1; embed <= final_arr.length - 2; embed++) {
            descembed.push(`> Kết Quả Roll Xúc Xắc **Lần ${embed} Là**: ${final_arr[embed]}\n`)
            executedesc = descembed.join('')
            DiceEmbeds[embed] = new EmbedBuilder()
                .setColor('Grey')
                .setTitle(`<a:LYG_DiceRoll:1090613205149175941> Game: Tung Xúc Xắc`)
                .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                .setDescription(executedesc)
                .setTimestamp()
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        }
        descembed.push(totaldesc)
        executedesc = descembed.join('')
        const FinalEmbed = new EmbedBuilder()
            .setColor('White')
            .setTitle(`<a:LYG_DiceRoll:1090613205149175941> Game: Tung Xúc Xắc`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(executedesc)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });

        const cduser = interaction.user.id
        var CDBool = false
        function BypassCD(cduser) {
            const CDPassList = ['751225225047179324', '786816081032773662', '927221951439700058', '809259609700302935', '729671009631862834', '888738277044133899', '912514337602666526', '961838901792735243']
            for (var i in CDPassList) {
                if (cduser === CDPassList[i]) {
                    CDBool = true
                }
            }
        }
        BypassCD(cduser)
        const cdembed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
            .setAuthor({ name: 'Miosha#5189', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(cdend[cduser] / 1000)}> (<t:${Math.round(cdend[cduser] / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        if (cd.has(interaction.user.id) && !CDBool) {
            await interaction.reply({
                embeds: [cdembed]
            })
        } else {
            console.log('========================================\nRng Encounter:', final_arr, '\n========================================')
            await interaction.reply({
                embeds: [WaitEmbed]
            })
            await wait(2500)
            for (var embed = 1; embed <= final_arr.length - 2; embed++) {
                await interaction.editReply({
                    embeds: [DiceEmbeds[embed]]
                })
                await wait(1000)
            }
            await interaction.editReply({
                embeds: [FinalEmbed]
            })
        }
    }
}