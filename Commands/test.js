const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command Purpose...'),
    async execute(interaction) {
        const user = interaction.user.id
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('testmenu')
                    .setPlaceholder('❌ | Không Có Cái Nào Chọn Cả!')
                    .addOptions(
                        {
                            label: 'Test1',
                            description: 'Test1',
                            value: 'test1'
                        },
                        {
                            label: 'Test2',
                            description: 'Test2',
                            value: 'test2'
                        }
                    )
            )
        const godembed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`Test Command`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png' })
            .setDescription('Hiện Không Có Gì Để Check Cả!')
            .setImage('https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png')
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png' });
        var check = false
        const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '729671009631862834', '1084992470074531960']
        function checkID(user) {
            var i
            for (i in userarr) {
                if (user === userarr[i])
                    check = true
            }
        }
        checkID(user)
        if (check === false) {
            await interaction.reply({
                content: 'No! Bạn Không Có Quyền Sử Dụng Command Này!',
            })
        }
        else {
            await interaction.reply({
                embeds: [godembed],
                components: [row],
                ephemeral: true
            });
            const filter = a => a.user.id === user;
            const collector = interaction.channel.createMessageComponentCollector({ filter })
            collector.on('collect', async a => {
                if(a.customId === 'testmenu'){
                    const selected = a.values[0]
                    console.log(selected)
                    if(selected === 'test1'){
                        await interaction.editReply({
                            content: 'Test 1 Đã Click',
                            ephemeral: true
                        })
                    } 
                    if(selected === 'test2'){
                        await interaction.editReply({
                            content: 'Test 2 Đã Click',
                            ephemeral: true
                        })
                    }
                }
            })
        }
    }
};