const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const cdSchema = require('../../Database/cooldown')
const Type1Entries = require('../../Assets/Omikuji/type1')
const Type2Entries = require('../../Assets/Omikuji/type2')
const Type3Entries = require('../../Assets/Omikuji/type3')
const Type4Entries = require('../../Assets/Omikuji/type4')
const Type5Entries = require('../../Assets/Omikuji/type5')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('omikuji')
        .setDescription('Dùng Để Rút Quẻ'),
    async execute(interaction) {
        const FooterEmbeds_ = FooterEmbeds
        const cdtime = 86400000 
        //BUTTON TYPE 5 ENTRY
        const type5_1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('entrytype5_1')
                    .setLabel('| Kitsunezi: Backstory')
                    .setEmoji('1084085934926069823')
                    .setStyle(ButtonStyle.Secondary)
            )
        const type5_2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('entrytype5_2')
                    .setLabel('| Lazy Gang: Secret')
                    .setEmoji('1087692048280334347')
                    .setStyle(ButtonStyle.Secondary)
            )
        //THUẬT TOÁN LỌC USER Ở NÚT
        const user = interaction.user.id
        //THUẬT TOÁN RANDOM LẤY ENTRY
        var rng = Math.random() * 100.01
        rng = (Math.floor(rng * 100) / 100).toFixed(2)
        var rng1 = -1, rng2 = -1, rng3 = -1, rng4 = -1
        //IMAGE URL: TYPE 3,4,5 SẼ CHỐT LẤY
        if (rng > 96)
            var img_url = 'https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png'
        //ENTRY RUN
        let result;
        //ENTRY SET
        const type1 = Type1Entries
        const type2 = Type2Entries
        const type3e = Type3Entries[0]
        const type3l = Type3Entries[1]
        const type4e = Type4Entries[0]
        const type4l = Type4Entries[1]
        const type5e = Type5Entries[0]
        const type5l = Type5Entries[1]
        //TYPE 1 ENTRY: RNG ITEM: TRUE/IMG URL: FALSE
        if (rng <= 84) {
            rng1 = Math.floor(Math.random() * type1.length)
            result = type1[rng1]
        }
        //TYPE 2 ENTRY: RNG ITEM: TRUE/IMG URL: FALSE        
        else if (rng <= 96) {
            rng2 = Math.floor(Math.random() * type2.length)
            result = type2[rng2]
        }
        //TYPE 3 ENTRY: RNG ITEM: TRUE/IMG_URL: TRUE
        else if (rng <= 99) {
            rng3 = Math.floor(Math.random() * type3e.length)
            result = type3e[rng3]
            img_url = type3l[rng3]
        }
        //TYPE 4 ENTRY: RNG ITEM: FALSE/IMG_URL: TRUE
        else if (rng <= 99.9) {
            rng4 = Math.floor(Math.random() * type4e.length)
            result = type4e[rng4]
            img_url = type4l[rng4]
        }
        //TYPE 5 ENTRY: RNG ITEM: FALSE/IMG_URL: TRUE/BONUS: BUTTON -> Ephemeral
        else if (rng <= 99.95) {
            result = type5e[0]
            img_url = type5l[0]
        }
        else {
            result = type5e[1]
            img_url = type5l[1]
        }
        //EMBED TYPE 5 ENTRY

        const KitsuneziEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`<:LYG_FubukiPain:1084085934926069823> **Kitsunezi's Backstory**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(Type5Entries[2][0])
            .setTimestamp(Date.now())
            .setImage(img_url)
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
        const LYGEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`<a:LYG_Planet:1084085941821513789> **LYG's Secret**`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(Type5Entries[2][1])
            .setTimestamp(Date.now())
            .setImage(img_url)
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CDOmikuji: Date.now(),
                })
            } if (data) {
                const cduser = data.UserID
                const CDTime = data.CDOmikuji
                console.log('[Command: Omikuji]', cduser, CDTime, Date.now())
                if (CDTime > Date.now()) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`<a:LYG_Clock:1084322030331105370> **Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(`<:LYG_FubukiPing1:1084085915368050788> | <@${cduser}> Oi! Bạn Phải Chờ Đến <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) Mới Có Thể Thực Hiện Lệnh Nhé!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                    await interaction.reply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDOmikuji = Date.now() + cdtime
                    data.save()
                    //EMBED GỐC ENTRY
                    const embed = new EmbedBuilder()
                        .setColor('Aqua')
                        .setTitle(`**<:LYG_Omikuji:1084322622491344937> Đền Thần - Rút Quẻ Hàng Ngày**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(result)
                        .setTimestamp(Date.now())
                        .setImage(img_url)
                        .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random()*FooterEmbeds_[1].length)]}` })
                    await interaction.reply({
                        embeds: [embed],
                    })
                    if (rng > 99.9 && rng <= 99.95) {
                        await interaction.editReply({
                            embed: [embed],
                            components: [type5_1]
                        })
                    }
                    else if (rng > 99.95 && rng <= 100) {
                        await interaction.editReply({
                            embed: [embed],
                            components: [type5_2]
                        })
                    }
                    //Trigger Nút    
                    const filter = a => a.user.id === user;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 })
                    collector.on('collect', async a => {
                        var key = true
                        if (a.customId === 'entrytype5_1') {
                            if (key) {
                                await wait(500)
                                await interaction.followUp({
                                    embeds: [KitsuneziEmbed],
                                    ephemeral: true,
                                })
                                key = false
                            }
                        }
                        if (a.customId === 'entrytype5_2') {
                            if (key) {
                                await wait(500)
                                await interaction.followUp({
                                    embeds: [LYGEmbed],
                                    ephemeral: true,
                                })
                                key = false
                            }
                        }
                    })
                    console.log('========================================\nSố Encounter: ', rng, rng1, rng2, rng3, rng4, '\n========================================')
                }
            }
        })
    }
}