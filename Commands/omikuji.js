const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('omikuji')
        .setDescription('Dùng Để Rút Quẻ'),
    async execute(interaction) {
    //RNG ITEM LIST --- ÁP DỤNG CHO TYPE 1 2 3
        const rngitemlist = ["`Bách Hợp Lưu Ly`","`Tiểu Đăng Thảo`","`Nấm U Ám`","`Onikabuto`","`Tủy Pha Lê`","`Sen Nilotpala`","`Cúc Cánh Quạt`","`Tú Cầu Anh Đào`","`Mật Hoa Nguyên Tố`","`Hoa Nghê Thường`","`Huy Hiệu Giáo Quan`","`Kiếm Cách Trứ Danh`","`Túi Lưu Ly`","`Ốc Sao`","`Nấm Rơm Gió`","`Hải Linh Chi`","`Hạt Bồ Công Anh`","`Hoa Cecillia`","`Thạch Phách`","`Sữa Dango`","`Sen Kalpalata`"]
        var item_rng = Math.floor(Math.random()*rngitemlist.length)
        const item = rngitemlist[item_rng]
    //THUẬT TOÁN RANDOM LẤY ENTRY
        var rng = Math.random()*100.01
        rng = (Math.floor(rng*100)/100).toFixed(2)
    //IMAGE URL: TYPE 3,4,5 SẼ CHỐT LẤY
        if(rng>96)
            var img_url = 'https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png'
    //ENTRY RUN
        let result;
    //TYPE 1 ENTRY: RNG ITEM: TRUE/IMG URL: FALSE
            if(rng<=12)
                result = `<:LYG_KeqingDoi:1084085049617559553> **Đại Hung**\n> **Nội Dung Thẻ:** Hôm Nay Tướng Mạo Bạn Hơi Xấu, Chắc Chắn Là Có Điềm Báo Không Mấy Tốt Lành Gì Xảy Ra, Làm Ơn Đấy, Hạn Chế Ra Ngoài Hay Tiếp Xúc Đi, Kẻo Lại Mang Rủi Về Bản Thân Bạn!\n\n> **Nhân Vật Đồng Hành:** Bennett\n> **Vật May Mắn:** ${item}`
            else if(rng<=24)
                result = `<:LYG_KeqingDoi:1084085049617559553> **Hung**\n> **Nội Dung Thẻ:** Bạn Ra Đường, Nhưng Lại Gặp Cuộc Cãi Vã, Bạn Về Nhà, Nhận Thấy Đời Nó Đen, Đừng Có Bi Quan Quá, Hãy Lạc Quan Lên Nhé, Xui Nhẹ Thế Này Không Làm Khó Bạn Đâu!\n\n> **Nhân Vật Đồng Hành:** Layla\n> **Vật May Mắn:** ${item}`
            else if(rng<=36)
                result = `<a:LYG_Sparkle:1084084997398470747> **Vô Cát**\n> **Nội Dung Thẻ:** Đây Đích Thị Là Một Ngày Bình Thường Đối Với Bạn, Chỉ Cần Bạn Kiên Trì, Thì Mọi Nỗ Lực Của Bạn Cũng Sẽ Được Đền Đáp, Hãy Nhớ Lấy, Đừng Có Lười Biếng À Nha!\n\n> **Nhân Vật Đồng Hành:** Sayu\n> **Vật May Mắn:** ${item}`
            else if(rng<=48)
                result = `<a:LYG_Sparkle:1084084997398470747> **Tiểu Cát**\n> **Nội Dung Thẻ:** Hôm Nay Bạn Ra Đường, Bạn Cũng Sẽ Gặp Được Một Chút May Mắn, Có Thể Bạn Sẽ Gặp Lại Được Người Bạn Phương Xa, Cũng Có Thể Là Bạn Cũng Sẽ Thu Hoạch Được Một Chút Kinh Nghiệm Nho Nhỏ Từ Cuộc Sống...\n\n> **Nhân Vật Đồng Hành:** Shikanoin Heizou\n> **Vật May Mắn:** ${item}`
            else if(rng<=60)
                result = `<a:LYG_Sparkle:1084084997398470747> **Cát**\n> **Nội Dung Thẻ:** À... Một Ngày Suôn Sẻ Đối Với Bạn Đây Rồi Còn Đâu? Với Độ May Mắn Này, Chắc Bạn Cũng Sẽ Chả Lo Về Chuyện Bao Đồng Hay Là Bị Lừa Đảo Cả, Nhỉ?\n\n> **Nhân Vật Đồng Hành:** Thoma\n> **Vật May Mắn:** ${item}`
            else if(rng<=72)
                result = `<a:LYG_Sparkle:1084084997398470747> **Trung Cát**\n> **Nội Dung Thẻ:** Hôm Nay Tướng Mạo Bạn Khá Sáng Sủa, Đi Đâu Cũng Có Thể Gặp Được May Mắn, Đừng Lo Về Chuyện Phó Mặc Cho Thời Tiết Hay Con Đường Bạn Chọn, Chắc Chắn Bạn Sẽ Kiếm Được Lối Đi Về Mà Không Gặp Trở Ngại Gì Cả\n\n> **Nhân Vật Đồng Hành:** Mika\n> **Vật May Mắn:** ${item}`
            else if(rng<=84)
                result = `<a:LYG_Sparkle:1084084997398470747> **Đại Cát**\n> **Nội Dung Thẻ:** Hôm Nay (Hoặc Tuần Này) Bạn Sẽ Gặp Cực Kì Nhiều May Mắn Trong Cuộc Sống, Hãy Ra Ngoài Mà Tận Hưởng Đi, Đảm Bảo Rằng Bạn Sẽ Dễ Dàng Gặp Vận May Trong Quãng Thời Gian Sắp Tới Nhá!\n\n> **Nhân Vật Đồng Hành:** Ningguang\n> **Vật May Mắn:** ${item}`
    //TYPE 2 ENTRY: RNG ITEM: TRUE/IMG URL: FALSE        
            else if(rng<=85.2)
                result = `<a:LYG_Star:1084085189174632538> **Rare Entry 1a**\n> **Nội Dung Thẻ:** Chà, Bạn Đến Đền Narukami Để Rút Quẻ Sao? Đừng Lo, Bạn Đã Nhận Được Phù Hộ Của Loài Cáo Rồi Nhé, Chắc Chắn Bạn Sẽ Gặp May Thôi!\n\n> **Nhân Vật Đồng Hành:** Yae Miko\n> **Vật May Mắn:** ${item}`
            else if(rng<=86.4)
                result = `<a:LYG_AyameSlam:1084085216873807915> **Rare Entry 1b**\n> **Nội Dung Thẻ:** Bạn Ra Đường Bạn Bị Sét Đánh Ư? Công Nhận, Số Bạn Sao Nó Đen Thế, Hay Là Bạn Gặp Trúng Waifu Nhưng Bạn Bội Bạc Cô Ấy?\n\n> **Nhân Vật Đồng Hành:** Keqing\n> **Vật May Mắn:** ${item}`
            else if(rng<=87.6)
                result = `<a:LYG_Star:1084085189174632538> **Rare Entry 2a**\n> **Nội Dung Thẻ:** Không Phải Cuộc Sống Của Ai Nó Cũng Tẻ Nhạt Vậy Đâu, Bạn Thấy Đấy, Đôi Lúc Đám Tang Không Phải Là Sự Đau Thương, Mà Là Dịp Để Ta Hướng Tới Tương Lai Một Cách Mạnh Mẽ Hơn...\n\n> **Nhân Vật Đồng Hành:** Hu Tao\n> **Vật May Mắn:** ${item}`
            else if(rng<=88.8)
                result = `<a:LYG_AyameSlam:1084085216873807915> **Rare Entry 2b**\n> **Nội Dung Thẻ:** "Làm Một Ly Matcha Cho Nó Matme Nào"\n\n> **Nhân Vật Đồng Hành:** Diluc\n> **Vật May Mắn:** ${item}`
            else if(rng<=90)
                result = `<a:LYG_Star:1084085189174632538> **Rare Entry 3a**\n> **Nội Dung Thẻ:** Khi Nhắc Đến Sự Điềm Tĩnh Và Cao Quý, Chắc Hẳn Bạn Đã Có Trong Mình Một Câu Trả Lời Thích Đáng Rồi Nhỉ? Thật Vậy, Tôi Luôn Muốn Cùng Bạn Trên Hành Trình Này, Vậy Xin Chiếu Cố Nhé!\n\n> **Nhân Vật Đồng Hành:** Kamisato Ayaka\n> **Vật May Mắn:** ${item}`
            else if(rng<=91.2)
                result = `<a:LYG_AyameSlam:1084085216873807915> **Rare Entry 3b**\n> **Nội Dung Thẻ:** Nỗi Đau Này Ai Thấu Được, Thôi... Bạn Lại Trở Về Nghèo Khổ Rồi, Đã Thế Lại Còn Giá Rét Thấu Xương Nữa, Ai Mà Chịu Nổi Được?\n\n> **Nhân Vật Đồng Hành:** Qiqi\n> **Vật May Mắn:** ${item}`
            else if(rng<=92.4)
                result = `<a:LYG_Star:1084085189174632538> **Rare Entry 4a**\n> **Nội Dung Thẻ:** Bạn Có Người Giàu Phú Quý Phù Trợ, Đến Từ Phương Bắc Sao? Bạn Có Chắc Chắn Về Độ Tin Cậy Đấy Chứ?\n\n> **Nhân Vật Đồng Hành:** Tartaglia\n> **Vật May Mắn:** ${item}`
            else if(rng<=93.6)
                result = `<a:LYG_AyameSlam:1084085216873807915> **Rare Entry 4b**\n> **Nội Dung Thẻ:** Bói Toán Bằng Chiêm Tinh Đã Cho Thấy, Hôm Nay Bạn Thực Sự Không Hề Thích Hợp Cho Việc Ra Ngoài Cả\n\n> **Nhân Vật Đồng Hành:** Mona\n> **Vật May Mắn:** ${item}`
            else if(rng<=94.8)
                result = `<a:LYG_Star:1084085189174632538> **Rare Entry 5a**\n> **Nội Dung Thẻ:** Bôn Ba Trong Gió Nơi Đất Khách Quê Người, Chân Trần Thấm Đượm Những Câu Chuyện Xưa, Bạn Đi Đâu Trên Khắp Thế Giới Này, Có Khi Bạn Sẽ May Mắn Gặp Được Tôi...\n\n> **Nhân Vật Đồng Hành:** Kaedehara Kazuha\n> **Vật May Mắn:** ${item}`
            else if(rng<=96)
                result = `<a:go_AyameSlam:1006943809613090816> **Rare Entry 5b**\n> **Nội Dung Thẻ:** Áp Lực Công Việc Khiến Bạn Không Thể Chăm Lo Cho Việc Mà Bạn Muốn, Điều Đó Bạn Cũng Đừng Lo, Hãy Tận Tâm Mà Làm Những Gì Có Thể Nhé!\n\n> **Nhân Vật Đồng Hành:** Jean\n> **Vật May Mắn:** ${item}`
    //TYPE 3 ENTRY: RNG ITEM: TRUE/IMG_URL: TRUE
            else if(rng<=96.75){
                result  = '<:LYG_VentiYay:1084085455160619031> **Lời Chúc Phúc Từ Venti**\n> **Nội Dung Thẻ:** "Hạt Giống Câu Chuyện Đến Từ Gió, Thời Gian Làm Nó Nảy Mầm" Chúc Bạn Luôn Có Một Cuộc Hành Trình Thuận Lợi, Phong Thần Tôi, Sẽ Luôn Phù Hộ Bạn, Cho Dù Bạn Ở Bất Cứ Đâu, Ehe\n\n> **Nhân Vật Đồng Hành:** Venti\n> **Vật May Mắn:** `Hoa Cecilia`'
                img_url = 'https://media.discordapp.net/attachments/1081836333682667661/1083359783643521044/Venti.gif'
            }    
            else if(rng<=97.5){
                result = '<:LYG_ZhongliSip:1084085449376665751> **Lời Khuyên Từ Zhongli**\n> **Nội Dung Thẻ:** "Muốn Mua Hoa Quế Cùng Rượu Ngon... Chỉ Tiếc Là Không Biết Đến Bao Giờ Mới Gặp Lại Bạn Hiền?" Dù Bạn Có Ở Đâu, Đi Xa Hay Chăng Nữa, Thì Những Kí Ức, Những Kỉ Niệm Đẹp Này, Tôi Vẫn Sẽ Ghi Mãi Trong Lòng, Và Bạn Cũng Vậy, Đừng Có Quên Đi Những Kỉ Niệm Đẹp Ấy Là Được, Và Cả "Khế Ước" Nữa...\n\n> **Nhân Vật Đồng Hành:** Zhongli\n> **Vật May Mắn:** `Thạch Phách`'
                img_url = 'https://media.discordapp.net/attachments/1081836333682667661/1083361042463207464/Zhongli.gif'
            }
            else if(rng<=98.25){
                result = '<:LYG_EiSkillIssue:1084085443819216966> **Nỗi Niềm Của Ei**\n> **Nội Dung Thẻ:** Kitsune Saiguu Từng Nói: "Vứt Bỏ Những Cố Chấp Nơi Trần Thế Xô Bồ, Chỉ Để Thay Đổi Sự Trói Buộc Của Luân Hồi Sinh Tử. Không Thấu Hiểu Người Khác, Cũng Chẳng Màng Người Khác Nhìn Thấu Mình... Raiden Shogun, Thật Sự Là Một Người Rất Mâu Thuẫn.", Chính Cái Sự Mâu Thuẫn Đó Lại Khiến Cho Con Dân Lo Sợ, Mặc Dù Vậy, Tôi Vẫn Sẽ Cố Gắng Thay Đổi Bản Thân, Suy Nghĩ Lại Về "Vĩnh Hằng" Để Bạn Có Thể Yên Lòng Được Rồi...\n\n> **Nhân Vật Đồng Hành:** Raiden Shogun\n> **Vật May Mắn:** `Sữa Dango`'
                img_url = 'https://cdn.discordapp.com/attachments/1081836333682667661/1083364038832037888/Raiden_Shogun.gif'
            }
            else if(rng<=99){
                result = '<:LYG_NahidaThink:1084085439826251788> **Chia Sẻ Của Nahida**\n> **Nội Dung Thẻ:** "Những Gì Bạn Chứng Kiến Được Trong Chuyến Hành Trình Đúng Là Hay Hơn Những Kiến Thức Mà Tôi Biết, Hơn Nữa Khi Tôi Đặt Câu Hỏi Cũng Sẽ Được Giải Đáp Tận Tình Nữa… Đúng Là Mãn Nguyện. Thôi Nào, Đừng Lãng Phí Thời Gian Nữa, Chúng Ta Tiếp Tục Thôi." Có Thể Lời Khuyên Ấy Của Tôi Sẽ Giúp Bạn Có Cái Nhìn Mới Về Cách Phân Bổ Thời Gian Sau Này...\n\n> **Nhân Vật Đồng Hành:** Nahida\n> **Vật May Mắn:** `Sen Kalpalata`'
                img_url = 'https://media.discordapp.net/attachments/1081836333682667661/1083367576601624627/Nahida.gif'
            }
    //TYPE 4 ENTRY: RNG ITEM: FALSE/IMG_URL: TRUE
            else if(rng<=99.3){
                result = '<:LYG_FubukiPing1:1084085915368050788> **Thẻ Từ Kitsunezi**\n> **Nội Dung Thẻ:** Chà Chà, Số Bạn Chắc Cũng Phải Gọi Là Có Duyên, Gọi Tui Lên Được Chắc Cũng Gọi Là Một Sự Trùng Hợp Ngẫu Nhiên Nào Đó, Nhỉ? Muốn Tìm Hiểu Sâu Hơn Về Tui Ư? Tui Nghĩ Là Chưa Phải Là Lúc Đâu Nhé!\n\n> **Nhân Vật Đồng Hành:** Kitsunezi\n> **Vật May Mắn:** `Gậy Trừ Tà Của Miko`'
                img_url = 'https://cdn.discordapp.com/attachments/1075642010347786281/1081228870344261693/Kitsunezi_Full_Body_March_2023.png'
            }
            else if(rng<=99.6){
                result = '<a:LYG_Butterfly:1084085919210012722> **???????**\n> **Nội dung thẻ:** **~~3~~RR~~0~~R 403**\n\n> **Nhân Vật Đồng Hành:** 7R0V0 The Forbidden Soul\n> **Vật May Mắn:** `...`'
                img_url = 'https://steamuserimages-a.akamaihd.net/ugc/90472493366823952/9AE061717B44506050E8D1AA5BAD3E51BCAD1185/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
            }
            else if(rng<=99.9){
                result = '<a:LYG_Flower:1084085922670325842> **A Great Day!**\n> **Nội Dung Thẻ:** Yo, Sao Lại Tìm Được Tôi Ở Nơi Này Thế. Kì Lạ Nhỉ nhưng Cũng Có Thể Một Cuộc Gặp Định Mệnh.Dù Sao Cũng Tìm Được Tôi, Tôi Cũng Cho Một Món Quà Đặc Biệt Cho Bạn. Muốn Làm Thân À?\n\n> **Nhân Vật Đồng Hành:** Mari Lemon\n> **Vật May Mắn:** `Special Lemon`'
                img_url = 'https://media.discordapp.net/attachments/1081836333682667661/1083406879767666819/419da02f2d2db6e01901f653e564b7c6.jpg'
            }
    //TYPE 5 ENTRY: RNG ITEM: FALSE/IMG_URL: TRUE/BONUS: DMS
            else if(rng<=99.95){
                result = '<a:LYG_FubukiWhat:1084085930266218556> **Kitsunezi: Bí Mật Giữa Đôi Ta**\n> **Nội Dung Thẻ:** Theo Mô Tả Từ Tui "Là Một Nàng Cáo Tuyết Từ Đâu Xuất Hiện, Không Ai Rõ Về Backstory Của Tui..." Và Tui Đến Tận Bây Giờ Vẫn Giữ Thành Kiến Như Vậy... Huh? Bạn Chắc Cũng Đủ Điều Kiện Để Nghe Rồi Nhỉ? Nào, Ngồi Xuống Đi, Tui Sẽ Kể Lại Cho Bạn Nghe Backstory Của Tui... (Xem Tiếp Nhá)\n\n> **Nhân Vật Đồng Hành:** Kitsunezi\n> **Vật May Mắn:** `Bùa Hộ Mệnh Của Hồ Ly`'
                img_url = 'https://cdn.discordapp.com/attachments/1075642010347786281/1081229261882523688/Kitsunezi_Official_Avt_March_2023.png'
            }
            else{
                result = '<:LYG_OkayuYay:1084085932254298122> **Lazy Gang: Cảm Ơn Bạn!!!**\n> **Nội Dung Thẻ:** Chúc Mừng Bạn Đã Mở Được Thẻ Có Tỉ Lệ Thấp Nhất Trong Server Này Với `0.05%` Tỉ Lệ!!! Với Thẻ Này, Bạn Sẽ Được Xem Bí Mật Trước Kia Của Server Này (Tuy Vô Dụng Nhưng Xem Tiếp Nhá!)\n\n> **Nhân Vật Đồng Hành:** LYG Bot#5189\n> **Vật May Mắn:** `CHÍNH BẢN THÂN BẠN!!!`'
                img_url = 'https://media.discordapp.net/attachments/993475207828361266/1061636491702435860/png_20221122_230528_0000.png'
            }
    //EMBED TYPE 5 ENTRY
        if(rng>99.9 && rng <= 99.95) {
            const KitsuneziEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle(`<:LYG_FubukiPain:1084085934926069823> **Kitsunezi's Backstory**`)
                .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
                .setDescription('> *Kitsunezi - "A New Beginning, A New Journey"*\n\n> Trước Khi Tui Nhận Thức Được Bản Thân Là Nàng Cáo Tuyết Ở Một Ngôi Đền Thần, Tui Cũng Sống Yên Bình Như Bao Người Khác, Chỉ Khổ Nỗi Một Chỗ Tui Là Người Hướng Nội, Không Thích Quan Tâm Đến Cuộc Sống Cho Lắm... Nhưng Đến Một Ngày Nọ, Khi Tui Dạo Chơi Ở Một Núi Tuyết Nào Đó (Cũng Lâu Lắm Rồi, Cũng Không Nhớ Nữa), Tui Gặp Được Một Nàng Hồ Ly, Nhìn Cũng Như Hình Dạng Của Tui Hiện Tại Vậy Á, Cô Ấy Muốn Nói Là Cần Đệ Tử Chân Chính Kế Thừa Sự Nghiệp, Với Cái Tật Simp Không Dùng Não, Tui Đã Đồng Ý Ngay Và Luôn Không Do Dự Điều Kiện, Và Thế Là Nàng Hồ Ly Ấy Đồng Ý, Chấp Thuận Bởi Vì Ngay Cả Ngọn Núi Ấy Cũng Chỉ Có Theo Lời Cô Ấy Nói Cũng Chỉ Có Mình Bạn Biết Mà Thôi, Sau Đó, Tui Mất Đi Ý Thức, Lúc Tỉnh Dậy Thấy Trong Tay Là Gậy Trừ Tà Của Miko, Bùa Hộ Mệnh Của Hồ Ly, Nhìn Lại Bộ Đồ Tui Mặc Sao Lại Giống Miko Đền Thần Thế Này? Tui Ra Hồ Nước Gần Đó Nhìn Bản Thân Mình... "Trời, Đấy Là Bản Thân Mình Bây Giờ Đây Ư?" Tui Không Hoảng Loạn, Mà Bình Tĩnh Quan Sát Khắp Nơi Xem Nhưng Không Thấy Ngọn Núi Và Nàng Hồ Ly Hôm Ấy Đâu, Thế Là Tui Đã Sống Dưới Sự Kế Thừa Của Nàng Hồ Ly Hôm Ấy Và Mãi Là Như Vậy Cho Đến Khi Có Người Kế Thừa Ý Chí Của Tui... ')
                .setTimestamp(Date.now())
                .setImage(img_url)
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
            }
        if(rng>99.95 && rng <= 100){    
            const LYGEmbed = new EmbedBuilder()
                .setColor('Yellow')
                .setTitle(`<a:LYG_Planet:1084085941821513789> **LYG's Secret**`)
                .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
                .setDescription('> *Bí Mật Của Server LYG Được Tiết Lộ Bởi `Kitsunezi#2905`*\n\n> Vào Thời 2020, Trước Khi Thành Lập LYG, Cũng Trước Khi Biết Đến Mọi Người Trong Server, Thì Chủ Server, Tức Là <@751225225047179324>, Đã Cùng Với <@747664833423343677> Thành Lập Nên `Ice Team` (Qua 2021 Đổi Thành `Kono Ice`...\n> Nhưng Rồi Bi Kịch Đã Xảy Đến... Vụ Việc Drama Lớn Giữa Server Với Server Lớn Hơn Dẫn Đến Phải Giải Tán `Kono Ice` Vào Cuối Năm 2021...\n> Thế Là, `Lazy Gang` Chính Thức Được Thành Lập, Và <@747664833423343677> Đã Từ Chức, Để Lại Cho <@751225225047179324> Giữ Chức Vụ Cùng Với <@888738277044133899> Làm Owner Cho Đến Bây Giờ...\n> Kết Quả Cuối Cùng Là: Server Không Còn Náo Nhiệt Như Xưa Nữa, Chỉ Muốn Hồi Sinh Server Lại Thôi Mà Cũng Khó...\n> -Kitsunezi-')
                .setTimestamp(Date.now())
                .setImage(img_url)
                .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});
        }
    //EMBED GỐC ENTRY
        const embed = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle(`**<:LYG_Omikuji:1084322622491344937> Đền Thần - Rút Quẻ Hàng Ngày**`)
            .setAuthor({ name: 'LYG Bot#5189', iconURL: 'https://images-ext-1.discordapp.net/external/dDSr9ZFmlXp54AiCmfU3IxWk3MNZJprYwKOiw6GJdlo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1061527111829041242/8d17657d432afefb163bc17ab15af205.png'})
            .setDescription(result)
            .setTimestamp(Date.now())
            .setImage(img_url)
            .setFooter({ text: 'Bot Được Tạo Bởi: Kitsunezi#2905 (2023 - 2023)', iconURL: 'https://cdn.discordapp.com/attachments/962948410472816650/1084078406561443900/Kitsunezi_March_2023.png'});     
        await interaction.reply({
            embeds: [embed],
            });
        if(rng>99.9&&rng<=99.95) {
            await wait(5000);
            await interaction.followUp({
                embeds: [KitsuneziEmbed],
                ephemeral: true,
            });
        }
        else if(rng>99.95 && rng <= 100) {
            await wait(5000);
            await interaction.followUp({
                embeds: [LYGEmbed],
                ephemeral: true,
            });
        }
    console.log('========================================\nTổng Item Rng: ',rngitemlist.length,'\nID Item Rng: ',item_rng,'\nTên Item Rng:',item,'\nSố Encounter: ',rng,'\n========================================')
    },
};
