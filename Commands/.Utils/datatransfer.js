const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const AchievementList = require('../../Database/achievement')
const Level = require('../../Database/level')
const RankKey = require('../../Database/rankkeydb')
const FooterEmbeds = require('../../Utils/embed')
const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: new SlashCommandBuilder()
        .setName('datatransfer')
        .setDescription('Chuyển Dữ Liệu Vốn Có Của Một Người Dùng > Người Dùng Mới')
        .addUserOption(option =>
            option.setName('old-user')
                .setDescription('Người Dùng Cũ Cần Chuyển')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('new-user')
                .setDescription('Người Dùng Mới Bạn Muốn Chuyển')
                .setRequired(true)),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
        await interaction.deferReply()

        const OUser = interaction.options.getUser('old-user')
        const NUser = interaction.options.getUser('new-user')

        const ButtonChoice = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('confirm')
                    .setLabel('| Đồng Ý')
                    .setEmoji('1147089528906072155')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('abort')
                    .setLabel('| Giữ Lại')
                    .setEmoji('1152867805692170281')
                    .setStyle(ButtonStyle.Secondary)
            )

        const Processing = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle(`<:MarisaThink:1152871970606694480> **Lazy Gang - Data Transfer**`)
            .setColor('Blurple')
            .setDescription(`<:OkuuWut:1183327798509703289> **Bạn Có Chắc Chắn Muốn Chuyển Data Chứ?**\n> **Người Dùng Cũ:** ${OUser} \`(${OUser.id})\`\n> **Người Dùng Mới:** ${NUser} \`(${NUser.id})\`\n<:OrinMenace:1169857691456372766> **CẢNH BÁO:** Một Khi Đã Làm Là Không Thể Sửa, Nên Lưu Ý Kĩ Điều Này Nhé!`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const ErrEmbed = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Người Dùng Giống Nhau`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bruh, Cả Hai ID Giống Nhau Thì Tớ Chuyển Làm Gì Cho Mệt? Nếu Chuyển Thì Cần 2 Người Dùng Khác Nhau Chứ!`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })


        const TransferedEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`<:MarisaThink:1152871970606694480> **Lazy Gang - Data Transfer**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:OrinWink:1152868455016562738> **Đã Chuyển Data Thành Công!**\n> **Người Dùng Cũ:** ${OUser} \`(${OUser.id})\`\n> **Người Dùng Mới:** ${NUser} \`(${NUser.id})\``)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const KeepEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('<:OkuuFlare:1165494255733715007> **Đã Hủy Bỏ Data Transfer Rồi Nhé!**')
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const WaitingEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<a:OrinSway2:1160295832394932326> **Đang Chuyển Data...**\n> **Người Dùng Cũ:** ${OUser} \`(${OUser.id})\`\n> **Người Dùng Mới:** ${NUser} \`(${NUser.id})\``)
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const usemem = await interaction.guild.members.fetch(interaction.user.id)

        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        if (usingkey) {
            if (OUser.id === NUser.id) {
                await interaction.editReply({
                    embeds: [ErrEmbed]
                })
            } else {
                await interaction.editReply({
                    embeds: [Processing],
                    components: [ButtonChoice]
                })
                const user = interaction.user.id
                const filter = a => a.user.id === user;
                const collector = interaction.channel.createMessageComponentCollector({ filter })
                collector.on('collect', async a => {
                    if (a.customId === 'confirm') {
                        await interaction.editReply({
                            embeds: [WaitingEmbed],
                            components: []
                        })
                        await wait(3000)

                        await Level.findOneAndDelete({ UserID: NUser.id })
                        await AchievementList.findOneAndDelete({ UserID: NUser.id })
                        await RankKey.findOneAndDelete({ UserID: NUser.id })

                        await Level.findOneAndUpdate({ UserID: OUser.id }, {
                            UserID: NUser.id
                        })
                        await AchievementList.findOneAndUpdate({ UserID: OUser.id }, {
                            UserID: NUser.id
                        })
                        await RankKey.findOneAndUpdate({ UserID: OUser.id }, {
                            UserID: NUser.id
                        })
                        
                        await interaction.editReply({
                            embeds: [TransferedEmbed]
                        })
                    }
                    if (a.customId === 'abort') {
                        await interaction.editReply({
                            embeds: [KeepEmbed],
                            components: []
                        })
                    }
                })
            }
        } else {
            await interaction.editReply({
                embeds: [NoPerm]
            })
        }
    }
}