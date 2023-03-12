const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config();
const fs = require('node:fs');
const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;
const commands = [];
const commandsFiles = fs.readdirSync(`./Commands`).filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
    const command = require(`./Commands/${file}`);
    commands.push(command.data.toJSON());
};

const rest = new REST({ version: '10'}).setToken(token);

(async () => {
    try {
        console.log(`Bắt Đầu Làm Mới ${commands.length} Lệnh`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientID,guildID),
            { body: commands },
        );
        console.log(`Thành Công Khởi Tạo ${data.length} Lệnh`)
    } catch (error) {
        console.error(error);
    }
})();

/*rest.put(Routes.applicationCommand(clientID, guildID), {body: []})
    .then(() => console.log('Thành Công Xóa Toàn Bộ Lệnh'))
    .catch(console.error);
rest.put(Routes.applicationCommand(clientID), {body: []})
    .then(() => console.log('Thành Công Xóa Toàn Bộ Lệnh'))
    .catch(console.error);*/
