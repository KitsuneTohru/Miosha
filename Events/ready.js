const { Events, ActivityType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout
//const mongoose = require('mongoose')
//const mongodbURL = process.env.MONGO_URL;

module.exports = {
    name: Events.ClientReady,
    async execute(client) {
        var i=0
        console.log(`${client.user.tag} Đã Online, Bắt Đầu Nhiệm Vụ!`);
        const namearr = ['v.0.5.8 -- Dùng /help Nếu Cảm Thấy Khó Hiểu Nhá!','New Content -- Update /coinflip, Thêm /guildavt','Changelog -- /info','Most Usage -- /howgay']
        while(i!==-1){
            await client.user.setPresence({
                activities: [{
                    name: `${namearr[i]}`,
                    type: ActivityType.Playing,
                }],
                status: 'idle',
            })
            await wait(60000)
            i++
            if(i===4)
            i=0
        }
        //if(!mongodbURL) return;
        /*await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        if(mongoose.connect) {
        console.log('Database Của Tớ Đang Chạy Nhá, Yên Tâm!')
        }*/
    },
};