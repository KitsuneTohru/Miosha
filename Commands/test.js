const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command Purpose...'),
    async execute(interaction) {
        //Setup User
        const user = interaction.user.id
        //Mảng Embed
        const titlearr = [
            '**Title 1**',
            '**Title 2**',
            '**Title 3**',
            '**Title 4**',
            '**Title 5**',
        ]
        const descarr = [
            '**Desc 1 (Test)**',
            '**Desc 2 (Test)**',
            '**Desc 3 (Test)**',
            '**Desc 4 (Test)**',
            '**Desc 5 (Test)**',
        ]
        const testembed = []
        var i = 0, j = 0
        for(i=0;i<=4;i++){
            let title = titlearr[i]
            let desc = descarr[i]
            testembed[i] = new EmbedBuilder()
                .setTitle(title)
                .setDescription(desc)
        }
        //Cmd Row
        function GetRow(j){
            const testrow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('lpage')
                    .setLabel('| Previous Page')
                    .setEmoji('1086297531379613767')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(j === 0),
                new ButtonBuilder()
                    .setCustomId('pages')
                    .setLabel(`| Trang: ${j+1} |`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('rpage')
                    .setLabel('| Next Page')
                    .setEmoji('1086297678624854077')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(j === testembed.length - 1)
            )
            return testrow
        } 
        await interaction.reply({
            embeds: [testembed[0]],
            components: [GetRow(j)]
        })
        const filter = a => a.user.id === user;
        const collector = interaction.channel.createMessageComponentCollector({filter, time: 300000})
        collector.on('collect',async a => {
            if(a.customId === 'lpage' && j >= 0){
                j--
                await wait(500)
                await interaction.editReply({
                    embeds: [testembed[j]],
                    components: [GetRow(j)]
                })
            }
            if(a.customId === 'rpage' && j <= testembed.length){
                j++
                await wait(500)
                await interaction.editReply({
                    embeds: [testembed[j]],
                    components: [GetRow(j)]
                })
            }
        })
    }
}