const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const Level = require('../../Database/level')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolerestrict')
        .setDescription('Hạn Chế Người Dùng Nào Nhận Role')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Dùng Bạn Muốn Hạn Chế')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('code')
                .setDescription('Mã Hạn Chế (Code-0 -> 3)')
                .addChoices(
                    {
                        name: 'Code-0',
                        value: 'Code-0'
                    },
                    {
                        name: 'Code-1',
                        value: 'Code-1'
                    },
                    {
                        name: 'Code-2',
                        value: 'Code-2'
                    },
                    {
                        name: 'Code-3',
                        value: 'Code-3'
                    })
                .setRequired(false)
        ),

    async execute(interaction) {
        await interaction.deferReply()
        const FooterEmbeds_ = FooterEmbeds
        const RestrictKey = interaction.options.getString('code') || 'Code-0'
        const target = interaction.options.getUser('user')

        const NoPerm = new EmbedBuilder()
            .setColor('DarkAqua')
            .setTitle(`<:OrinBruh:1160295126996881448> Không Đủ Thẩm Quyền`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Bạn Không Có Đủ Thẩm Quyền, Làm Thế Nào Bạn Có Thể Dùng Lệnh Hả???`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const ErrEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`**No Restriction Data`)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Người Dùng ${target} Chưa Có Mã Ghi Nhận Hạn Chế Nào Cả`)
            .setTimestamp()
            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })

        const member = await interaction.guild.members.fetch(target.id)
        const usemem = await interaction.guild.members.fetch(interaction.user.id)
        var usingkey = false
        if (usemem.roles.cache.has('900747529384247336')) {
            usingkey = true
        }

        if (!usingkey) {
            await interaction.editReply({
                embeds: [NoPerm]
            })
        } else {
            Level.findOne({ UserID: target.id }, async (err, data) => {
                if (err) throw err
                if (!data) {
                    await interaction.editReply({
                        embeds: [ErrEmbed]
                    })
                }
                if (data) {
                    const Restrict = data.restrict
                    data.restrict = RestrictKey
                    if (Restrict === RestrictKey) {
                        const DuplicatedEmbed = new EmbedBuilder()
                            .setColor('Green')
                            .setTitle(`**Duplicated Data`)
                            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                            .setDescription(`<:LYG_KeqingDoi:1086190826536849499> | Người Dùng ${target} Rồi, Chuyển Cũng Mã Hạn Chế Để Làm Gì? \`Mã Hạn Chế: ${RestrictKey}\``)
                            .setTimestamp()
                            .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                        return interaction.editReply({
                            embeds: [DuplicatedEmbed]
                        })
                    } else {
                        data.save()
                        if (RestrictKey === 'Code-0') {
                            const Removed = new EmbedBuilder()
                                .setColor('Green')
                                .setTitle(`**Removed Restriciton**`)
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                .setDescription(`<:OkayuYay:1020272183060217876> | Đã Loại Bỏ Tất Cả Hạn Chế Của Người Dùng ${target}`)
                                .setTimestamp()
                                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            await interaction.editReply({
                                embeds: [Removed]
                            })
                        } else {
                            let desc = ''
                            switch (RestrictKey) {
                                case 'Code-1':
                                    {
                                        desc = `<a:LYG_YaeSlap:968357111706824704> | Đã Hạn Chế Người Dùng ${target} Ở Khoản Truy Cập Vô Kênh <#995345645554638849> (NO HORNY!) \`Mã Hạn Chế: ${RestrictKey}\``
                                        const role = interaction.guild.roles.cache.get('967803874259898388')
                                        if (member.roles.cache.has('967803874259898388')) {
                                            member.roles.remove(role)
                                        }
                                        break
                                    }
                                case 'Code-2':
                                    {
                                        desc = `<a:LYG_YaeSlap:968357111706824704> | Đã Hạn Chế Người Dùng ${target} Ở Khoản Truy Cập Vô Danh Mục \`Lazy Town\` (KHÔNG CÓ UY TÍN) \`Mã Hạn Chế: ${RestrictKey}\``
                                        const role = interaction.guild.roles.cache.get('900750143605866516')
                                        if (member.roles.cache.has('900750143605866516')) {
                                            member.roles.remove(role)
                                        }
                                        break
                                    }
                                case 'Code-3':
                                    {
                                        desc = `<a:LYG_YaeSlap:968357111706824704> | Đã Hạn Chế Người Dùng ${target} Ở Khoản Truy Cập Vô Kênh <#995345645554638849> Kiêm Danh Mục \`Lazy Town\` (NO HORNY! + KHÔNG CÓ UY TÍN) \`Mã Hạn Chế: ${RestrictKey}\``
                                        const role1 = interaction.guild.roles.cache.get('967803874259898388')
                                        if (member.roles.cache.has('967803874259898388')) {
                                            member.roles.remove(role1)
                                        }
                                        const role2 = interaction.guild.roles.cache.get('900750143605866516')
                                        if (member.roles.cache.has('900750143605866516')) {
                                            member.roles.remove(role2)
                                        }
                                        break
                                    }
                            }
                            const RestrictEmbed = new EmbedBuilder()
                                .setColor('Yellow')
                                .setTitle(`Miosha#5189 - Restriction`)
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
                                .setDescription(`${desc}`)
                                .setTimestamp()
                                .setFooter({ text: `${FooterEmbeds_[0][0]}`, iconURL: `${FooterEmbeds_[1][Math.floor(Math.random() * FooterEmbeds_[1].length)]}` })
                            await interaction.editReply({
                                embeds: [RestrictEmbed]
                            })
                        }
                    }
                }
            })
        }
    }
}