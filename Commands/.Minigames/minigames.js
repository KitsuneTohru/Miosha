const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')
const MathGame1 = require('../../Assets/MathGame/QuickMath')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minigames')
        .setDescription('Hiển Thị Thông Tin Về Các Lệnh Minigame')
        .addStringOption(option =>
            option.setName('games')
                .setDescription('Tên Minigame Bạn Muốn Xem Thông Tin')
                .addChoices(
                    {
                        name: 'QuickMath',
                        value: 'quickmath'
                    },
                )
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const Minigames = interaction.options.getString('games')
        const GameList = ['quickmath']
        var runkey = -1

        for (var i = 0; i < GameList.length; i++) {
            if (Minigames === GameList[i]) {
                runkey = i
                break
            }
        }

        switch (Number(runkey)) {
            case 0:
                {
                    let Diff = ''
                    for (var i = 0; i < 5; i++) {
                        const DiffName = MathGame1[7][i].slice(0, 1).toUpperCase() + MathGame1[7][i].slice(1)
                        Diff += `> - ${MathGame1[8][i]} **${DiffName}** (${MathGame1[5][i]}s)\n`
                    }
                    const QuickMathEmbed = new EmbedBuilder()
                        .setColor('White')
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        .setTitle('<a:LYG_TighnariNotes:1090126010571300874> **Minigame - QuickMath**')
                        .setDescription(`<a:OrinPopcorn:1146170440738406572> **QuickMath: Tìm Kết Quả Của Một Phép Toán Nhanh Trong Thời Gian Giới Hạn**\nCấu Trúc Lệnh: **/quickmath [difficulty] [rush]**\n<a:LYG_Clock:1084322030331105370> **CD:** Phụ Thuộc Vào **[difficulty]**\n\n<:OkuuFlare:1165494255733715007> Game Này Có **5 Độ Khó**\n\n${Diff}\n<:SanaePout:1152875631386832946> **Lưu Ý:**  Để Có Được Trải Nghiệm Tốt Nhất Thì Làm Ơn:\n> 1. Đừng Dùng Bot Khác Khi Đang Chơi Minigame Này\n> 2. Đừng Dùng Máy Tính Bỏ Túi Như Casio, Máy Tính Ở Điện Thoại, PC, Laptop Hay TV...\n> 3. Không Giới Hạn Nhận Tin Nhắn, Nếu Quá Thời Gian, Coi Như Game Over\n\n<:OrinMenace:1169857691456372766> **Special Rules (Có Thể Chọn)**\n [rush]: Giảm Thời Gian **10%/20%/30%/40%/50%** Ứng Với Mỗi Level (Nhiều Nhất Là **50%**), Đồng Thời: Hệ Số Điểm Ở Đây Sẽ Tăng Ứng Với Phần Trăm Đã Giảm (Giảm **10%** -> **Hệ Số = Hệ Số*1.1**)`)
                        .setTimestamp()
                    await interaction.editReply({
                        embeds: [QuickMathEmbed]
                    })
                    break
                }
            default:
                {
                    return
                }
        }
    }
}