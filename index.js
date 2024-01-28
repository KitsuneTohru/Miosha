const { Client, GatewayIntentBits, Collection, EmbedBuilder, Message } = require('discord.js');

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const eventHandler = require('./Handlers/eventHandler')
const chalk = require('chalk')

const dotenv = require('dotenv')
dotenv.config()

const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;

const commands = [];

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((a) => {
        return GatewayIntentBits[a]
    })
});

eventHandler(client)

var LYG_Related = 0 //Tối Ưu Hóa Lại LYG Commands Only
const commandFolers = fs.readdirSync('./Commands')
for (const folder of commandFolers) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./Commands/${folder}/${file}`)
        commands.push(command.data.toJSON())
        if (folder.startsWith('.')) {
            LYG_Related++
        }
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        const a = commands.length - commands.slice(LYG_Related).length
        console.log(chalk.blue('[LOG]') + ` Bắt Đầu Làm Mới ${commands.length} Lệnh`);
        let data
        data = await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands.slice(0, LYG_Related) },
            //{ body: [] },
        );
        data = await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands.slice(LYG_Related, commands.length) },
            //{ body : []},
        );
        console.log(chalk.blue('[LOG]') + ` Thành Công Khởi Tạo ${data.length} Lệnh\n` + chalk.blue('[LOG]') + ` LYG Command Only: ${a} Lệnh`)
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

client.commands = new Collection();
const commandFolders = fs.readdirSync('./Commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./Commands/${folder}/${file}`);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
    };
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
};

client.login(token);

