const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command Purpose...'),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds

        const cdtime = 300000
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDTest: Date.now(),
                })
            }
            if (data) {
                const user = data.UserID
                const CDTime = data.CDTest
                console.log('[Command: Test]', user, CDTime, Date.now())
                const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '892054339072438303', '1084992470074531960']
                const FinalEmbed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`Test`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription('Đã Test Lệnh Này Dành Cho Chủ Bot... Và Một Số Người Quan Trọng')
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                function BypassCD(user) {
                    var i
                    for (i in userarr) {
                        if (user === userarr[i]) {
                            return true
                        }
                    }
                    return false
                }
                function PermUsing(user) {
                    var i
                    for (i in userarr) {
                        if (user === userarr[i]) {
                            return true
                        }
                    }
                    return false
                }
                const Perm_ = PermUsing(user)
                const BypassCD_ = BypassCD(user)
                if (CDTime > Date.now() && !BypassCD_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${user}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                    await interaction.reply({
                        embeds: [cdembed],
                        ephemeral: true
                    })
                } else {
                    data.CDTest = Date.now() + cdtime
                    data.save()
                    if (Perm_ === true) {
                        await interaction.reply({
                            embeds: [FinalEmbed],
                            ephemeral: true
                        })
                    }
                    else {
                        await interaction.reply({
                            content: 'No! Bạn Không Có Quyền Sử Dụng Command Này!',
                        })
                    }
                }
            }
        })
    }
}