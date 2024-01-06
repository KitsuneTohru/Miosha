module.exports = async (client, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`[ERROR] Không Có Command Khớp Với ${interaction.commandName}`);
            return;
        }
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            console.error(`[ERROR] Có Lỗi Khi Thực Hiện ${interaction.commandName}`);
        }

        if (!interaction.isButton()) return;
        if (!interaction.isStringSelectMenu()) return;
        if (!interaction.isModalSubmit()) return
        console.log(interaction)
    }
