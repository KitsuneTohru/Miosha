module.exports = (client) => {
        const Guilds = client.guilds.cache.map(guild => guild.id);
        console.log(`Tổng Số ID Guild Đã Join: ${Guilds.length}`);
        console.log(`${client.user.tag} Đã Online, Bắt Đầu Nhiệm Vụ!`);
}