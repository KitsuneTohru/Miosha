const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cdSchema = require('../../Database/cooldown')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command Purpose...'),
    async execute(interaction) {
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
                const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '729671009631862834', '1084992470074531960']
                const FinalEmbed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`Test`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription('Đã Test Lệnh Này Dành Cho Chủ Bot... Và Một Số Người Quan Trọng')
                    .setTimestamp()
                    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
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
                        .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
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