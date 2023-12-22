const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')
const BypassList = require('../../Utils/cdbypass')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Đưa Ra Thông Tin Của Server'),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
        const cdtime = 10000
        const owner = await interaction.guild.fetchOwner()

        //Server Bot Count
        var Bots = await interaction.guild.members.cache.filter(member => member.user.bot).size

        //Server Channel Count
        const AllChannel = await interaction.guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size
        const Txt = await interaction.guild.channels.cache.filter(c => c.type === 0).size
        const Voice = await interaction.guild.channels.cache.filter(c => c.type === 2).size
        const Thread = await interaction.guild.channels.cache.filter(c => c.type === 10 || c.type === 11 || c.type === 12).size
        const Announcement = await interaction.guild.channels.cache.filter(c => c.type === 5).size
        const Forum = await interaction.guild.channels.cache.filter(c => c.type === 15).size
        const Stage = await interaction.guild.channels.cache.filter(c => c.type === 13).size

        const ServerEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle(`<:LYG_Okayu_Mogu:1089566808719237210> **Thông Tin Của Server**`)
            .setColor('#FFFFFF')
            .setDescription(`<a:LYG_Arrow:1093051541667196949> **__Tổng Quan__**\n> **Tên Server:** ${interaction.guild.name}\n> **Server ID:** ${interaction.guild.id}\n> **Ngày Tạo:** <t:${Math.floor(interaction.guild.createdTimestamp / 1000)}>\n\n<a:LYG_Arrow:1093051541667196949> **__User List__**\n> **Chủ Server:** ${owner} (${owner.id})\n> **Tổng Số Thành Viên:** ${interaction.guild.memberCount}\n> **Member:** ${interaction.guild.memberCount - Bots}\n> **Bot:** ${Bots}\n\n<a:LYG_Arrow:1093051541667196949> **__Số Lượng Kênh__**\n> **Tổng Số:** ${AllChannel}\n> **Kênh Văn Bản:** ${Txt}\n> **Kênh Thoại:** ${Voice}\n> **Chủ Đề (Thread):** ${Thread}\n> **Kênh Thông Báo:** ${Announcement}\n> **Forum:** ${Forum}\n> **Stage:** ${Stage}\n\n<a:LYG_Arrow:1093051541667196949> **__Server Thumbnail__** [Thumbnail_URL](${interaction.guild.iconURL({ dynamic: true, size: 512, extension: 'png' })})`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }))
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const auser = interaction.user.id
        function BypassCD(auser) {
            const CDPassList = BypassList
            for (var i in CDPassList) {
                if (auser === CDPassList[i]) {
                    return true
                }
            }
            return false
        }

        
        const Bypass_ = BypassCD(auser)
        
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDServer: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDServer
                console.log('[Command: Server]', cduser, CDTime, Date.now())
                if (CDTime > Date.now() && !Bypass_) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await interaction.reply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDServer = Date.now() + cdtime
                    data.save()
                    await interaction.reply({
                        embeds: [ServerEmbed]
                    })
                }
            }
        })
    }
}
//