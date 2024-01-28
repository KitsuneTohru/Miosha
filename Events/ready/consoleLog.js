const chalk = require('chalk')

module.exports = (client) => {
        const Guilds = client.guilds.cache.map(guild => guild.id);
        console.log(chalk.blue('[LOG]') + ` Tổng Số ID Guild Đã Join: ${Guilds.length}`);
        console.log(chalk.blue('[LOG]') + ` ${client.user.tag} Đã Online, Bắt Đầu Nhiệm Vụ!`);
}