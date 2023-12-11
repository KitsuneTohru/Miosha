const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const RankKey = require('../../Database/rankkeydb')

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
        var page = interaction.options.getNumber('page')
        if (page < 1 || page === null) {
            page = 1
        }
        const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '892054339072438303', '1084992470074531960']
        const cuser = interaction.user.id
        function PermUsing(cuser) {
            var i
            for (i in userarr) {
                if (cuser === userarr[i]) {
                    return true
                }
            }
            return false
        }
        const Perm_ = PermUsing(cuser)
        if (!Perm_) {
            await interaction.reply({
                content: 'No! Bạn Không Có Quyền Sử Dụng Command Này!',
            })
        } else {
            let KeyList = await RankKey.find({ guildID: interaction.guild.id }).select('-_id UserID Key')
            KeyList.sort((a, b) => {
                if (a.Key < b.Key) return -1
                if (a.Key > b.Key) return 1
                return 0
            })

            const userlist = []
            for (var i = 0; i < KeyList.length; i++) {
                userlist[i] = `> **User:** <@${KeyList[i].UserID}>\n> **Keyword:** ${KeyList[i].Key}\n\n`
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
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setTitle(`<:YuyukoWoah:1152872168439423050> **Lazy Gang - Keyword Ranking** (Trang: ${page})`)
                .setColor('Blurple')
                .setDescription(`${desc}\n\n<a:LYG_TighnariNotes:1090126010571300874> • Dùng **/getrankkey ${page + 1}** Để Xem Page ${page + 1} Nhé!`)
                .setTimestamp()
                .setFooter({ text: 'Miosha | ©kaenbyou_rin0727 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/1016930426520084560/1093948954690986094/20230408_002020_0000.png' })
            await interaction.reply({
                embeds: [KeyEmbed]
            })
        }
    }
}