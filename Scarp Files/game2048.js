//-----CODE KO HOẠT ĐỘNG - CHỜ GIẢI QUYẾT-----\\
/*const { SlashCommandBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('game2048')
        .setDescription('Tạo Game 2048 XD'),
    async execute(interaction) {
        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('Blank')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⬛')
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId('Up')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('1086297338961739896'),
            new ButtonBuilder()
                .setCustomId('Blank2')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⬛')
                .setDisabled(true),
            )
        const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('Left')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('1086297531379613767'),
            new ButtonBuilder()
                .setCustomId('Down')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('1086297356011585697'),
            new ButtonBuilder()
                .setCustomId('Right')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('1086297678624854077'),
        )
    //Các Title (Default)
        const t0 = "<:title_blank:1086289535375257620>"
        const t2 = "<:title_2:1086287140977127535>"
        const t4 = "<:title_4:1086287255288684637>"
        const t8 = "<:title_8:1086287308254351390>"
        const t16 = "<:title_16:1086287357155741808>"
        const t32 = "<:title_32:1086287378693497005>"
        const t64 = "<:title_64:1086287399174287372>"
        const t128 = "<:title_128:1086287429884973066>"
        const t256 = "<:title_256:1086287452899119225>"
        const t512 = "<:title_512:1086287476232028221>"
        const t1024 = "<:title_1024:1086287494066229260>"
        const t2048 = "<:title_2048:1086287514790268939>"
        const t4096 = "<:title_4096:1086497903511621744>"
        const t8192 = "<:title_8192:1086497929956696144>"
        const t16384 = "<:title_16384:1086497953377701919>"
        const t32768 = "<:title_32768:1086497975490060399>"
        const t65536 = "<:title_65536:1086497994775478332>"
    //Setup Nhẹ
        var score = 0
        const WinEmbed = new EmbedBuilder()
                            .setColor('Green')
                            .setTitle(`**2048 Game: BẠN ĐÃ THẮNG**`)
                            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
                            .setDescription(`**Chúc Mừng Bạn!** Bạn Có Thể Chơi Tiếp Nếu Muốn *(NOT AVAILABLE)*`)
                            .setTimestamp()
                            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        const LoseEmbed = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle(`**2048 Game: GAME OVER**`)
                            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
                            .setDescription(`**Haizz, Tiếc Quá Ha, Chúc Bạn May Mắn Lần Sau!**`)
                            .setTimestamp()
                            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
    //Game Set
        var snd = true
        var win = false
        var lose = false
        var table = [
            [0,0,0,0,'\n'],
            [0,0,0,0,'\n'],
            [0,0,0,0,'\n'],
            [0,0,0,0,'\n'],
        ]
    //Bắt Đầu Chạy
        function start_game(){
            var mat = table
            start(mat)
            if(snd==true){
                snd=false
                second(mat)
            }
            return mat
        }
    //Thêm Ô 
        function start(mat) {
            var i, j
            i = Math.floor(Math.random()*4)
            j = Math.floor(Math.random()*4)
            while(mat[i][j]==0){
                let rng = Math.floor(Math.random()*11)
                if(rng == 10) {
                    mat[i][j] = 4
                    console.log(`mat[${i}][${j} = ${mat[i][j]}`)
                }
                else{
                    mat[i][j] = 2
                    console.log(`mat[${i}][${j}] = ${mat[i][j]}`)
                }
            }
        }
    //Ô Thứ 2 (1 Lần)
        function second(mat) {
            var i, j
            i = Math.floor(Math.random()*4)
            j = Math.floor(Math.random()*4)
            while(mat[i][j]==0){
                let rng = Math.floor(Math.random()*11)
                if(rng == 10) {
                    mat[i][j] = 4
                    console.log(`mat[${i}][${j} = ${mat[i][j]}`)
                }
                else{
                    mat[i][j] = 2
                    console.log(`mat[${i}][${j}] = ${mat[i][j]}`)
                }
            }
        }
    //Xác Định Kết Quả
        function gamestate(mat){
            var i, j
            for(i=0;i<4;i++){
                for(j=0;j<4;j++){
                    if(mat[i][j]==2048){
                        return win = true
                    }
                }
            }
            for(i=0;i<4;i++){
                for(j=0;j<4;j++){
                    if(mat[i][j]==0){}
                        return lose = false
                    }
                }
            for(i=0;i<3;i++){
                for(j=0;j<3;j++){
                    if(mat[i][j] == mat[i+1][j] || mat[i][j] == mat[i][j+1])
                        return lose = false
                    }
                }
            for(j=0;j<3;j++){
                if(mat[3][j] == mat[3][j+1])
                    return lose = false
                }
            for(i=0;i<3;i++){
                if(mat[i][3] == mat[i+1][3])
                    return lose = false
                }
            return lose = true
        }
    //Nén Mảng
        function compress(mat){
            var i, j
            var changed = false
            var new_mat = [
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
            ]
            for(i=0;i<new_mat.length-1;i++){
                var pos=0
                for(j=0;j<new_mat[i].length-1;j++){
                    if(mat[i][j]!=0){
                        new_mat[i][pos]=mat[i][j]
                        if(j!=pos){
                            changed=true
                            pos+=1
                        }
                    }
                }
            return(new_mat,changed)
            }
        }
    //Gộp Mảng
        function merge(mat,score){
            var i, j
            for(i in mat.length-1){
                for(j in mat[i].length-1){
                    if(mat[i][j]!= 0 && mat[i][j] == mat[i][j+1]){
                        mat[i][j]=mat[i][j]*2
                        mat[i][j+1] = 0
                        score = score+mat[i][j]
                    }
                }
            }
        return(mat)
        }
    //Đảo Mảng
        function rev(mat){
            var i, j
            var new_mat = [
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
            ]
            for(i=0;i<4;i++){
                for(j=0;j<4;j++){
                    new_mat[i][j] = mat[i][3-j]
                }
            }
        return new_mat
        }
    //Tráo Cột Hàng Mảng
        function transpose(mat){
            var i, j
            var new_mat = [
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
                [0,0,0,0,'\n'],
            ]
            for(i=0;i<4;i++){
                for(j=0;j<4;j++)
                    new_mat[i][j]=mat[j][i]
            }
        return(new_mat)
        }
    //Di Chuyển Bên Trái
        function MoveLeft(grid){
            var changed2, temp, changed1, new_grid
            new_grid, changed1 = compress(grid)
            new_grid, changed2 = merge(new_grid)
            new_grid, temp = compress(new_grid)
            return(new_grid,temp)
        }
    //Di Chuyển Bên Phải
        function MoveRight(grid){
            var new_grid, changed
            new_grid = rev(grid)
            new_grid, changed = MoveLeft(new_grid)
            new_grid = rev(new_grid)
            return(new_grid,changed)
        }
    //Di Chuyển Lên Trên
        function MoveUp(grid){
            var changed, new_grid
            new_grid = transpose(grid)
            new_grid, changed = MoveLeft(new_grid)
            new_grid = transpose(new_grid)
            return(new_grid,changed)
        }
    //Di Chuyển Xuống Dưới
        function MoveDown(grid){
            var changed, new_grid
            new_grid = transpose(grid)
            new_grid, changed = MoveRight(grid)
            new_grid = transpose(new_grid)
            return(new_grid,changed)
        }
    //Xuất Kết Quả
        var mat = start_game()
        resmat = mat
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                switch(resmat[i][j]){
                    case 2:
                        resmat[i][j] = t2
                        break
                    case 4:
                        resmat[i][j] = t4
                        break
                    case 8:
                        resmat[i][j] = t8
                        break
                    case 16:
                        resmat[i][j] = t16
                        break
                    case 32:
                        resmat[i][j] = t32
                        break
                    case 64:
                        resmat[i][j] = t64
                        break
                    case 128:
                        resmat[i][j] = t128
                        break
                    case 256:
                        resmat[i][j] = t256
                        break
                    case 512:
                        resmat[i][j] = t512
                        break
                    case 1024:
                        resmat[i][j] = t1024
                        break
                    case 2048:
                        resmat[i][j] = t2048
                        break
                    case 4096:
                        resmat[i][j] = t4096
                        break
                    case 8192:
                        resmat[i][j] = t8192
                        break
                    case 16384:
                        resmat[i][j] = t16384
                        break
                    case 32768:
                        resmat[i][j] = t32768
                        break
                    case 65536:
                        resmat[i][j] = t65536
                        break
                    default:
                        resmat[i][j] = t0
                }
            }
    }
        var x=resmat.toString()
        var c=x.replace(/,/g,"")
        console.log(c)
        console.log(mat,resmat)
    //Embed Ready
        const ready_embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`**2048 Game (NOT WORKING!)** | Loading...`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setDescription(`Hãy Chờ Một Lát...`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
    //Embed In Game
        let embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`**2048 Game (NOT WORKING!)** | Điểm Số Của Bạn: ${score}`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setDescription(`${c}`)
            .setTimestamp()
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
    await interaction.reply(
            {
            embeds: [ready_embed],
            components: [],
            }
        )
    await wait(500)
    await interaction.editReply({
        embeds: [embed],
        components: [row1,row2]
    })
    //Click Nút:
        const filter = a => a.user.id === user;
        const collector = interaction.channel.createMessageComponentCollector(filter)
        collector.on('collect',async a => {
            if(a.customId === 'Left') {
                MoveLeft(mat)
                gamestate(mat)
            await interaction.editReply({
                embeds: [embed],
                components: [row1,row2]
                })
            }
            if(a.customId === 'Right') {
                MoveRight(mat)
                gamestate(mat)
                await interaction.editReply({
                    embeds: [embed],
                    components: [row1,row2]
                    })
                }
            if(a.customId === 'Up'){
                MoveUp(mat)
                gamestate(mat)
                await interaction.editReply({
                    embeds: [embed],
                    components: [row1,row2]
                    })
                }
            if(a.customId === "Down"){
                MoveDown(mat)
                gamestate(mat)
                await interaction.editReply({
                    embeds:[embed],
                    components: [row1,row2]
                    })
                }
            });
        if(win == true)
            await interaction.editReply({
                embeds: [embed,WinEmbed],
                components: []
                })
        if(lose == true)
            await interaction.editReply({
                embeds: [embed,LoseEmbed],
                components: []
                })
        }
}*/