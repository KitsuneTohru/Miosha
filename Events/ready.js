const { Events, ActivityType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout
//const mongoose = require('mongoose')
//const mongodbURL = process.env.MONGO_URL;

module.exports = {
    name: Events.ClientReady,
    async execute(client) {
        /*if(!mongodbURL) return;
        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        if(mongoose.connect) {
        console.log('Database Của Tớ Đang Chạy Nhá, Yên Tâm!')
        }*/
        var i=0
        console.log(`${client.user.tag} Đã Online, Bắt Đầu Nhiệm Vụ!`);
        const namearr = ['Phiên Bản: v.0.7.0 -- /help','Secial -- Đổi Tên Bot Từ LYG Bot ▶ Miosha','New -- /happy','Changelog -- /info','Most Usage -- /howgay']
        while(i!==-1){
            await client.user.setPresence({
                activities: [{
                    name: `${namearr[i]}`,
                    type: ActivityType.Playing,
                }],
                status: 'idle',
            })
            await wait(20000)
            i++
            if(i===5)
            i=0
        }
    },
};