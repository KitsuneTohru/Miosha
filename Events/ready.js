const { Events } = require('discord.js');
const { ActivityType } = require('discord.js');
const mongoose = require('mongoose')
const mongodbURL = process.env.MONGO_URL;

module.exports = {
    name: Events.ClientReady,
    async execute(client) {
        await client.user.setPresence({
            activities: [{
                name: 'v.0.3 -- Đã Thêm Cooldown Cho Command...',
                type: ActivityType.Watching,
            }],
            status: 'idle',
        })
        console.log(`${client.user.tag} Đã Online, Bắt Đầu Nhiệm Vụ!`);
        if(!mongodbURL) return;
        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        if(mongoose.connect) {
        console.log('Database Của Tớ Đang Chạy Nhá, Yên Tâm!')
        }
    },
};