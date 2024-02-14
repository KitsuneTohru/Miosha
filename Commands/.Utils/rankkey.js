const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const RankKey = require('../../Database/rankkeydb')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rankkey')
        .setDescription('Set RankKey Cho User (Làm RankCard...)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Nhập Vào Db')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Keyword Cho Thông Tin Ranking')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        var user = interaction.options.getUser('user')
        user = user.id
        var key = interaction.options.getString('keyword')
        if (key === null) {
            key = 'none'
        } else {
            key = key.trim()
            key = key.toLowerCase()
        }

        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        if (!usingkey) {
            await interaction.editReply({
                embeds: [NoPerm],
            })
        } else {
            RankKey.findOne({ UserID: user }, async (err, data) => {
                if (err) throw err
                if (!data) {
                    if (key === 'none') {
                        const SkipKey = new EmbedBuilder()
                            .setColor('DarkButNotBlack')
                            .setTitle(`<:JustOrin:1156221079988215879> **Key Skipped!**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`> Vì Người Dùng **${user}** (<@${user}>) Chưa Có Vị Trí Trong Database, Và Key Là **${key}** Nữa Nên Skip Luôn!`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        await interaction.editReply({
                            embeds: [SkipKey]
                        })
                    } else {
                        RankKey.create({
                            UserID: user,
                            GuildID: interaction.guild.id,
                            Key: key
                        })
                        const NewKey = new EmbedBuilder()
                            .setColor('Green')
                            .setTitle(`<:JustOrin:1156221079988215879> **Key Added!**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`> ID Người Dùng: **${user}** (<@${user}>)\n> Keyword: **${key}**`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        await interaction.editReply({
                            embeds: [NewKey]
                        })
                    }
                }
                if (data) {
                    const prekey = data.Key
                    data.Key = key
                    if (key === 'none') {
                        data.deleteOne({ UserID: user })
                        const DelKey = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle(`<:JustOrin:1156221079988215879> **Key Edited!**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`> Đã Xóa Keyword Cho ID Người Dùng: **${user}** (<@${user}>)\n`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        await interaction.editReply({
                            embeds: [DelKey]
                        })
                    } else {
                        const EdtKey = new EmbedBuilder()
                            .setColor('White')
                            .setTitle(`<:JustOrin:1156221079988215879> **Key Edited!**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`> ID Người Dùng: **${user}** (<@${user}>)\n> Keyword: **${prekey}** >> **${key}**`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        await interaction.editReply({
                            embeds: [EdtKey]
                        })
                        data.save()
                    }
                }
            })
        }
    }
}