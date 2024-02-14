const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk')

const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll Số Random Bất Kì Theo Gới Hạn (Default: 0 và 100)')
        .addNumberOption(option =>
            option.setName('minlimit')
                .setDescription('Giới Hạn Dưới (Từ 0 Trở Lên Nhá)')
                .setRequired(false)
                .setMinValue(0))
        .addNumberOption(option =>
            option.setName('maxlimit')
                .setDescription('Giới Hạn Trên (Nguyên Dương Nhá)')
                .setRequired(false)
                .setMinValue(0)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        const cdtime = 10000
        var up = 0
        var down = 0
        const downlimit = interaction.options.getNumber('minlimit')
        const uplimit = interaction.options.getNumber('maxlimit')

        if (downlimit === null) {
            down = 0
        }
        else {
            down = downlimit
        }
        if (uplimit === null) {
            up = 101
        }
        else {
            up = uplimit
        }
        const rng = Math.floor(Math.random() * (up - down + 1)) + down
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
                    CDRoll: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDRoll
                console.log(chalk.yellow('[Command: Roll]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)
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
                    data.CDRoll = Date.now() + cdtime
                    data.save()
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setTitle(`<a:LYG_FubukiBorger:975937199486951464> **Number Roll**`)
                        .setDescription(`> ${interaction.user} Đã Roll Được **${rng}** Điểm`)
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
