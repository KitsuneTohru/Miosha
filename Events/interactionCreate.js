const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        //console.log(interaction)
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
    
        if(!command) {
            console.error(`[ERROR] Không Có Command Khớp Với ${interaction.commandName}`);
            return;
        }
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            console.error(`[ERROR] Có Lỗi Khi Thực Hiện ${interaction.commandName}`);
        }
        if(!interaction.isModalSubmit()) return;
        if(!interaction.isButton()) return;
        if(!interaction.isStringSelectMenu()) return;
    },
};