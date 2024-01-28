const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const chalk = require('chalk')

const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command Purpose...'),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
        const TestModal = new ModalBuilder()
            .setCustomId('t_modal')
            .setTitle('Test Create Embed... Bằng Modal')

        const Title = new TextInputBuilder()
            .setCustomId('t_title')
            .setLabel('Title Embed')
            .setMinLength(1)
            .setMaxLength(255)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

        const Desc = new TextInputBuilder()
            .setCustomId('t_desc')
            .setLabel('Desc Embed')
            .setMinLength(1)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)

        const Title_ = new ActionRowBuilder().addComponents(Title)
        const Desc_ = new ActionRowBuilder().addComponents(Desc)
        TestModal.addComponents(Title_, Desc_)
        const user = interaction.user.id
        const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '892054339072438303', '1084992470074531960']
        function PermUsing(user) {
            var i
            for (i in userarr) {
                if (user === userarr[i]) {
                    return true
                }
            }
            return false
        }
        const Perm_ = PermUsing(user)
        if (Perm_) {
            await interaction.showModal(TestModal)
            try {
                const modalResponse = await interaction.awaitModalSubmit({
                    filter: (i) =>
                        i.customId === 't_modal' && i.user.id === interaction.user.id,
                        time: 900000
                });
                if (modalResponse.isModalSubmit()) {
                    const title = modalResponse.fields.getTextInputValue('t_title')
                    const desc = modalResponse.fields.getTextInputValue('t_desc')
                    console.log(title, desc)
                    await modalResponse.reply(`Test Modal Thành Công!`)
                }
            } catch (error) {
                console.error(error)
                const NoPermEmbed = new EmbedBuilder()
                    .setColor('DarkButNotBlack')
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                    .setTitle('<:OrinBruh:1160295126996881448> **No Permission**')
                    .setDescription('No! Bạn Không Có Quyền Sử Dụng Command Này!')
                    .setTimestamp()
                await interaction.reply({
                    embeds: [NoPermEmbed],
                })
            }

            /*const cdtime = 300000
            cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
                if (err) throw err
                if (!data) {
                    cdSchema.create({
                        UserID: interaction.user.id,
                        CDTest: Date.now(),
                    })
                }
                if (data) {
                    const user = data.UserID
                    const CDTime = data.CDTest
                     console.log(chalk.yellow('[Command: Test]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)
                    
                    const BypassCD_ = BypassCD(user)
                    if (CDTime > Date.now() && !BypassCD_) {
                        const cdembed = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${user}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        await interaction.reply({
                            embeds: [cdembed],
                            ephemeral: true
                        })
                    } else {
                        data.CDTest = Date.now() + cdtime
                        data.save()
                        
                    }
                }
            })*/
        }
    }
}