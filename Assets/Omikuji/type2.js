const items = require('../Omikuji/itemarr')
const itemlist = items
const item_rng = Math.floor(Math.random() * itemlist.length)
const item = itemlist[item_rng]
const Type2Entries = [
    [
        `<a:LYG_Star:1084085189174632538> **Vận Mệnh Hiếm - Tiên Hồ**\n> **Nội Dung Thẻ:** Chà, Bạn Đến Đền Narukami Để Rút Quẻ Sao? Đừng Lo, Bạn Đã Nhận Được Phù Hộ Của Loài Cáo Rồi Nhé, Chắc Chắn Bạn Sẽ Gặp May Thôi!\n\n> **Nhân Vật Đồng Hành:** Yae Miko\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_AyameSlam:1084085216873807915> **Vận Mệnh Hiếm - Tử Định Thùy**\n> **Nội Dung Thẻ:** Bạn Ra Đường Bạn Bị Sét Đánh Ư? Công Nhận, Số Bạn Sao Nó Đen Thế, Hay Là Bạn Gặp Trúng Waifu Nhưng Bạn Bội Bạc Cô Ấy?\n\n> **Nhân Vật Đồng Hành:** Keqing\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Star:1084085189174632538> **Vận Mệnh Hiếm - Dẫn Điệp**\n> **Nội Dung Thẻ:** Không Phải Cuộc Sống Của Ai Nó Cũng Tẻ Nhạt Vậy Đâu, Bạn Thấy Đấy, Đôi Lúc Đám Tang Không Phải Là Sự Đau Thương, Mà Là Dịp Để Ta Hướng Tới Tương Lai Một Cách Mạnh Mẽ Hơn...\n\n> **Nhân Vật Đồng Hành:** Hu Tao\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_AyameSlam:1084085216873807915> **Vận Mệnh Hiếm - Dạ Hiêu**\n> **Nội Dung Thẻ:** "Làm Một Ly Matcha Cho Nó Matme Nào"\n\n> **Nhân Vật Đồng Hành:** Diluc\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Star:1084085189174632538> **Vận Mệnh Hiếm - Tuyết Hạc**\n> **Nội Dung Thẻ:** Khi Nhắc Đến Sự Điềm Tĩnh Và Cao Quý, Chắc Hẳn Bạn Đã Có Trong Mình Một Câu Trả Lời Thích Đáng Rồi Nhỉ? Thật Vậy, Tôi Luôn Muốn Cùng Bạn Trên Hành Trình Này, Vậy Xin Chiếu Cố Nhé!\n\n> **Nhân Vật Đồng Hành:** Kamisato Ayaka\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_AyameSlam:1084085216873807915> **Vận Mệnh Hiếm - Tam Thanh Linh**\n> **Nội Dung Thẻ:** Nỗi Đau Này Ai Thấu Được, Thôi... Bạn Lại Trở Về Nghèo Khổ Rồi, Đã Thế Lại Còn Giá Rét Thấu Xương Nữa, Ai Mà Chịu Nổi Được?\n\n> **Nhân Vật Đồng Hành:** Qiqi\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Star:1084085189174632538> **Vận Mệnh Hiếm - Kình Thiên**\n> **Nội Dung Thẻ:** Bạn Có Người Giàu Phú Quý Phù Trợ, Đến Từ Phương Bắc Sao? Bạn Có Chắc Chắn Về Độ Tin Cậy Đấy Chứ?\n\n> **Nhân Vật Đồng Hành:** Tartaglia\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_AyameSlam:1084085216873807915> **Vận Mệnh Hiếm - Ánh Thiên**\n> **Nội Dung Thẻ:** Bói Toán Bằng Chiêm Tinh Đã Cho Thấy, Hôm Nay Bạn Thực Sự Không Hề Thích Hợp Cho Việc Ra Ngoài Cả\n\n> **Nhân Vật Đồng Hành:** Mona\n> **Vật May Mắn:** ${item}`,
        `<a:LYG_Star:1084085189174632538> **Vận Mệnh Hiếm - Phong Đỏ**\n> **Nội Dung Thẻ:** Bôn Ba Trong Gió Nơi Đất Khách Quê Người, Chân Trần Thấm Đượm Những Câu Chuyện Xưa, Bạn Đi Đâu Trên Khắp Thế Giới Này, Có Khi Bạn Sẽ May Mắn Gặp Được Tôi...\n\n> **Nhân Vật Đồng Hành:** Kaedehara Kazuha\n> **Vật May Mắn:** ${item}`,
        `<a:go_AyameSlam:1006943809613090816> **Vận Mệnh Hiếm - Ấu Sư**\n> **Nội Dung Thẻ:** Áp Lực Công Việc Khiến Bạn Không Thể Chăm Lo Cho Việc Mà Bạn Muốn, Điều Đó Bạn Cũng Đừng Lo, Hãy Tận Tâm Mà Làm Những Gì Có Thể Nhé!\n\n> **Nhân Vật Đồng Hành:** Jean\n> **Vật May Mắn:** ${item}`,
        `<:Reimu_Money:1110239685017612318> **Vận Mệnh Hiếm - Yin Yang Orb**\n> **Nội Dung Thẻ:** Bạn Dễ Tính, Hay Tò Mò, Nghiêm Túc, Lạc Quan, Nhưng Lâu Lâu Cũng Hơi Quá Mức... Có Lẽ, Bạn Cũng Cần Cân Bằng Một Chút Về Khả Năng Mà Bạn Có Được\n\n\> **Bạn Đã Gặp** Hakurei Reimu Trong Chuyến Hành Trình Này...`,
        `<:MarisaHappy:1152871855514984460> **Vận Mệnh Hiếm - Mini-Hakkero**\n> **Nội Dung Thẻ:** Bạn Thẳng Thắn, Tự Tin Về Chính Bản Thân Mình, Nhưng Đôi Lúc Bạn Cũng Là Người Khá Là Thái Độ. Có Lẽ, Chính Thái Độ Đó Tạo Nên Sự Thú Vị Của Bạn, Nhỉ?\n\n> **Bạn Đã Gặp** Kirisame Marisa Trong Chuyến Hành Trình Này...`,
        `<:SakuyaHug:1152870215336611851> **Vận Mệnh Hiếm - Knives And Clock**\n> **Nội Dung Thẻ:** Phong Thái Bí Ẩn Cùng Sự Điềm Tĩnh Cũng Như Cách Xử Lí Vấn Đề Tinh Tế, Thanh Lịch Mà Cũng Tao Nhã Và Nhẹ Nhàng, Có Khi Nào Bạn Đủ Tư Cách Để Làm Quản Gia Hay Hầu Gái Cho Một Biệt Thự Nào Đó Không Nhỉ?\n\n> **Bạn Đã Gặp** Izayoi Sakuya Trong Chuyến Hành Trình Này...`,
        `<:SanaeSparkle:1152875383293743184> **Vận Mệnh Hiếm - God's Descendant**\n> **Nội Dung Thẻ:** Tính Cách Thẳng Thắn, Tự Tin, Lâu Lâu Hơi Tự Tin Quá Mức, Bạn Luôn Tin Vào Phép Màu Hay Tồn Tại, Cũng Đủ Để Chứng Minh Bạn Luôn Có Một Tinh Thần Lạc Quan Ở Trong Cuộc Sống Dù Có Nhiều Khó Khăn Này.\n\n> **Bạn Đã Gặp** Kochiya Sanae Trong Chuyến Hành Trình Này...`,
        `<:youmuIrritated:1167060667929460800> **Vận Mệnh Hiếm - Half Phantom**\n> **Nội Dung Thẻ:** Tính Cách Tập Trung Và Thẳng Thắn Đủ Cho Thấy Sự Quyết Tâm Của Bạn Trên Một Lĩnh Vực Nào Đó. Bạn Chăm Chỉ Luyện Tập Thì Dễ Đến Với Sự Thành Công... À Mà Đây Là Tập Luyện Kiếm Thuật, Chắc Bạn Thay Được Thành Lĩnh Vực Khác Nhỉ?\n\n> **Bạn Đã Gặp** Konpaku Youmu Trong Chuyến Hành Trình Này...`,
    ],
    [
        `Vận Mệnh Hiếm - Tiên Hồ`,
        `Vận Mệnh Hiếm - Tử Định Thùy`,
        `Vận Mệnh Hiếm - Dẫn Điệp`,
        `Vận Mệnh Hiếm - Dạ Hiêu`,
        `Vận Mệnh Hiếm - Tuyết Hạc`,
        `Vận Mệnh Hiếm - Tam Thanh Linh`,
        `Vận Mệnh Hiếm - Kình Thiên`,
        `Vận Mệnh Hiếm - Ánh Thiên`,
        `Vận Mệnh Hiếm - Phong Đỏ`,
        `Vận Mệnh Hiếm - Ấu Sư`,
        `Vận Mệnh Hiếm - Yin Yang Orb`,
        `Vận Mệnh Hiếm - Mini-Hakkero`,
        `Vận Mệnh Hiếm - Knives And Clock`,
        `Vận Mệnh Hiếm - God's Descendant`,
        `Vận Mệnh Hiếm - Half Phantom`,
    ],
]
module.exports = (Type2Entries)