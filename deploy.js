const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config();
const fs = require('node:fs');
const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;
const commands = [];

const commandFolers = fs.readdirSync('./Commands')
for (const folder of commandFolers){
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./Commands/${folder}/${file}`)
        commands.push(command.data.toJSON())
    }
}
console.log(commands)
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        const a = commands.length-commands.slice(4).length
        console.log(`Bắt Đầu Làm Mới ${commands.length} Lệnh`);
        let data
        data = await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands },
        );
        data = await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands.slice(4) },
        );
        console.log(`Thành Công Khởi Tạo ${data.length} Lệnh\nLYG Command Only: ${a} Lệnh`)
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