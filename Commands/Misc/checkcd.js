const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')
const BanList = require('../../Database/banlist')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkcd')
        .setDescription('Check Cooldown Của Một Số Lệnh Hay Dùng Trong Server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Check CD')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        const checkuser = interaction.options.getUser('user') || interaction.user

        const auser = interaction.user.id
        function BypassCD(auser) {
            const CDPassList = BypassList
            for (var i in CDPassList) {
                if (auser === CDPassList[i]) {
                    return true
                }
            }
            return false
        }
        const Bypass_ = BypassCD(auser)

        cdSchema.findOne({ UserID: checkuser.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                const NoData = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Check Cooldown**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`${checkuser} Không Có Sử Dụng Bất Cứ Lệnh Nào, Thì Làm Sao Check?`)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                await interaction.editReply({
                    embeds: [NoData]
                })
            }
            if (data) {
                const CDList = [
                    Math.floor(data.CDRank / 1000),
                    Math.floor(data.CDTop / 1000),
                    Math.floor(data.CDHowgay / 1000),
                    Math.floor(data.CDOmikuji / 1000),
                ]
                const CmdName = [
                    '**Rank:**',
                    '**Top:**',
                    '**Howgay:**',
                    '**Omikuji:**'
                ]
                var n
                if (interaction.guild.id === '900742301373042809') {
                    n = 0
                } else {
                    n = 2
                }
                const CDTimeChr = []
                var result = [`> Cooldown Một Số Lệnh Thông Dụng Cho ${checkuser}\n\n`]
                var finalresult = ''
                if (!Bypass_) {
                    for (var i = n; i < CDList.length; i++) {
                        if (CDList[i] > (Date.now() / 1000)) {
                            CDTimeChr[i] = `${CmdName[i]} (<t:${CDList[i]}:R>)\n`
                        } else {
                            CDTimeChr[i] = `${CmdName[i]} (Có Thể Dùng)\n`
                        }
                        result.push(CDTimeChr[i])
                    }
                    let BanTime = await BanList.findOne({ UserID: checkuser.id })
                    if (BanTime) {
                        const a = BanTime.Time
                        if (a - Date.now() > 86400000 * 365 * 10) {
                            result[result.length - 2] = `${CmdName[CmdName.length - 2]} (Banned)\n`
                        } else {
                            result[result.length - 2] = `${CmdName[CmdName.length - 2]} (Banned Cho Đến: <t:${Math.floor(a / 1000)}:R>)\n`
                        }
                    }
                } else {
                    for (var i = n; i < CDList.length - 1; i++) {
                        CDTimeChr[i] = `${CmdName[i]} (Có Thể Dùng)\n`
                        result.push(CDTimeChr[i])
                    }
                    var Omikuji = `${CmdName[CmdName.length - 1]} (<t:${CDList[CDList.length - 1]}:R>)\n`
                    if ((Date.now() / 1000) > CDList[CDList.length - 1]) {
                        Omikuji = `${CmdName[CmdName.length - 1]} (Có Thể Dùng)\n`
                    }
                    result.push(Omikuji)
                    let BanTime = await BanList.findOne({ UserID: checkuser.id })
                    if (BanTime) {
                        const a = BanTime.Time
                        if (a - Date.now() > 86400000 * 365 * 10) {
                            result[result.length - 2] = `${CmdName[CmdName.length - 2]} (Banned)\n`
                        } else {
                            result[result.length - 2] = `${CmdName[CmdName.length - 2]} (Banned Cho Đến: <t:${Math.floor(a / 1000)}:R>)\n`
                        }
                    }
                }

                for (var i = 0; i < result.length; i++) {
                    finalresult += result[i]
                }

                const CDCheckEmbed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Check Cooldown**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(finalresult)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                await interaction.editReply({
                    embeds: [CDCheckEmbed]
                })
            }
        })
    }
}