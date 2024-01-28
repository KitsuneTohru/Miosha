const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const chalk = require('chalk')

const FooterEmbeds = require('../../Utils/embed')
const wait = require('node:timers/promises').setTimeout;
const shiprate = require('../../Assets/Shiprate/shiprateasset')
const cdSchema = require('../../Database/cooldown')
const BypassList = require('../../Utils/cdbypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shiprate')
        .setDescription('Xác Định Tỉ Lệ Hợp Đôi Giữa 2 Người (Và Giới Tính Giả Sử Nhá)')
        .addUserOption(option =>
            option.setName('user1')
                .setDescription('Người Dùng Thứ Nhất')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user2')
                .setDescription('Người Dùng Thứ Hai')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const cdtime = 45000

        const user1 = interaction.options.getUser('user1')
        const user2 = interaction.options.getUser('user2')

        const auser = interaction.user.id
        const userarr = BypassList
        function checkCD(auser) {
            var i
            for (i in userarr) {
                if (auser === userarr[i])
                    return true
            }
            return false
        }
        const Bypass_ = checkCD(auser)
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDShiprate: Date.now()
                })
            }
            if (data) {
                const cduser = data.UserID
                const CDTime = data.CDShiprate
                console.log(chalk.yellow('[Command: Shiprate]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)
                if (CDTime > Date.now() && !Bypass_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDShiprate = Date.now() + cdtime
                    data.save()
                    var i = 0
                    const key = []
                    const desc = []
                    const GetEmbed = []
                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('male')
                                .setLabel('GT: Nam')
                                .setEmoji('1059112869020586004')
                                .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                                .setCustomId('female')
                                .setLabel('GT: Nữ')
                                .setEmoji('1167062115442495510')
                                .setStyle(ButtonStyle.Secondary),
                        )
                    if (user1 !== user2) {
                        const StartEmbed = new EmbedBuilder()
                            .setColor('White')
                            .setTitle(`<:MarisaThink:1152871970606694480> **Kiểm Tra Mối Quan Hệ Của Hai User Nào Đó...**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`<a:LYG_TighnariNotes:1090126010571300874> Hệ Thống Cần Một Chút Thông Tin Về Người Dùng\n\n> **Người Thứ Nhất:** ${user1} *(Chưa Xác Định)*\n> **Người Thứ Hai:** ${user2} *(Chưa Xác Định)*\n\n**Lưu Ý:** Lệnh Chỉ Để Cho Vui, Không Có Ý Tứ Nào Nhá`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        await interaction.editReply({
                            embeds: [StartEmbed],
                            components: [Buttons]
                        })

                        const filter = a => a.user.id === interaction.user.id;
                        const message = await interaction.fetchReply()
                        const collector = interaction.channel.createMessageComponentCollector({ message, filter, time: 15 * 60 * 1000 })
                        collector.on('collect', async a => {
                            if (i === 0) {
                                if (a.customId === 'male') {
                                    key[i] = '(<:Wanderer_Heh:1059112869020586004> Nam)'
                                    desc[i] = `<a:LYG_TighnariNotes:1090126010571300874> Hệ Thống Cần Một Chút Thông Tin Về Người Dùng\n\n> **Người Thứ Nhất:** ${user1} *${key[i]}*\n> **Người Thứ Hai:** ${user2} *(Chưa Xác Định)*\n\n**Lưu Ý:** Lệnh Chỉ Để Cho Vui, Không Có Ý Tứ Nào Nhá`
                                }
                                if (a.customId === 'female') {
                                    key[i] = '(<:ChenNya:1167062115442495510> Nữ)'
                                    desc[i] = `<a:LYG_TighnariNotes:1090126010571300874> Hệ Thống Cần Một Chút Thông Tin Về Người Dùng\n\n> **Người Thứ Nhất:** ${user1} *${key[i]}*\n> **Người Thứ Hai:** ${user2} *(Chưa Xác Định)*\n\n**Lưu Ý:** Lệnh Chỉ Để Cho Vui, Không Có Ý Tứ Nào Nhá`
                                }
                            }
                            if (i === 1) {
                                if (a.customId === 'male') {
                                    key[i] = '(<:Wanderer_Heh:1059112869020586004> Nam)'
                                    desc[i] = `<a:LYG_TighnariNotes:1090126010571300874> Hệ Thống Cần Một Chút Thông Tin Về Người Dùng\n\n> **Người Thứ Nhất:** ${user1} *${key[i-1]}*\n> **Người Thứ Hai:** ${user2} *${key[i]}*\n\n**Lưu Ý:** Lệnh Chỉ Để Cho Vui, Không Có Ý Tứ Nào Nhá`
                                }
                                if (a.customId === 'female') {
                                    key[i] = '(<:ChenNya:1167062115442495510> Nữ)'
                                    desc[i] = `<a:LYG_TighnariNotes:1090126010571300874> Hệ Thống Cần Một Chút Thông Tin Về Người Dùng\n\n> **Người Thứ Nhất:** ${user1} *${key[i-1]}*\n> **Người Thứ Hai:** ${user2} *${key[i]}*\n\n**Lưu Ý:** Lệnh Chỉ Để Cho Vui, Không Có Ý Tứ Nào Nhá`
                                }
                            }
                            GetEmbed[i] = new EmbedBuilder()
                                .setColor('White')
                                .setTitle(`<:MarisaThink:1152871970606694480> **Kiểm Tra Mối Quan Hệ Của Hai User Nào Đó...**`)
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                .setDescription(`${desc[i]}`)
                                .setTimestamp()
                                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            await interaction.editReply({
                                embeds: [GetEmbed[i]],
                                components: [Buttons]
                            })
                            i++
                            if (i > 1) {
                                await wait(1000)
                                desc[i] = `<a:LYG_TighnariNotes:1090126010571300874> Hệ Thống Đã Thu Thập Xong Thông Tin!\n\n> **Người Thứ Nhất:** ${user1} *${key[0]}*\n> **Người Thứ Hai:** ${user2} *${key[1]}*\n\n**Lưu Ý:** Lệnh Chỉ Để Cho Vui, Không Có Ý Tứ Nào Nhá`
                                GetEmbed[i] = new EmbedBuilder()
                                    .setColor('White')
                                    .setTitle(`<:MarisaThink:1152871970606694480> **Kiểm Tra Mối Quan Hệ Của Hai User Nào Đó...**`)
                                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                    .setDescription(`${desc[i]}`)
                                    .setTimestamp()
                                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                                await interaction.editReply({
                                    embeds: [GetEmbed[i]],
                                    components: []
                                })
                                await wait(1000)
                                const CalcEmbed = new EmbedBuilder()
                                    .setColor('White')
                                    .setTitle(`<:MarisaThink:1152871970606694480> **Kiểm Tra Mối Quan Hệ Của Hai User Nào Đó...**`)
                                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                    .setDescription(`<:LYG_Okayu_Mogu:1089566808719237210> Hệ Thống Đang Tính Toán Mức Dộ Hợp Nhau Giữa Hai Người\n\n> ${user1} *${key[0]}*\n> ${user2} *${key[1]}*\n\n> <a:LYG_Slot:900776450137935872> Xin Vui Lòng Chờ Một Lát...\n\n**Lưu Ý:** Lệnh Chỉ Để Cho Vui, Không Có Ý Tứ Nào Nhá`)
                                    .setTimestamp()
                                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

                                await interaction.editReply({
                                    embeds: [CalcEmbed]
                                })

                                const rnglist = [1, 30, 60, 90, 100, 101]
                                var color = '#000000', finaldesc
                                var rng = Math.random() * 101.1
                                rng = (Math.floor(rng * 10) / 10).toFixed(1)
                                for (var n = 0; n < rnglist.length; n++) {
                                    if (rng <= rnglist[n]) {
                                        color = shiprate[6][n]
                                        finaldesc = `<:OrinWink:1152868455016562738> Đã Tính Toán Xong!\n\n> ${user1} *${key[0]}*\n> ${user2} *${key[1]}*\n\n> Độ Hợp Nhau Của Hai Người Là: **${rng}%**\n\n> **Nhận Xét:** ${shiprate[n][Math.floor(Math.random() * shiprate[n].length)]}`
                                        break
                                    }
                                }

                                const FinalEmbed = new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle(`<:MarisaThink:1152871970606694480> **Kiểm Tra Mối Quan Hệ Của Hai User Nào Đó...**`)
                                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                    .setDescription(`${finaldesc}`)
                                    .setTimestamp()
                                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

                                await wait(1000)
                                await interaction.editReply({
                                    embeds: [FinalEmbed]
                                })
                            }
                        })
                    }
                    else {
                        const ErrEmbed = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle(`<:MarisaThink:1152871970606694480> **Kiểm Tra Mối Quan Hệ Của Hai User Nào Đó...**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`Bạn Đi Kiểm Tra Mối Quan Hệ Giữa ${user1} Và ${user2} Sao? Thôi Bỏ Đi Một Người Mà :V`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        await interaction.editReply({
                            embeds: [ErrEmbed]
                        })
                    }
                }
            }
        })

    }
}