const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const cdSchema = require('../../Database/cooldown')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Lấy Avatar URL Của Người Dùng Bạn Chọn, Hoặc Avatar Của Bạn')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Avatar Của Người Dùng Cần Show')),
    async execute(interaction) {
        const cdtime = 5000
        const user = interaction.options.getUser('user');
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
                    CDAvatar: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDAvatar
                console.log('[Command: Avatar]', cduser, CDTime, Date.now())
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
                    data.CDAvatar = Date.now() + cdtime
                    data.save()
                    if (user) {
                        const user_embed = new EmbedBuilder()
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Avatar Displayer**`)
                            .setDescription(`[PNG Format](${user.displayAvatarURL({ dynamic: true, size: 512, extension: 'png' })}) • [JPG Format](${user.displayAvatarURL({ dynamic: true, size: 512, extension: 'jpg' })}) • [WEBP Format](${user.displayAvatarURL({ dynamic: true, size: 512, extension: 'webp' })})\n<a:OrinSway:1160295722009251870> **(User: ${user})**`)
                            .setColor('Blue')
                            .setImage(`${user.displayAvatarURL({ dynamic: true, size: 512 })}`)
                            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                        await interaction.reply({
                            embeds: [user_embed]
                        });
                    }
                    else {
                        const your_embed = new EmbedBuilder()
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Avatar Displayer**`)
                            .setDescription(`[PNG Format](${interaction.user.displayAvatarURL({ dynamic: true, size: 512, extension: 'png' })}) • [JPG Format](${interaction.user.displayAvatarURL({ dynamic: true, size: 512, extension: 'jpg' })}) • [WEBP Format](${interaction.user.displayAvatarURL({ dynamic: true, size: 512, extension: 'webp' })})\n<a:OrinSway:1160295722009251870> **(User: ${interaction.user})**`)
                            .setColor('Red')
                            .setImage(`${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
                            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
                        await interaction.reply({
                            embeds: [your_embed]
                        })
                    }
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
    
    cd.add(interaction.user.id)
    setTimeout(() => {
        cd.delete(interaction.user.id)
    }, cdtime)
}
}
}*/