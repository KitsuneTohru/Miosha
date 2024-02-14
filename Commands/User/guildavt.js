const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk')

const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guildavt')
        .setDescription('Lấy Avatar URL Của Người Dùng Bạn Chọn, Hoặc Avatar Của Bạn (Trong Server, Nếu Có)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Avatar Của Người Dùng Cần Show')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('banner')
                .setDescription('Show Banner Của Người Dùng, Nếu Muốn')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        const cdtime = 5000
        var user = interaction.options.getMember('user') || interaction.user
        user = await interaction.guild.members.fetch(user.id)
        user = await user.fetch({ force: true })
        //console.log(user)
        let BannerUrl = user.user.bannerURL({ extension: 'png', size: 512, dynamic: true })
        console.log(`${chalk.cyanBright('[DEBUG]')} ${BannerUrl}`)

        const bannerkey = interaction.options.getBoolean('banner') || false

        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDGuildAvt: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDGuildAvt
                console.log(chalk.yellow('[Command: GuildAvt]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)
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
                    data.CDGuildAvt = Date.now() + cdtime
                    data.save()
                    const user_embed = new EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Avatar Displayer**`)
                        .setDescription(`[PNG Format](${user.displayAvatarURL({ dynamic: true, size: 512, extension: 'png' })}) • [JPG Format](${user.displayAvatarURL({ dynamic: true, size: 512, extension: 'jpg' })}) • [WEBP Format](${user.displayAvatarURL({ dynamic: true, size: 512, extension: 'webp' })})\n<a:OrinSway:1160295722009251870> **(User: ${user})**`)
                        .setColor('Blue')
                        .setTimestamp()
                        .setImage(`${user.displayAvatarURL({ dynamic: true, size: 512 })}`)
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [user_embed]
                    })
                    if (BannerUrl !== null && bannerkey) {
                        const banner_embed = new EmbedBuilder()
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Banner Displayer**`)
                            .setDescription(`[Banner URL](${BannerUrl})\n<a:OrinSway:1160295722009251870> **(User: ${user})**\n*Note: Vẫn Chưa Có Cách Để Tìm Cách Hiển Thị Banner Ở Guild... Hiện Tại Đang Tìm Cách Nhó!*`)
                            .setColor('Blue')
                            .setTimestamp()
                            .setImage(`${BannerUrl}`)
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        await interaction.followUp({
                            embeds: [banner_embed]
                        })
                    }
                }
            }
        })
    }
}
