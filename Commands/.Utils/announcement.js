const { SlashCommandBuilder, EmbedBuilder, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Tạo Thông Báo Cho Toàn Server Biết (Dưới Channel Nhất Định)')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel Bạn Muốn Đăng Thông Báo')
                .addChannelTypes(ChannelType.GuildAnnouncement)
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds

        const channel = interaction.options.getChannel('channel')

        const AnnounceModal = new ModalBuilder()
            .setCustomId('a_modal')
            .setTitle('Bạn Sẽ Thông Báo Gì Cho Server?')

        const TitleBox = new TextInputBuilder()
            .setCustomId('a_title')
            .setLabel('Tiêu Đề Của Thông Báo')
            .setMaxLength(255)
            .setMinLength(1)
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const DescBox = new TextInputBuilder()
            .setCustomId('a_desc')
            .setLabel('Nội Dung Của Thông Báo')
            .setMinLength(1)
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

        const ContextBox = new TextInputBuilder()
            .setCustomId('a_ctx')
            .setLabel('Tin Nhắn Đi Kèm Với Thông Báo')
            .setMinLength(1)
            .setMaxLength(255)
            .setStyle(TextInputStyle.Short)
            .setRequired(false)

        const ImgBox = new TextInputBuilder()
            .setCustomId('a_img')
            .setLabel('Link Ảnh Đi Kèm Trong Embed')
            .setStyle(TextInputStyle.Short)
            .setMaxLength(4000)
            .setRequired(false)

        const A_Title = new ActionRowBuilder().addComponents(TitleBox)
        const A_Desc = new ActionRowBuilder().addComponents(DescBox)
        const A_Ctx = new ActionRowBuilder().addComponents(ContextBox)
        const A_Img = new ActionRowBuilder().addComponents(ImgBox)

        AnnounceModal.addComponents(A_Title, A_Desc, A_Ctx, A_Img)
        const usemem = await interaction.guild.members.fetch(interaction.user.id)

        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        if (usingkey) {
            await interaction.showModal(AnnounceModal)
            try {
                const modalResponse = await interaction.awaitModalSubmit({
                    filter: (i) =>
                        i.customId === 'a_modal' && i.user.id === interaction.user.id,
                    time: 900000
                });
                if (modalResponse.isModalSubmit()) {
                    const title = modalResponse.fields.getTextInputValue('a_title')
                    const desc = modalResponse.fields.getTextInputValue('a_desc')
                    const context = modalResponse.fields.getTextInputValue('a_ctx') || '<@&901074521824559125>'
                    var img_url = modalResponse.fields.getTextInputValue('a_img') || 'https://cdn.discordapp.com/attachments/948615835369472064/1137282623165702234/Ban_sao_cua_LYG_-_Banners_20230805_141443_0000.png'

                    function xuatkey(img_url) {
                        var key
                        if (img_url === null) {
                            key = false
                            return key
                        } else if (!img_url.startsWith('https://')) {
                            key = false
                            return key
                        } else {
                            key = true
                            return key
                        }
                    }

                    const imgkey = xuatkey(img_url)
                    if (!imgkey) {
                        img_url = 'https://cdn.discordapp.com/attachments/948615835369472064/1137282623165702234/Ban_sao_cua_LYG_-_Banners_20230805_141443_0000.png'
                    }

                    const Announce_Embed = new EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setColor('White')
                        .setTitle(title)
                        .setDescription(desc)
                        .setImage(img_url)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    await modalResponse.reply({
                        content: `Đã Gửi Thông Báo Đến ${channel}`,
                        ephemeral: true
                    })
                    await channel.send({
                        content: `${context}`,
                        embeds: [Announce_Embed]
                    })
                }
            } catch (error) {
                const ErrEmbed = new EmbedBuilder()
                    .setColor('DarkButNotBlack')
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    .setTitle('<:OrinBruh:1160295126996881448> **Lỗi Submit Modal**')
                    .setDescription('Uhh, Lỗi Submit Modal Rồi, Có 2 Nguyên Nhân Sau:\n1. Hết Giờ Kìa Ba, Nhập Lại Đê :V\n> 2. Lỗi Code, Pha Này Gọi Chủ Bot Lên Nhá :V')
                    .setTimestamp()
                await interaction.reply({
                    embeds: [ErrEmbed],
                })
                console.error(error)
            }
        } else {
            interaction.reply({
                embeds: [NoPerm]
            })
        }
    }
}