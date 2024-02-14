const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk')

const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pick')
        .setDescription('Pick Lựa Chọn Random Bất Kì Mà Bạn Đưa Ra')
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Ghi Theo Format Này Nhá: [Option], ...')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        const cdtime = 10000
        const str = interaction.options.getString('options');
        var strlist = str.split(/, /)
        console.log(strlist)

        var rng = Math.round(Math.random() * strlist.length)
        console.log(strlist.length)
        if (rng >= strlist.length) {
            rng--
        }
        var rngstr = strlist[rng]
        const responselist = ['Tớ Chọn Cái Này: ', 'Theo Tớ Thì Là Cái Này: ', 'Lựa Chọn Của Tớ Đây: ', 'Tớ Chọn Cho Bạn Cái Này: ', 'Đây, Ổn Chứ? ']
        var rerng = Math.round(Math.random() * responselist.length)
        if (rerng >= responselist.length) {
            rerng--
        }
        var responsestr = responselist[rerng]
        console.log(strlist.length, rng, rerng)
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
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDPick: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDPick
                console.log(chalk.yellow('[Command: Pick]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)
                if (CDTime > Date.now() && !Bypass_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDPick = Date.now() + cdtime
                    data.save()
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setTitle(`<a:LYG_FubukiBorger:975937199486951464> **Ý Trời Mà Bạn Nhận Được**`)
                        .setDescription(`> ${interaction.user} | ${responsestr} **${rngstr}**`)
                        .setColor('DarkButNotBlack')
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [embed]
                    })
                }
            }
        })
    }
}
