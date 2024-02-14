const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mioavt')
        .setDescription('Thay Ảnh Đại Diện Của Bot')
        .addAttachmentOption(option =>
            option.setName('file')
                .setDescription('File Ảnh Cần Upload')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const avt = interaction.options.getAttachment('file')
        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setTitle(`<:YuyukoWoah:1152872168439423050> **Miosha - Set Avatar**`)
            .setColor('Blurple')
            .setDescription(`Đã Thay Avatar Của Tớ Rồi, Thế Nào?`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        if (usingkey) {
            var error
            await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
            await interaction.client.user.setAvatar(avt.url).catch(async err => {
                error = true
                console.log(err)
                const ErrEmbed = new EmbedBuilder()
                    .setColor('DarkAqua')
                    .setTitle(`<:OrinBruh:1160295126996881448> Lỗi`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`*Chi Tiết Lỗi (Bên Dưới)*\nError: \`${err.toString()}\``)
                    .setTimestamp()
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                return await interaction.editReply({
                    embeds: [ErrEmbed],
                    ephemeral: true
                })
            })
        } else {
            await interaction.editReply({
                embeds: [NoPerm],
                ephemeral: true
            })
        }
    }
}
