const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk')

const wait = require('node:timers/promises').setTimeout;
const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Tung Đồng Xu Vui (Có 3 Trường Hợp Nhá)')
        .addStringOption(option =>
            option.setName('facing')
                .setDescription('Lấy Mặt Đổng Xu Có 3 Trường Hợp Nhá!')
                .setRequired(true)
                .addChoices(
                    { name: 'Head', value: 'Head' },
                    { name: 'Tail', value: 'Tail' },
                    { name: 'Stand', value: 'Stand' }
                )),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        //Setup Game
        const cdtime = 15000
        const userstr = interaction.options.getString('facing')
        const facingstr = `**${userstr}**`
        var colorx, descx, coinrng, coinstr, result
        const headchar = '`[Head]`'
        const tailchar = '`[Tail]`'
        const specialchar = '`[Stand]`'
        const winchar = '<:LYG_OkayuYay:1084085932254298122> **Bạn Đã Thắng! Chúc Mừng Bạn!**'
        const losechar = '<:LYG_XD:1087375888276000788> **Bạn Đã Thua, Chúc Bạn May Mắn Lần Sau!**'
        const speciallose = '<:LYG_FubukiSmug:1090619361389191268> **Bro À, Tỉ Lệ `1/6000` Không Dễ Ăn Đâu Nhé!!!**'
        const specialwin = '<:LYG_higod:1086172130254798858> **Thưa Ngài, Ngài Đã Vào Được Coinflip HÀNG HIẾM NHẤT `1/6000` Đấy Ạ**'
        //Setup Embed
        const SetupEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`<a:LYG_cflip:1090615324551942225> Game: Tung Xu`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<a:LYG_FubukiWhat:1084085930266218556> Mặt Lựa Chọn Của ${interaction.user}... Là Mặt: ${facingstr}`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const WaitEmbed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle(`<a:LYG_cflip:1090615324551942225> Game: Tung Xu`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<a:LYG_FubukiWhat:1084085930266218556> Đang Tung Xu Cho ${interaction.user}... *(Xin Chờ Một Lát...)*`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        coinrng = Math.random() * 6.001
        coinrng = (Math.floor(coinrng * 1000) / 1000).toFixed(3)
        if (coinrng <= 2.999) {
            coinstr = 'Head'
            result = `**Kết Quả Tung Xu Của ${interaction.user}:** <:LYG_chead:1092473155802640384> ${headchar}`
        }
        else if (coinrng >= 3.001) {
            coinstr = 'Tail'
            result = `**Kết Quả Tung Xu Của ${interaction.user}:** <:LYG_ctail:1090615312690466847> ${tailchar}`
        }
        else {
            coinstr = 'Stand'
            result = `**Kết Quả Tung Xu Của ${interaction.user}:** <a:LYG_404:1086172141998833684> ${specialchar}`
        }
        //Function
        function ResultDesc(userstr, coinstr) {
            if (userstr === coinstr && coinstr === 'Stand') {
                descx = `<a:LYG_FubukiWhat:1084085930266218556> Mặt Lựa Chọn Của ${interaction.user}... Là Mặt: ${facingstr}\n> ${result}\n> ${winchar}\n> Note: ${specialwin}`
            }
            else if (userstr === coinstr && coinstr !== 'Stand') {
                descx = `<a:LYG_FubukiWhat:1084085930266218556> Mặt Lựa Chọn Của ${interaction.user}... Là Mặt: ${facingstr}\n> ${result}\n> ${winchar}`
            }
            else if (userstr !== coinstr && coinstr === 'Stand') {
                descx = `<a:LYG_FubukiWhat:1084085930266218556> Mặt Lựa Chọn Của ${interaction.user}... Là Mặt: ${facingstr}\n> ${result}\n> ${losechar}\n> Note: ${speciallose}`
            }
            else if (userstr === 'Stand' && userstr !== coinstr) {
                descx = `<a:LYG_FubukiWhat:1084085930266218556> Mặt Lựa Chọn Của ${interaction.user}... Là Mặt: ${facingstr}\n> ${result}\n> ${losechar}\n> Note: ${speciallose}`
            }
            else {
                descx = `<a:LYG_FubukiWhat:1084085930266218556> Mặt Lựa Chọn Của ${interaction.user}... Là Mặt: ${facingstr}\n> ${result}\n> ${losechar}`
            }
            return descx
        }
        function Color(userstr, coinstr) {
            if (userstr === coinstr && coinstr === 'Stand') {
                colorx = '#00C1FF'
            }
            else if (userstr === coinstr && coinstr !== 'Stand') {
                colorx = '#09FF00'
            }
            else if (userstr !== coinstr && coinstr === 'Stand') {
                colorx = '#00C1FF'
            }
            else if (userstr === 'Stand' && userstr !== coinstr) {
                colorx = '#00C1FF'
            }
            else {
                colorx = '#CF0000'
            }
            return colorx
        }
        const ResultEmbed = new EmbedBuilder()
            .setColor(Color(userstr, coinstr))
            .setTitle(`<a:LYG_cflip:1090615324551942225> Game: Tung Xu`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(ResultDesc(userstr, coinstr))
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

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
                    CDCoinflip: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDCoinflip
                console.log(chalk.yellow('[Command: Coinflip]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)
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
                    data.CDCoinflip = Date.now() + cdtime
                    data.save()
                    if (userstr) {
                        await interaction.editReply({
                            embeds: [SetupEmbed],
                        })
                        await wait(1000)
                        await interaction.editReply({
                            embeds: [WaitEmbed]
                        })
                        await wait(2500)
                        await interaction.editReply({
                            embeds: [ResultEmbed],
                        })
                    }
                    console.log('========================================\nRng Encounter:', coinrng, `\nUser Char: ${userstr}\nCoin Char: ${coinstr}`, '\n========================================')
                }
            }
        })
    }
}