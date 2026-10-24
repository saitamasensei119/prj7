// Dữ liệu mẫu ban đầu (Seed Data) cho Sen Đá House
// Tối ưu chạy 100% offline & client-side trên GitHub Pages

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Sen Đá Kim Cương Dạ Quang",
    scientificName: "Haworthia Cooperi var. truncata",
    category: "sen-da",
    categoryName: "Sen Đá Độc Lạ",
    price: 85000,
    originalPrice: 110000,
    rating: 4.9,
    reviewsCount: 128,
    sold: 432,
    stock: 25,
    tag: "Bán chạy nhất",
    difficulty: "Dễ chăm",
    light: "Ánh sáng tán xạ mát, 3-4h/ngày",
    water: "Tưới 1 lần/tuần đẫm gốc",
    size: "6 - 8 cm",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Lá căng mọng trong suốt như pha lê, bắt sáng cực đẹp khi để trên bàn làm việc.",
    description: "Sen đá Kim Cương (Haworthia Cooperi) có những 'cửa sổ lá' trong suốt như ngọc. Cây rất chuộng ánh sáng dịu nhẹ, chịu bóng râm tốt nên là lựa chọn số 1 cho góc máy tính, văn phòng máy lạnh."
  },
  {
    id: 2,
    name: "Sen Đá Nâu (Black Prince)",
    scientificName: "Echeveria 'Black Prince'",
    category: "sen-da",
    categoryName: "Sen Đá Búp",
    price: 45000,
    originalPrice: 60000,
    rating: 4.8,
    reviewsCount: 95,
    sold: 560,
    stock: 40,
    tag: "Cực dễ sống",
    difficulty: "Rất dễ chăm",
    light: "Nắng trực tiếp 4-5h/ngày",
    water: "Tưới khi đất khô hoàn toàn (5-7 ngày/lần)",
    size: "7 - 9 cm",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Cánh hoa xếp tròn đều màu chocolate trầm ấm, tượng trưng cho tình bạn bền vững.",
    description: "Sen đá Nâu có sức sống mãnh liệt, ít sâu bệnh. Khi được phơi nắng đủ, viền lá sẽ chuyển sang màu nâu sô cô la đậm quý phái."
  },
  {
    id: 3,
    name: "Sen Đá Phật Bà",
    scientificName: "Sempervivum Calcareum",
    category: "sen-da",
    categoryName: "Sen Đá Búp",
    price: 65000,
    originalPrice: 85000,
    rating: 5.0,
    reviewsCount: 74,
    sold: 289,
    stock: 18,
    tag: "Phong thủy may mắn",
    difficulty: "Trung bình",
    light: "Nắng sớm hoặc nắng chiều nhẹ",
    water: "Tưới quanh mép chậu 1-2 lần/tuần",
    size: "8 - 10 cm",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Hàng chục lớp cánh nhỏ xếp tầng như đài sen của Bồ Tát, mang lại bình an, che chở.",
    description: "Được mệnh danh là biểu tượng của sự may mắn, bình an cho gia chủ. Đỉnh mỗi đầu cánh sen có chấm màu tím đỏ kiêu hãnh."
  },
  {
    id: 4,
    name: "Sen Đá Ngọc Bích (Cây May Mắn)",
    scientificName: "Crassula Ovata",
    category: "sen-da",
    categoryName: "Cây Tài Lộc",
    price: 75000,
    originalPrice: 95000,
    rating: 4.9,
    reviewsCount: 110,
    sold: 378,
    stock: 22,
    tag: "Hút tài lộc",
    difficulty: "Rất dễ chăm",
    light: "Ánh sáng vừa đến nắng nhẹ",
    water: "Tưới 1 lần/tuần",
    size: "10 - 12 cm",
    image: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Lá xanh mướt như ngọc bích, thân mọng nước, mang năng lượng phong thủy tích cực.",
    description: "Cây Ngọc Bích (Jade Plant) trong văn hóa Á Đông đại diện cho sự sung túc, phú quý. Rất thích hợp đặt quầy thu ngân hoặc bàn làm việc."
  },
  {
    id: 5,
    name: "Sen Đá Móng Rồng Kẻ Trắng",
    scientificName: "Haworthia Fasciata (Zebra Plant)",
    category: "sen-da",
    categoryName: "Sen Đá Độc Lạ",
    price: 55000,
    originalPrice: 70000,
    rating: 4.8,
    reviewsCount: 88,
    sold: 410,
    stock: 30,
    tag: "Lọc không khí",
    difficulty: "Rất dễ chăm",
    light: "Để trong nhà hoặc văn phòng tốt",
    water: "7-10 ngày tưới 1 lần",
    size: "6 - 8 cm",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Lá nhọn vuốt sọc trắng nổi bật như lưng ngựa vằn, có khả năng hút bức xạ máy tính.",
    description: "Móng Rồng là một trong những loại cây để bàn bền bỉ nhất thế giới. Dù bạn có quên tưới nước 2 tuần cây vẫn xanh tốt khỏe khoắn."
  },
  {
    id: 6,
    name: "Sen Đá Hồng Phấn (Echeveria Laui)",
    scientificName: "Echeveria Laui",
    category: "sen-da",
    categoryName: "Sen Đá Búp",
    price: 120000,
    originalPrice: 150000,
    rating: 5.0,
    reviewsCount: 42,
    sold: 115,
    stock: 9,
    tag: "Bản đặc biệt",
    difficulty: "Trung bình",
    light: "Nắng nhẹ buổi sáng, thoáng gió",
    water: "Tưới đáy chậu, không ướt phấn lá",
    size: "7 - 9 cm",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Dòng sen đá quý phái phủ lớp phấn trắng tinh khôi, ánh phớt hồng dịu ngọt.",
    description: "Echeveria Laui được mệnh danh là 'Nữ hoàng sen đá'. Cây khoác lớp phấn tự nhiên bảo vệ lá, dáng tròn đầy đặn tuyệt mỹ."
  },
  {
    id: 7,
    name: "Xương Rồng Tai Thỏ Mini",
    scientificName: "Opuntia Microdasys",
    category: "xuong-rong",
    categoryName: "Xương Rồng",
    price: 49000,
    originalPrice: 65000,
    rating: 4.9,
    reviewsCount: 160,
    sold: 670,
    stock: 35,
    tag: "Siêu đáng yêu",
    difficulty: "Rất dễ chăm",
    light: "Nắng trực tiếp 4-6h/ngày",
    water: "10-14 ngày tưới 1 lần",
    size: "8 - 12 cm",
    image: "https://lacay.vn/wp-content/uploads/xuong-rong-tai-tho-3.png",
    gallery: [
      "https://lacay.vn/wp-content/uploads/xuong-rong-tai-tho-3.png"
    ],
    shortDesc: "Các nhánh mọc đối xứng như đôi tai thỏ ngộ nghĩnh, điểm gai vàng êm ái.",
    description: "Xương rồng Tai Thỏ có hình dáng vô cùng dễ thương, thường được các bạn trẻ chọn làm quà tặng sinh nhật hoặc trang trí kệ sách."
  },
  {
    id: 8,
    name: "Xương Rồng Thanh Sơn (Fairy Castle)",
    scientificName: "Acanthocereus tetragonus",
    category: "xuong-rong",
    categoryName: "Xương Rồng",
    price: 69000,
    originalPrice: 89000,
    rating: 4.8,
    reviewsCount: 82,
    sold: 320,
    stock: 16,
    tag: "Độc đáo",
    difficulty: "Rất dễ chăm",
    light: "Ánh sáng nhiều, thoáng mát",
    water: "10 ngày tưới 1 lần",
    size: "12 - 15 cm",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Các nhánh cây vươn cao trùng điệp như tòa lâu đài cổ tích kỳ bí.",
    description: "Thanh Sơn tượng trưng cho sự kiên định, thăng tiến không ngừng trong công việc và học tập. Cây chịu hạn cực tốt."
  },
  {
    id: 9,
    name: "Combo 4 Chậu Sen Đá Để Bàn Mix",
    scientificName: "Mini Succulent Garden Giftset",
    category: "combo",
    categoryName: "Combo Quà Tặng",
    price: 189000,
    originalPrice: 240000,
    rating: 5.0,
    reviewsCount: 215,
    sold: 520,
    stock: 15,
    tag: "Tiết kiệm 25%",
    difficulty: "Dễ chăm",
    light: "Phù hợp cả trong phòng và ban công",
    water: "Tưới 1 lần/tuần",
    size: "4 chậu x 6cm",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Bao gồm 4 loại sen đá tuyển chọn kèm chậu gốm mộc + tặng kèm sỏi trắng rải mặt.",
    description: "Set quà tặng hoàn hảo dành cho bạn bè, đồng nghiệp mới. Đã phối sẵn 4 dòng sen đá dễ chăm nhất, sẵn sàng bày biện ngay."
  },
  {
    id: 10,
    name: "Chậu Gốm Bát Tràng Men Hỏa Biến",
    scientificName: "Handmade Ceramic Pot",
    category: "phu-kien",
    categoryName: "Chậu & Phụ Kiện",
    price: 35000,
    originalPrice: 45000,
    rating: 4.9,
    reviewsCount: 68,
    sold: 490,
    stock: 50,
    tag: "Thủ công",
    difficulty: "Thoát nước tốt",
    light: "Bền bỉ ngoài trời",
    water: "Có lỗ thoát nước đáy tiêu chuẩn",
    size: "Đường kính 9cm, cao 8cm",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Gốm nung nhiệt độ cao men hỏa biến màu rêu phong mộc mạc, tôn màu sen đá.",
    description: "Chậu gốm đất nung tráng men mộc thoáng khí, rễ sen đá hô hấp cực tốt, tránh hiện tượng úng rễ mùa mưa."
  },
  {
    id: 11,
    name: "Giá Thể SoilMix Chuyên Dụng (Bao 2kg)",
    scientificName: "Premium Succulent & Cactus Soil",
    category: "phu-kien",
    categoryName: "Chậu & Phụ Kiện",
    price: 45000,
    originalPrice: 55000,
    rating: 4.9,
    reviewsCount: 310,
    sold: 1200,
    stock: 80,
    tag: "Khuyên dùng",
    difficulty: "Trộn sẵn 100%",
    light: "Dùng cho mọi loại mọng nước",
    water: "Thoát nước trong 3 giây",
    size: "Bao 2kg (đủ trồng 6-8 chậu)",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Công thức độc quyền gồm đá Perlite, Pumice, Peat moss và phân trùn quế vi sinh.",
    description: "Đất trồng chuẩn tơi xốp, không bết dính. Đảm bảo cây thoát nước nhanh, không bao giờ bị thối nhũn lá."
  },
  {
    id: 12,
    name: "Sen Đá Chuỗi Ngọc Bi Rủ",
    scientificName: "Sedum Burrito (Burro's Tail)",
    category: "sen-da",
    categoryName: "Sen Đá Treo",
    price: 89000,
    originalPrice: 115000,
    rating: 4.8,
    reviewsCount: 56,
    sold: 210,
    stock: 12,
    tag: "Dáng rủ đẹp",
    difficulty: "Trung bình",
    light: "Treo nơi thoáng gió nhiều sáng",
    water: "Tưới khi các hạt hơi nhăn nhẹ",
    size: "Dây rủ 10 - 15 cm",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Từng hạt lá tròn mọng nước xếp kít nhau rủ xuống duyên dáng như chuỗi ngọc lục bảo.",
    description: "Chuỗi Ngọc Bi rất hợp trồng chậu treo ban công hoặc giá sách trên cao. Khi cây phát triển, các chuỗi ngọc xanh biếc buông thõng mềm mại."
  }
];

// Danh sách mã giảm giá mẫu
const INITIAL_COUPONS = [
  { code: "SENXANH10", discountPercent: 10, minOrder: 100000, desc: "Giảm 10% cho đơn từ 100k" },
  { code: "FREESHIP", discountAmount: 30000, minOrder: 150000, desc: "Miễn phí vận chuyển (tối đa 30k)" },
  { code: "CHAOQUAKHACH", discountPercent: 15, minOrder: 200000, desc: "Giảm 15% mừng bạn mới ghé thăm" }
];

// Danh sách đơn hàng mẫu ban đầu để demo trang Admin
const INITIAL_ORDERS = [
  {
    id: "SDH-98214",
    createdAt: "2026-10-23T14:20:00.000Z",
    customer: {
      name: "Nguyễn Thu Hà",
      phone: "0912345678",
      address: "Tòa S2.05 Vinhome Smart City, Nam Từ Liêm, Hà Nội",
      note: "Giao giờ hành chính, gọi trước khi giao"
    },
    items: [
      { id: 1, name: "Sen Đá Kim Cương Dạ Quang", price: 85000, quantity: 2, pot: "Chậu gốm men hỏa biến (+35k)", potDelta: 35000 },
      { id: 11, name: "Giá Thể SoilMix Chuyên Dụng (Bao 2kg)", price: 45000, quantity: 1, pot: "Tiêu chuẩn", potDelta: 0 }
    ],
    couponCode: "SENXANH10",
    discountAmount: 28500,
    shippingFee: 25000,
    total: 281500,
    paymentMethod: "vietqr",
    status: "processing" // 'processing' | 'shipping' | 'completed' | 'cancelled'
  },
  {
    id: "SDH-98188",
    createdAt: "2026-10-22T09:15:00.000Z",
    customer: {
      name: "Trần Minh Quân",
      phone: "0988776655",
      address: "128 Đường D2, P.25, Bình Thạnh, TP. Hồ Chí Minh",
      note: "Đóng gói kỹ giúp mình làm quà tặng"
    },
    items: [
      { id: 9, name: "Combo 4 Chậu Sen Đá Để Bàn Mix", price: 189000, quantity: 1, pot: "Chậu đất nung mộc (+15k)", potDelta: 15000 }
    ],
    couponCode: "FREESHIP",
    discountAmount: 25000,
    shippingFee: 25000,
    total: 204000,
    paymentMethod: "cod",
    status: "completed"
  }
];

// Cấu hình tài khoản ngân hàng nhận VietQR Demo (khách có thể đổi trong settings)
const SHOP_CONFIG = {
  shopName: "Sen Đá House • Cây Cảnh & Vườn Mini",
  hotline: "0987.654.321",
  zaloPhone: "0987654321",
  address: "124 Vườn Cảnh Xanh, Cầu Giấy, Hà Nội",
  bank: {
    bankId: "MB", // MBBank, VCB, ACB, TPB,...
    accountNo: "098765432188",
    accountName: "NGUYEN VAN A (DEMO)"
  }
};
