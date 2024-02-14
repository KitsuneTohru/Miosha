const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const RankKey = require('../../Database/rankkeydb')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setrankcard')
        .setDescription('Lựa Chọn Kiểu Rank Card Mà Bạn Thích')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Kiểu Rank Card Bạn Muốn')
                .addChoices(
                    {
                        name: "Type1",
                        value: 'type1'
                    },
                    {
                        name: "Type2",
                        value: "type2"
                    })
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const cardtype = interaction.options.getString('type')
        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        if (cardtype === 'type1' || cardtype === 'type2') {
            const special_txt = '`' + cardtype + '`'
            const CardTypeEmbed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                .setTitle(`<a:OrinPopcorn:1146170440738406572> **Lazy Gang - Set Rankcard**`)
                .setColor('Blurple')
                .setDescription(`> Đã Thay Đổi Kiểu Rank Card Cho Người Dùng ${interaction.user}\n> Loại Rank Card: ${special_txt}`)
                .setTimestamp()
                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

            RankKey.findOne({ UserID: interaction.user.id }, async (err, data) => {
                if (err) throw err
                if (!data) {
                    RankKey.create({
                        UserID: interaction.user.id,
                        RankCardType: cardtype
                    })
                    await interaction.editReply({
                        embeds: [CardTypeEmbed]
                    })
                }
                if (data) {
                    const ranktype = data.RankCardType
                    if (!ranktype) {
                        data.RankCardType = cardtype
                        await interaction.editReply({
                            embeds: [CardTypeEmbed]
                        })
                    } else {
                        data.RankCardType = cardtype
                        await interaction.editReply({
                            embeds: [CardTypeEmbed]
                        })
                    }
                    data.save()
                }
            })
        }
    }
}