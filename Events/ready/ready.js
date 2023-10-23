const { ActivityType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout
const mongoose = require('mongoose')
const mongodbURL = process.env.MONGO_URL;

module.exports = async (client) => {
    if (!mongodbURL) return;
    await mongoose.connect(mongodbURL || '', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    if (mongoose.connect) {
        console.log('Database Của Tớ Đang Chạy Nhá, Yên Tâm!')
    }
    var i = 0
    const namearr = ['v0.10.5: /help',
        '▰▰▰▰▰▰▰▰▱▱ 75%',
        'Created: /top',
        'Changelog: /info',
        'Most Usage: /howgay',
        'Special -- Ranking System']
    while (i !== -1) {
        await client.user.setPresence({
            activities: [{
                name: `${namearr[i]}`,
                type: ActivityType.Playing,
            }],
            status: 'online',
        })
        await wait(20000)
        i++
        if (i === 5)
            i = 0
    }
}
