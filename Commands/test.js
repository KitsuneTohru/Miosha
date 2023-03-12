const { SlashCommandBuilder } = require('discord.js');
const cooldown = require('../Schemas.js/cooldown.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Cmd Của Bot'),
    async execute(interaction) {
        let user = interaction.user
        let timeout = 3600000
        var a = true
        cooldown.findOne({GuildID: interaction.guild.id, userID: user.id}, async (err, dataTime) => {
            if (dataTime && dataTime.test !== null && timeout - (Date.now()-dataTime.test) > 0) {
                let test = (dataTime.test/1000+timeout/1000).toFixed(0);
                console.log(test)
                await interaction.reply(`Bạn Phải Chờ Đến **<t:${test}> (<t:${test}:R>)** Để Có Thể Thực Hiện Tiếp Command Này`)
            }
            else {
                await interaction.reply('Command Đã Được Thực Hiện, Kekw')
                a = false
            }
            
            if (dataTime) {
                if(a === false) {
                    dataTime.test = Date.now()
                    dataTime.save()
                    a = true
                }
            }
            else {
                if(a === false) {
                    new cooldown({
                        GuildID: interaction.guild.id,
                        UserID: user.id,
                        test: Date.now()
                    }).save()
                }   
            }
        })
    },
};