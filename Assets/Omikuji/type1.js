const items = require('../Omikuji/itemarr')
const itemlist = items
const item_rng = Math.floor(Math.random() * itemlist.length)
const item = itemlist[item_rng]
const Type1Entries = [
    [
        `<:LYG_KeqingDoi:1084085049617559553> **Đại Hung**\n> **Nội Dung Thẻ:** Hôm Nay Tướng Mạo Bạn Hơi Xấu, Chắc Chắn Là Có Điềm Báo Không Mấy Tốt Lành Gì Xảy Ra, Làm Ơn Đấy, Hạn Chế Ra Ngoài Hay Tiếp Xúc Đi, Kẻo Lại Mang Rủi Về Bản Thân Bạn!\n\n> **Nhân Vật Đồng Hành:** Bennett\n> **Vật May Mắn:** ${item}`,
        `<:LYG_KeqingDoi:1084085049617559553> **Hung**\n> **Nội Dung Thẻ:** Bạn Ra Đường, Nhưng Lại Gặp Cuộc Cãi Vã, Bạn Về Nhà, Nhận Thấy Đời Nó Đen, Đừng Có Bi Quan Quá, Hãy Lạc Quan Lên Nhé, Xui Nhẹ Thế Này Không Làm Khó Bạn Đâu!\n\n> **Nhân Vật Đồng Hành:** Layla\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Sparkle:1084084997398470747> **Vô Cát**\n> **Nội Dung Thẻ:** Đây Đích Thị Là Một Ngày Bình Thường Đối Với Bạn, Chỉ Cần Bạn Kiên Trì, Thì Mọi Nỗ Lực Của Bạn Cũng Sẽ Được Đền Đáp, Hãy Nhớ Lấy, Đừng Có Lười Biếng À Nha!\n\n> **Nhân Vật Đồng Hành:** Sayu\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Sparkle:1084084997398470747> **Tiểu Cát**\n> **Nội Dung Thẻ:** Hôm Nay Bạn Ra Đường, Bạn Cũng Sẽ Gặp Được Một Chút May Mắn, Có Thể Bạn Sẽ Gặp Lại Được Người Bạn Phương Xa, Cũng Có Thể Là Bạn Cũng Sẽ Thu Hoạch Được Một Chút Kinh Nghiệm Nho Nhỏ Từ Cuộc Sống...\n\n> **Nhân Vật Đồng Hành:** Shikanoin Heizou\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Sparkle:1084084997398470747> **Cát**\n> **Nội Dung Thẻ:** À... Một Ngày Suôn Sẻ Đối Với Bạn Đây Rồi Còn Đâu? Với Độ May Mắn Này, Chắc Bạn Cũng Sẽ Chả Lo Về Chuyện Bao Đồng Hay Là Bị Lừa Đảo Cả, Nhỉ?\n\n> **Nhân Vật Đồng Hành:** Thoma\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Sparkle:1084084997398470747> **Trung Cát**\n> **Nội Dung Thẻ:** Hôm Nay Tướng Mạo Bạn Khá Sáng Sủa, Đi Đâu Cũng Có Thể Gặp Được May Mắn, Đừng Lo Về Chuyện Phó Mặc Cho Thời Tiết Hay Con Đường Bạn Chọn, Chắc Chắn Bạn Sẽ Kiếm Được Lối Đi Về Mà Không Gặp Trở Ngại Gì Cả\n\n> **Nhân Vật Đồng Hành:** Mika\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Sparkle:1084084997398470747> **Đại Cát**\n> **Nội Dung Thẻ:** Hôm Nay (Hoặc Tuần Này) Bạn Sẽ Gặp Cực Kì Nhiều May Mắn Trong Cuộc Sống, Hãy Ra Ngoài Mà Tận Hưởng Đi, Đảm Bảo Rằng Bạn Sẽ Dễ Dàng Gặp Vận May Trong Quãng Thời Gian Sắp Tới Nhá!\n\n> **Nhân Vật Đồng Hành:** Ningguang\n> **Vật May Mắn:** ${item}`,
        `<:LYG_LilyWhite:1183259299355557911> **Đại Hung**\n> **Nội Dung Thẻ:** Huh? Gặp Phải Annoying Fairy Này Rồi Phải Không Đấy? Thôi Đừng Cáu, Kĩ Năng Của Bạn Nó Cũng Chỉ Đến Đó Thôi... Cố Gắng Lên Nhé!\n\n> **Bạn Đã Gặp** Lily White Trong Chuyến Hành Trình Này...`,
        `<:LYG_ClownpieceBleh:1183274564155887666> **Hung**\n> **Nội Dung Thẻ:** Nghe Được Câu "It's LUNATIC Time!" Là Bạn Xác Định Là Né Đạn Hơi Khó Nhằn Rồi Đấy, Đừng Nản Chí, Hãy Tiếp Tục Tiến Lên Và Đến Được Đích Đến Cuối Cùng Nhé!\n\n> **Bạn Đã Gặp** Clownpiece Trong Chuyến Hành Trình Này...`,
        `<:LYG_DaiyouseiWut:1183281072193151058> **Vô Cát**\n> **Nội Dung Thẻ:** Trong Cốt Truyện Chính Thì Bạn Bị Bơ, Bạn Không Có Giá Trị Gì Quá Nổi Trội Cả. Đôi Lúc, Việc Bạn Làm Nền Cũng Góp Phần Làm Hoàn Thiện Câu Chuyện... Và Câu Chuyện Ấy, Mang Tên "Cuộc Sống"\n\n> **Bạn Đã Gặp** Daiyousei Trong Chuyến Hành Trình Này...`,
        `<:LYG_StarSmile:1183280642058899528> **Tiểu Cát**\n> **Nội Dung Thẻ:** Bạn Là Người Thông Minh Trong Đám, Mà Có Tính Nghịch Ngợm, Chắc Hẳn Bạn Cũng Rất Dễ Hòa Đồng Với Nhóm Bạn, Nhỉ? Nếu Vậy Thì, Sao Không Cố Gắng Sử Dụng Khả Năng Của Mình Giúp Ích Cho Những Người Xung Quanh?\n\n> **Bạn Đã Gặp** Star Sapphire Trong Chuyến Hành Trình Này...`,
        `<:LYG_LunaNerd:1183277025696419900> **Cát**\n> **Nội Dung Thẻ:** Bạn Nghịch Ngợm, Nhưng Bạn Lại Thích Sự Yên Tĩnh, Vậy Có Phải Mâu Thuẫn Quá Không Hay Là Bạn Thích Điều Đó? Chắc Có Lẽ Bạn Mới Trả Lời Được Câu Hỏi Này...\n\n> **Bạn Đã Gặp** Luna Child Trong Chuyến Hành Trình Này...`,
        `<:LYG_SunnyMilked:1183275653143994418> **Trung Cát**\n> **Nội Dung Thẻ:** Vừa Có Tố Chất Lãnh Đạo, Vừa Nghịch Ngợm, Chắc Bạn Đây Là Dân Chơi Cừ Khôi Nhỉ? Cháy Phết Đấy Nhỉ? Vậy Thì Đừng Để Vận May Này Hóa Thành Vận Xui Của Bạn Nhé!\n\n> **Bạn Đã Gặp** Sunny Milk Trong Chuyến Hành Trình Này...`,
        `<:LYG_CirnoBaka:1183281225620783154> **Đại Cát**\n> **Nội Dung Thẻ:** Bạn Là Tâm Điểm Của Khá Nhiều Cái Meme, Với Meme Kiểu "Baka Baka... Baka Baka" Này Làm Liên Tưởng Đến "⑨⑨⑨⑨", Nếu Như Bạn Coi Đó Chỉ Là Số "9" Thì "4 Số 9" Đó Là Gì? Lol, Hiểu Ra Chứ?\n\n> **Bạn Đã Gặp** Cirno Trong Chuyến Hành Trình Này...`
    ],
    [
        `Đại Hung (Bennett)`,
        `Hung (Layla)`,
        `Vô Cát (Sayu)`,
        `Tiểu Cát (Shikanoin Heizou)`,
        `Cát (Thoma)`,
        `Trung Cát (Mika)`,
        `Đại Cát (Ningguang)`,
        `Đại Hung (Lily White)`,
        `Hung (Clownpiece)`,
        `Vô Cát (Daiyousei)`,
        `Tiểu Cát (Star Sapphire)`,
        `Cát (Luna Child)`,
        `Trung Cát (Sunny Milk)`,
        `Đại Cát (Cirno)`
    ]
]

module.exports = (Type1Entries)