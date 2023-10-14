const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cdSchema = require('../../Database/cooldown')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pick')
        .setDescription('Pick Lựa Chọn Random Bất Kì Mà Bạn Đưa Ra')
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Ghi Theo Format Này Nhá: [Option], ...')
                .setRequired(false)),
    async execute(interaction) {
        const cdtime = 10000
        const str = interaction.options.getString('options');
        var strlist = str.split(/, /)
        console.log(strlist)
        var rng = Math.round(Math.random() * strlist.length)
        if (rng >= strlist.length) {
            rng--
        }
        var rngstr = strlist[rng]
        const responselist = ['Tớ Chọn Cái Này:', 'Theo Tớ Thì Là Cái Này: ', 'Lựa Chọn Của Tớ Đây: ', 'Tớ Chọn Cho Bạn Cái Này: ', 'Đây, Ổn Chứ?']
        var rerng = Math.round(Math.random() * 5)
        if (rerng >= responselist.length) {
            rerng--
        }
        var responsestr = responselist[rerng]
        console.log(strlist.length, rng, rerng)
        const auser = interaction.user.id
        function BypassCD(auser) {
            const CDPassList = ['751225225047179324', '786816081032773662', '927221951439700058', '809259609700302935', '729671009631862834', '888738277044133899', '912514337602666526', '961838901792735243']
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
                    CDPick: Date.now() + cdtime,
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDPick
                console.log('[Command: Pick]', cduser, CDTime, Date.now())
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
                    data.CDPick = Date.now() + cdtime
                    data.save()
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setTitle(`<a:LYG_FubukiBorger:975937199486951464> **Ý Trời Mà Bạn Nhận Được**`)
                        .setDescription(`> ${interaction.user} | ${responsestr} **${rngstr}**`)
                        .setColor('DarkButNotBlack')
                        .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                    await interaction.reply({
                        embeds: [embed]
                    })
                }
            }
        })
    }
}
/*const cdembed = new EmbedBuilder()
    .setColor('Red')
    .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
    .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(cdend[cduser] / 1000)}> (<t:${Math.round(cdend[cduser] / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
    .setTimestamp()
    .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
if (cd.has(interaction.user.id) && !CDBool) {
    await interaction.reply({
        embeds: [cdembed]
    })
} else {
    cdend[cduser] = Date.now()
    cdend[cduser] = cdend[cduser] + cdtime
    ;
    cd.add(interaction.user.id)
    setTimeout(() => {
        cd.delete(interaction.user.id)
    }, cdtime)
}
    }
}*/