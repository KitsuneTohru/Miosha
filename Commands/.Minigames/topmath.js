const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const MathGame1 = require('../../Assets/MathGame/QuickMath')
const QuickMathDb = require('../../Database/quickmath')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topmath')
        .setDescription('Đưa Ra Bảng Xếp Hạng Người Chơi Ở Lệnh QuickMath')
        .addStringOption(option =>
            option.setName('difficulty')
                .setDescription('Độ Khó Để Coi Bảng Xếp Hạng')
                .addChoices(
                    {
                        name: 'Easy',
                        value: 'Easy'
                    },
                    {
                        name: 'Normal',
                        value: 'Normal'
                    },
                    {
                        name: 'Hard',
                        value: 'Hard'
                    },
                    {
                        name: 'Lunatic',
                        value: 'Lunatic'
                    },
                    {
                        name: 'Phantasm',
                        value: 'Phantasm'
                    },)
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('page')
                .setDescription('Trang Của Bảng Xếp Hạng')
                .setMinValue(1)
                .setRequired(false)),
    async execute(interaction) {

        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const Difficulty = interaction.options.getString('difficulty')
        const page = interaction.options.getNumber('page') || 1

        let QuickMath = await QuickMathDb.find({ GameKey: Difficulty }).select('-_id UserID Level Score')
        QuickMath.sort((a, b) => {
            if(Number(a.Score) < Number(b.Score)) return 1
            if(Number(a.Score) > Number(b.Score)) return -1
            return 0
        })
        
        const EmoList = MathGame1[8]
        const ColorList = MathGame1[9]
        const KeyList = ['Easy', 'Normal', 'Hard', 'Lunatic', 'Phantasm']
        var Emoji, Color
        for (var i = 0; i < KeyList.length; i++) {
            if (Difficulty === KeyList[i]) {
                Emoji = EmoList[i]
                Color = ColorList[i]
            }
        }

        const TopMath = []
        for (var i = 0; i < QuickMath.length; i++) {
            TopMath[i] = `**#${i + 1}** | **User:** <@${QuickMath[i].UserID}>\n> **Level:** ${QuickMath[i].Level} | **Score:** ${QuickMath[i].Score}\n`
        }

        const pageuplim = (page * 10)
        const pagedownlim = (page * 10) - 10
        const resultlist = TopMath.slice(pagedownlim, pageuplim)

        var desc = ''
        for (j = 0; j < resultlist.length; j++) {
            desc += resultlist[j]
        }
        if (desc === '') {
            desc = '<:LYG_Mio_Worry:939046404133879829>  **Không Có Đủ Số Liệu** Thống Kê Cho Việc Set Top Cho Những Người Phía Sau... Chờ Đến Khi Nào Đủ Người Rồi Mới Dùng Tiếp Page Này Nhé!!!'
        }

        const TopMathEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle(`<:YuyukoWoah:1152872168439423050> **QuickMath - Bảng Xếp Hạng** (Trang: ${page})`)
            .setColor(Color)
            .setDescription(`\n### ${Emoji} **Độ Khó:** ${Difficulty}\n${desc}\n\n<a:LYG_TighnariNotes:1090126010571300874> • Dùng **/top ${page + 1}** Để Xem Page ${page + 1} Nhé!`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        await interaction.editReply({
            embeds: [TopMathEmbed]
        })
    }
}