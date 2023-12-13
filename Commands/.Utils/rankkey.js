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
        const FooterEmbeds_ = FooterEmbeds

        var user = interaction.options.getUser('user')
        user = user.id
        var key = interaction.options.getString('keyword')
        if (key === null) {
            key = 'none'
        } else {
            key = key.trim()
            key = key.toLowerCase()
        }
        const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '892054339072438303', '1084992470074531960']
        const cuser = interaction.user.id
        function PermUsing(cuser) {
            var i
            for (i in userarr) {
                if (cuser === userarr[i]) {
                    return true
                }
            }
            return false
        }
        const Perm_ = PermUsing(cuser)
        if (!Perm_) {
            await interaction.reply({
                content: 'No! Bạn Không Có Quyền Sử Dụng Command Này!',
            })
        } else {
            RankKey.findOne({ UserID: user }, async (err, data) => {
                if (err) throw err
                if (!data) {
                    if (key === 'none') {
                        const SkipKey = new EmbedBuilder()
                            .setColor('DarkButNotBlack')
                            .setTitle(`<:JustOrin:1156221079988215879> **Key Skipped!**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`> Vì Người Dùng **${user}** (<@${user}>) Chưa Có Vị Trí Trong Database, Và Key Là **${key}** Nữa Nên Skip Luôn!`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                        await interaction.reply({
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
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`> ID Người Dùng: **${user}** (<@${user}>)\n> Keyword: **${key}**`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                        await interaction.reply({
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
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`> Đã Xóa Keyword Cho ID Người Dùng: **${user}** (<@${user}>)\n`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                        await interaction.reply({
                            embeds: [DelKey]
                        })
                    } else {
                        const EdtKey = new EmbedBuilder()
                            .setColor('White')
                            .setTitle(`<:JustOrin:1156221079988215879> **Key Edited!**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`> ID Người Dùng: **${user}** (<@${user}>)\n> Keyword: **${prekey}** >> **${key}**`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                        await interaction.reply({
                            embeds: [EdtKey]
                        })
                        data.save()
                    }
                }
            })
        }
    }
}