//Case 1: 2 Key Khác Nhau (Nam/Nữ Hoặc Nữ/Nam)
const Shiprate = [
    [
        '<:OrinWorry:1152868572499034203> • Ai Chà, Vận Mệnh Của Hai Bạn Như Chó Với Mèo Ý, Cãi Nhau Suốt Hoài À, Thôi Né Ra Né Ra Đi, Cả Server Đang Yên Ổn Mà...',
        '<:OrinWorry:1152868572499034203> • Yabe, Hai Người Có Thù Oán Gì Với Nhau Không Thế Hả? Trời Ạ...',
        '<:OrinWorry:1152868572499034203> • Coi Bộ Số Kiếp Này Hai Bạn Không Hợp Nhau Rồi, Thôi Kiếm Người Khác Đi Nhá'
    ],
    [
        '<:LYG_Fubuki_Meh:911512066265862174> • Người Dưng Chốn Xa Lạ, Có Thể Chưa Từng Gặp Nhau, Chắc Là Do Duyên Phận Ha',
        '<:LYG_Fubuki_Meh:911512066265862174> • Hmm... Coi Bộ Hai Người Cũng Chỉ Mới Gặp Nhau Gần Đây, Chưa Quen Lắm, Nhỉ?',
        '<:LYG_Fubuki_Meh:911512066265862174> • Có Vẻ Như, Có Vẻ Như, Các Bạn Có Mối Quan Hệ Không Tốt Lắm Nhỉ?'
    ],
    [
        '<:LaylaHmm:1053640028049387620> • Bạn Bè, Chắc Là Vậy, Mình Nghĩ Hai Bạn Cũng Chỉ Đến Mức Độ Này Thôi Ha',
        '<:LaylaHmm:1053640028049387620> • Nếu Như Hai Bạn Thân Thiết Với Nhau Hơn Nữa Nhỉ... À Mà Thôi, Bạn Bè Với Nhau Thì Phải Trong Sáng Chứ',
        '<:LaylaHmm:1053640028049387620> • Coi Bộ Hai Người Hợp Tác Trên Phương Diện Bạn Bè Cũng Tốt Đấy Chứ Nhỉ?'
    ],
    [
        '<:OkuuWut:1183327798509703289> • Bạn Thân Sao? Nghe Có Vẻ Hợp Đấy, Hòa Thuận Phết Chứ Nhỉ? Chúc Hai Bạn Vui Vẻ Nhé!',
        '<:OkuuWut:1183327798509703289> • Qua Được Mốc Bạn Bè Là Bạn Thân Rồi, Thế Thì... Mong Tình Bạn Của Hai Bạn Mãi Bền Chặt Nhé!',
        '<:OkuuWut:1183327798509703289> • Bao Giờ Bạn Trai Mới Tỏ Tình Bạn Gái Thế? Đùa Thôi, Mức Độ Bạn Thân Này Đã Tốt Lắm Rồi Nhé!'
    ],
    [
        '<:KoishiSleep:1183319017709113456> • Hả? Gì Cơ? Hai Bạn Hợp Nhau Đến Mức Độ Này Cơ Á??? Trời Ạ Sao Không Nói Cho Cả Server Biết?',
        '<:KoishiSleep:1183319017709113456> • Wow, Hai Bạn Hợp Đôi Hợp Tính Thế? Thế Đã Chính Thức Là Người Yêu Của Nhau Chưa?',
        '<:KoishiSleep:1183319017709113456> • Dude, Ông Bạn Ga Lăng Đấy, Gây Dựng Mối Quan Hệ Tốt Phết Cho Đứa Thứ Hai Của Mình Nhỉ? Hehe, Mong Hai Người Vẫn Hợp Nhau Nhé!'
    ],
    [
        '<a:LYG_OkayuLove:1087692048280334347> • Người Tình Đích Thực Là Đây Chứ Đâu? Thế Thì Câu Hỏi Muôn Thuở, Bao Giờ Mới Cưới Nhau Đấy?',
        '<a:LYG_OkayuLove:1087692048280334347> • Thực Tế Cho Thấy Rằng Hai Bạn Rất Hợp Nhau Về Mọi Mặt, Chắc Hẳn Đã Trải Qua Nhiều Sóng Gió Lắm Nhỉ?',
        '<a:LYG_OkayuLove:1087692048280334347> • Ể? À Rế? Hai Bạn Đã Quyết Định Cùng Nhau Đi Đến Hết Cuộc Đời Rồi Á? Giá Mà Mình Được Nhận Thiệp Cưới Từ Hai Bạn Nhỉ...'
    ],
    [
        '#000000',
        'Red',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Red'
    ]
]

/*Shiprate
[0] 0 - 1
[1] 1.1 - 30
[2] 30.1 - 60
[3] 60.1 - 90
[4] 90.1 - 100
[5] 100.1 - 101
[6] Color
*/

module.exports = (Shiprate)