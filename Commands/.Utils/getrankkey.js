const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const RankKey = require('../../Database/rankkeydb')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getrankkey')
        .setDescription('Lấy Rank Key Của Member Trong Toàn Server (Nếu Có)')
        .addNumberOption(option =>
            option.setName('page')
                .setDescription('Hiển Thị List Member Có Key')
                .setMinValue(1)
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds

        var page = interaction.options.getNumber('page')
        if (page < 1 || page === null) {
            page = 1
        }

        let KeyList = await RankKey.find({ guildID: interaction.guild.id }).select('-_id UserID Key')
        KeyList.sort((a, b) => {
            if (a.Key < b.Key) return -1
            if (a.Key > b.Key) return 1
            return 0
        })

        const userlist = []
        for (var i = 0; i < KeyList.length; i++) {
            if (KeyList[i].Key !== undefined) {
                userlist.push(`> **User:** <@${KeyList[i].UserID}>\n> **Keyword:** ${KeyList[i].Key}\n\n`)
            }
        }

        const pageuplim = (page * 10)
        const pagedownlim = (page * 10) - 10
        const resultlist = userlist.slice(pagedownlim, pageuplim)

        var desc = ''
        for (j = 0; j < resultlist.length; j++) {
            desc += resultlist[j]
        }
        if (desc === '') {
            desc = '<:LYG_Mio_Worry:939046404133879829>  **Không Có Đủ Số Liệu** Thống Kê Cho Những Người Có Key Phía Sau... Chờ Đến Khi Nào Đủ Người Rồi Mới Dùng Tiếp Page Này Nhé!!!'
        }

        const KeyEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle(`<:YuyukoWoah:1152872168439423050> **Lazy Gang - Keyword Ranking** (Trang: ${page})`)
            .setColor('Blurple')
            .setDescription(`${desc}\n\n<a:LYG_TighnariNotes:1090126010571300874> • Dùng **/getrankkey ${page + 1}** Để Xem Page ${page + 1} Nhé!`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }
        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        if (usingkey) {
            await interaction.editReply({
                embeds: [KeyEmbed]
            })
        }
        else {
            await interaction.editReply({
                embeds: [NoPerm]
            })
        }

    }
}