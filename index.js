const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config();
const token = process.env.TOKEN;


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on("ready", () => {
    const Guilds = client.guilds.cache.map(guild => guild.id);
    console.log(`Tổng Số ID Guild Đã Join: ${Guilds}`);
});

client.commands = new Collection();
const commandFolders = fs.readdirSync('./Commands');
for(const folder of commandFolders){
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