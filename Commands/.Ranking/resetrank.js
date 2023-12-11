const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js')
const Level = require('../../Database/level')
const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resetrank')
        .setDescription('Reset Rank Trong Toàn Bộ Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
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
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<a:LYG_Warning:900776122726367342> **CẢNH BÁO TRƯỚC KHI RESET RANK:**\n ${interaction.user} • Đây Là Hành Động Reset Rank **TOÀN BỘ SERVER**, Bạn Có Chắc Rằng Bạn Muốn Reset Nó Chứ ?\n\n<:OrinTired:1147089528906072155> **Đồng Ý** || <:FeelsOrin:1152867805692170281> **Giữ Lại**`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        const ResetEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`**Reset Thành Công Toàn Bộ Exp Trong Server Rồi Nhé!**`)
            .setTimestamp()
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        const KeepEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('**Đã Hủy Bỏ Reset Exp Trong Server Nên Tiếp Tục Farm Đi Nhé!**')
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        const WaitingEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`**Server Ranking - Reset**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription('<a:OrinSway2:1160295832394932326> **Đang Reset Exp Của Toàn Bộ Server...**')
            .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
        await interaction.reply({
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