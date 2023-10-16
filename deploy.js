const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config();
const fs = require('node:fs');
const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;
const commands = [];

var LYG_Related = 0 //Tối Ưu Hóa Lại LYG Commands Only
const commandFolers = fs.readdirSync('./Commands')
for (const folder of commandFolers){
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./Commands/${folder}/${file}`)
        commands.push(command.data.toJSON())
        if(folder.startsWith('.')){ 
            LYG_Related++
        }
    }
}

console.log(commands)
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        const a = commands.length-commands.slice(LYG_Related).length
        console.log(`Bắt Đầu Làm Mới ${commands.length} Lệnh`);
        let data
        data = await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands.slice(0,LYG_Related) },
            //{ body: [] },
        );
        data = await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands.slice(LYG_Related,commands.length) },
            //{ body : []},
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