const { ActivityType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout
const mongoose = require('mongoose')
const chalk = require('chalk')
const mongodbURL = process.env.MONGO_URL;


module.exports = async (client) => {
    if (!mongodbURL) return;
    await mongoose.connect(mongodbURL || '', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    if (mongoose.connect) {
        console.log(chalk.blue('[LOG]') + ' Database Của Tớ Đang Chạy Nhá, Yên Tâm!')
    }

    var i = 0
    const namearr = ['v1.2.0: /help',
        'Welcome To Lazy Gang!',
        'Thêm 2 Tính Năng Mới: Chi Tiết Tại /info',
        'Changelog: /info',
        'Most Usage: /howgay | /quickmath',
        'Special -- [TESTING] Có Thêm Một Số Tinh Năng Mới Đang Thử Nghiệm']
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
