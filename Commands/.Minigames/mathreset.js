const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js')
const wait = require('node:timers/promises').setTimeout
const FooterEmbeds = require('../../Utils/embed')
const QuickMathDb = require('../../Database/quickmath')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mathreset')
        .setDescription('Reset Điểm Số MiniGame: QuickMath')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

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
            .setTitle(`**QuickMath - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<a:LYG_Warning:900776122726367342> **CẢNH BÁO TRƯỚC KHI RESET ĐIỂM SỐ:**\n ${interaction.user} • Đây Là Hành Động Reset Bảng Xếp Hạng QuickMath **TOÀN BỘ ĐỘ KHÓ**, Bạn Có Chắc Rằng Bạn Muốn Reset Nó Chứ ?\n\n<:OrinTired:1147089528906072155> **Đồng Ý** || <:FeelsOrin:1152867805692170281> **Giữ Lại**`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const ResetEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`**QuickMath - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`**Reset Thành Công Toàn Bộ Điểm Số Ở Game QuickMath Rồi Nhé!**`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const KeepEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`**QuickMath - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('**Đã Hủy Bỏ Reset Điểm Số QuickMath Trong Server Rồi Nhé!**')
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const WaitingEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`**QuickMath - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('<a:OrinSway2:1160295832394932326> **Đang Reset Điểm Số Của Minigame QuickMath...**')
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        await interaction.editReply({
            embeds: [ResetEmbedChoice],
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
                const DifficultyList = ['Easy', 'Normal', 'Hard', 'Lunatic', 'Phantasm']
                for (var i = 0; i < DifficultyList.length; i++) {
                    await QuickMathDb.deleteMany({ GameKey: DifficultyList[i] })
                }
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