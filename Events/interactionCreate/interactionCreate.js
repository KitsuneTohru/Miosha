const chalk = require('chalk')

module.exports = async (client, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(chalk.red('[ERROR]') + ` Không Có Command Khớp Với ${interaction.commandName}`);
            return;
        }
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            console.error(chalk.red('[ERROR]') + ` Có Lỗi Khi Thực Hiện ${interaction.commandName}`);
        }

        if (!interaction.isButton()) return;
        if (!interaction.isStringSelectMenu()) return;
        if (!interaction.isModalSubmit()) return
        console.log(interaction)
    }
