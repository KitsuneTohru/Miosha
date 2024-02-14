const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const Level = require('../../Database/level')
const wait = require('node:timers/promises').setTimeout
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resetrank')
        .setDescription('Reset Rank Trong Toàn Bộ Server'),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        const iuser = await interaction.guild.members.fetch(interaction.user.id)

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
        const ResetEmbedChoice = new EmbedBuilder()
            .setColor('#FFFFFF')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<a:LYG_Warning:900776122726367342> **CẢNH BÁO TRƯỚC KHI RESET RANK:**\n ${interaction.user} • Đây Là Hành Động Reset Rank **TOÀN BỘ SERVER**, Bạn Có Chắc Rằng Bạn Muốn Reset Nó Chứ ?\n\n<:OrinTired:1147089528906072155> **Đồng Ý** || <:FeelsOrin:1152867805692170281> **Giữ Lại**`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const ResetEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`**Reset Thành Công Toàn Bộ Exp Trong Server Rồi Nhé!**`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const KeepEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('**Đã Hủy Bỏ Reset Exp Trong Server Nên Tiếp Tục Farm Đi Nhé!**')
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const WaitingEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('<a:OrinSway2:1160295832394932326> **Đang Reset Exp Của Toàn Bộ Server...**')
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        await interaction.editReply({
            embeds: [ResetEmbedChoice],
            components: [ButtonChoice]
        })

        const usemem = interaction.user.id
        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        if (!usingkey) {
            const NoPerm = new EmbedBuilder()
                .setColor('DarkAqua')
                .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
                .setTimestamp()
                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
            await interaction.editReply({
                embeds: [NoPerm]
            })
        } else {
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
                    await Level.deleteMany({ GuildID: interaction.guild.id })
                    await interaction.editReply({
                        embeds: [ResetEmbed]
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
    }
}