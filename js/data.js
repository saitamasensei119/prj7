// Dữ liệu mẫu (Seed Data) cho HTX Nông Nghiệp Sen Bách Liên
// Thương hiệu: Bách Liên - "Hương sen quê Bác"
// Địa chỉ: Xã Kim Liên, Huyện Nam Đàn, Tỉnh Nghệ An
// 100% Client-side, không cần CSDL, tối ưu cho GitHub Pages

const INITIAL_PRODUCTS = [
  // ==========================================
  // 4 SẢN PHẨM OCOP 4 SAO (DÒNG THƯỢNG HẠNG)
  // ==========================================
  {
    id: 1,
    name: "Trà Tâm Sen (Tim Sen) Sấy Lạnh",
    scientificName: "Embryo Nelumbinis",
    category: "tra-sen",
    categoryName: "Trà Sen Thượng Hạng",
    ocopStars: 4,
    price: 145000,
    originalPrice: 180000,
    rating: 4.9,
    reviewsCount: 184,
    sold: 860,
    stock: 45,
    tag: "OCOP 4 Sao • Bán chạy nhất",
    origin: "Xã Kim Liên, Nam Đàn, Nghệ An (Đầm Sen Quê Bác)",
    processMethod: "Sấy lạnh khép kín Lio-Pharm (Giữ trọn màu xanh ngọc)",
    packing: "Hũ thủy tinh nắp gỗ 100g",
    packingOptions: [
      { name: "Hũ thủy tinh nắp gỗ 100g", priceDelta: 0, desc: "Bảo quản kín, sang trọng để bàn" },
      { name: "Hộp thiếc cao cấp 250g (+120.000đ)", priceDelta: 120000, desc: "Hộp quà biếu tri ân đối tác" }
    ],
    usage: "Dùng 3-5g tâm sen hãm với 250ml nước sôi 90°C trong 3-5 phút. Uống ấm trước khi ngủ 45 phút.",
    benefits: [
      "Hỗ trợ hạ huyết áp, an thần định trí",
      "Điều trị mất ngủ kinh niên, giúp giấc ngủ sâu và êm ái",
      "Thanh nhiệt giải độc, giảm bốc hỏa cho người lớn tuổi"
    ],
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Tâm sen Kim Liên tuyển chọn thủ công, công nghệ sấy lạnh giữ nguyên màu xanh ngọc và dược tính an thần quý giá.",
    description: "Tâm sen Bách Liên được thu hái từ giống sen hồng bách diệp cổ truyền tại vùng đất Kim Liên, Nam Đàn. Trải qua quy trình bóc tách thủ công tỉ mỉ và sấy lạnh chân không ở nhiệt độ thấp, từng búp tâm sen giữ nguyên vẹn sắc xanh diệp lục, không bị khét đắng như sao nhiệt truyền thống."
  },
  {
    id: 2,
    name: "Hạt Sen Sấy Giòn Nguyên Vị",
    scientificName: "Semen Nelumbinis Crisp",
    category: "nong-san-sen",
    categoryName: "Nông Sản & Hạt Sen",
    ocopStars: 4,
    price: 95000,
    originalPrice: 120000,
    rating: 4.9,
    reviewsCount: 240,
    sold: 1420,
    stock: 60,
    tag: "OCOP 4 Sao • Không dầu",
    origin: "Xã Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Sấy lạnh thăng hoa khép kín (Không chiên qua dầu)",
    packing: "Túi zip tráng bạc 200g",
    packingOptions: [
      { name: "Túi zip tráng bạc 200g", priceDelta: 0, desc: "Giữ giòn xốp, khóa zip tiện lợi" },
      { name: "Hũ nắp nhôm 500g (+110.000đ)", priceDelta: 110000, desc: "Hũ lớn tiết kiệm cho gia đình" }
    ],
    usage: "Dùng ăn trực tiếp làm món ăn vặt thực dưỡng, hoặc dùng cùng trà sen, nấu chè hạt sen.",
    benefits: [
      "100% tự nhiên không dầu mỡ, không cholesterol",
      "Giàu protein thực vật, canxi, phốt pho bồi bổ cơ thể",
      "Tốt cho tim mạch, trẻ nhỏ, phụ nữ mang thai và người ăn kiêng"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsb1y_N8_upd8kH3QZuyQ6VQSkRHLxaT1WUqStgM7ypqFKlHzXW0x6Sic-&s=10",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsb1y_N8_upd8kH3QZuyQ6VQSkRHLxaT1WUqStgM7ypqFKlHzXW0x6Sic-&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsb1y_N8_upd8kH3QZuyQ6VQSkRHLxaT1WUqStgM7ypqFKlHzXW0x6Sic-&s=10"
    ],
    shortDesc: "Hạt sen quê Bác tròn căng, sấy lạnh thăng hoa giòn xốp tự nhiên, vị bùi béo ngọt hậu đậm đà.",
    description: "Hạt Sen Sấy Giòn Bách Liên đạt chuẩn OCOP 4 sao tỉnh Nghệ An. Ứng dụng công nghệ sấy thăng hoa hiện đại giúp hạt sen nở xốp giòn tan mà hoàn toàn không tẩm ướp phụ gia hay chiên ngập dầu, giữ trọn hàm lượng vitamin và khoáng chất tự nhiên."
  },
  {
    id: 3,
    name: "Trà Ướp Bông Sen Tươi Quê Bác",
    scientificName: "Lotus Blossom Infused Tea",
    category: "tra-sen",
    categoryName: "Trà Sen Thượng Hạng",
    ocopStars: 4,
    price: 240000,
    originalPrice: 290000,
    rating: 5.0,
    reviewsCount: 96,
    sold: 510,
    stock: 20,
    tag: "OCOP 4 Sao • Đệ nhất danh trà",
    origin: "Đầm Sen Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Ướp thủ công trực tiếp trong bông sen tươi lúc hừng đông",
    packing: "Hộp 5 bông tươi hút chân không",
    packingOptions: [
      { name: "Hộp 5 bông tươi hút chân không", priceDelta: 0, desc: "Bọc lá sen xanh tươi nguyên vẹn" },
      { name: "Hộp sơn mài 10 bông cao cấp (+220.000đ)", priceDelta: 220000, desc: "Kèm túi giữ nhiệt & hộp quà biếu VIP" }
    ],
    usage: "Rã đông tự nhiên 15 phút, tách các cánh hoa sen lấy trà và gạo sen cho vào ấm. Hãm nước 85-90°C trong 40 giây.",
    benefits: [
      "Hòa quyện hương đất trời quê Bác thanh khiết và sâu lắng",
      "Chất chống oxy hóa tự nhiên cao, tinh thần thư thái nhẹ nhõm",
      "Trải nghiệm nghệ thuật thưởng trà cung đình truyền thống"
    ],
    image: "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/5/12/1505484/A7_Optimized.jpg",
    gallery: [
      "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/5/12/1505484/A7_Optimized.jpg",
      "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/5/12/1505484/A7_Optimized.jpg"
    ],
    shortDesc: "Trà Shan Tuyết Đinh thượng hạng ướp trọn trong đóa sen bách diệp tươi sương sớm, hút chân không từng bông.",
    description: "Được mệnh danh là 'Đệ nhất ẩm thực trà xứ Nghệ', mỗi đóa trà bông sen Bách Liên được những nghệ nhân làng sen chèo xuồng ra đầm lúc 5 giờ sáng, ướp từng lạng trà đinh non vào giữa nhụy hoa lúc cánh vừa hé mở đón sương mai, bọc kín bằng lá sen tươi và cấp đông nhanh chuẩn ISO."
  },
  {
    id: 4,
    name: "Trà Liên Tu (Râu Sen Cổ Truyền)",
    scientificName: "Stamen Nelumbinis",
    category: "tra-sen",
    categoryName: "Trà Sen Thượng Hạng",
    ocopStars: 4,
    price: 175000,
    originalPrice: 220000,
    rating: 4.8,
    reviewsCount: 78,
    sold: 390,
    stock: 25,
    tag: "OCOP 4 Sao • Dược liệu quý",
    origin: "Xã Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Sấy lạnh khép kín giữ nguyên hạt phấn hoa hương cốm",
    packing: "Hộp thiếc mỹ thuật 100g",
    packingOptions: [
      { name: "Hộp thiếc mỹ thuật 100g", priceDelta: 0, desc: "Thiết kế hoa văn cổ điển trang nhã" },
      { name: "Hộp gỗ khắc laser 200g (+150.000đ)", priceDelta: 150000, desc: "Phiên bản quà biếu sang trọng" }
    ],
    usage: "Dùng 5g liên tu hãm với 300ml nước sôi, đậy nắp kín 5 phút để phấn hoa ngấm đều. Có thể kết hợp táo đỏ, kỷ tử.",
    benefits: [
      "Bổ thận tráng dương, dưỡng huyết nhuận sắc",
      "Thanh tâm chỉ khát, cải thiện sinh lực tự nhiên",
      "Hương cốm thơm ngọt ngào độc đáo khó quên"
    ],
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Những sợi tua nhụy sen vàng óng thu hái khi hoa nở rộ, giàu hạt phấn hoa thơm hương cốm nồng nàn.",
    description: "Liên tu (râu sen) là vị thuốc quý trong cung đình xưa. HTX Bách Liên ứng dụng công nghệ sấy lạnh khép kín nhằm bảo toàn tối đa lớp phấn hoa bám trên đầu nhụy sen. Khi pha, nước trà có màu vàng óng như mật, vị ngọt thanh mát và hương thơm đặc trưng của đồng quê Việt Nam."
  },

  // ==========================================
  // 5 SẢN PHẨM OCOP 3 SAO (NÔNG SẢN TIÊU BIỂU)
  // ==========================================
  {
    id: 5,
    name: "Trà Lá Sen Sấy Lạnh Giảm Cân",
    scientificName: "Folium Nelumbinis",
    category: "tra-sen",
    categoryName: "Trà Sen Thượng Hạng",
    ocopStars: 3,
    price: 65000,
    originalPrice: 85000,
    rating: 4.8,
    reviewsCount: 310,
    sold: 1850,
    stock: 90,
    tag: "OCOP 3 Sao • Giảm mỡ máu",
    origin: "Đầm Sen Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Sấy lạnh vô trùng, thái sợi đồng đều",
    packing: "Hộp 25 túi lọc tiện lợi",
    packingOptions: [
      { name: "Hộp 25 túi lọc tiện lợi", priceDelta: 0, desc: "Dễ pha tại văn phòng làm việc" },
      { name: "Túi lá sấy sợi mộc 200g (+25.000đ)", priceDelta: 25000, desc: "Dành cho người thích hãm ấm truyền thống" }
    ],
    usage: "Nhúng 1 túi lọc vào 200ml nước sôi 100°C trong 3-5 phút. Uống thay nước lọc hàng ngày sau bữa ăn.",
    benefits: [
      "Hỗ trợ giảm mỡ máu, giảm cân tự nhiên an toàn",
      "Hạ men gan, phòng chống gan nhiễm mỡ",
      "Thanh lọc cơ thể, giải nhiệt ngày hè oi bức"
    ],
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Lá sen bánh tẻ thu hái sáng sớm, sấy lạnh vô trùng giúp hạ mỡ máu và kiểm soát vóc dáng an toàn.",
    description: "Trà lá sen Bách Liên được chế biến từ những chiếc lá sen bánh tẻ xanh mướt lúc sương vừa tan. Công nghệ sấy lạnh ở nhiệt độ dưới 30°C giúp giữ nguyên hàm lượng Flavonoid, Alkaloid quý giá – những hoạt chất vàng trong việc kiểm soát lipid máu và chống oxy hóa tế bào."
  },
  {
    id: 6,
    name: "Trà Bạch Liên Nữ Vương (Sen Trắng)",
    scientificName: "Alba Lotus Royal Tea",
    category: "tra-sen",
    categoryName: "Trà Sen Thượng Hạng",
    ocopStars: 3,
    price: 185000,
    originalPrice: 230000,
    rating: 4.9,
    reviewsCount: 112,
    sold: 460,
    stock: 30,
    tag: "OCOP 3 Sao • Giống sen quý",
    origin: "Vùng trồng Sen Bạch Liên, Nam Đàn, Nghệ An",
    processMethod: "Sấy thăng hoa nguyên cánh hoa sen trắng",
    packing: "Hộp nắp bật cao cấp 100g",
    packingOptions: [
      { name: "Hộp nắp bật cao cấp 100g", priceDelta: 0, desc: "Hộp thiếc phủ mờ ánh kim ngà" },
      { name: "Set 2 hộp kèm bình thủy tinh (+210.000đ)", priceDelta: 210000, desc: "Kèm bình pha trà 2 lớp cách nhiệt" }
    ],
    usage: "Thả 3-4 cánh hoa sen trắng vào ấm thủy tinh trong suốt, rót nước 80°C ngắm cánh hoa nở bung và thưởng thức.",
    benefits: [
      "Hương thơm vương giả, thanh thoát hiếm có của loài sen trắng",
      "Dưỡng ẩm làn da, làm dịu tâm trạng mệt mỏi căng thẳng",
      "Cân bằng năng lượng tích cực cho cơ thể"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT__zERAr1dwRvSgOufFhuaS-8CqV8Wezg30KDgk6SnO4WxAVHbeBbdF3Y&s=10",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT__zERAr1dwRvSgOufFhuaS-8CqV8Wezg30KDgk6SnO4WxAVHbeBbdF3Y&s=10"
    ],
    shortDesc: "Tuyển chọn từ giống sen trắng cổ quý hiếm, sấy thăng hoa giữ nguyên phom hoa và hương thơm quý phái.",
    description: "Bạch Liên Nữ Vương là dòng trà hoa nghệ thuật độc đáo của HTX Bách Liên. Hoa sen trắng sau khi thu hái được đưa ngay vào buồng sấy thăng hoa chân không để giữ trọn vẹn cánh hoa trắng muốt và hương thơm dịu mát đặc trưng."
  },
  {
    id: 7,
    name: "Hạt Sen Sấy Bơ Mật Ong",
    scientificName: "Butter Honey Lotus Seeds",
    category: "nong-san-sen",
    categoryName: "Nông Sản & Hạt Sen",
    ocopStars: 3,
    price: 85000,
    originalPrice: 110000,
    rating: 4.9,
    reviewsCount: 175,
    sold: 980,
    stock: 55,
    tag: "OCOP 3 Sao • Vị béo bùi giòn tan",
    origin: "Xã Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Sấy giòn áo lớp bơ Pháp & mật ong hoa sen tự nhiên",
    packing: "Hũ nắp nhôm 250g",
    packingOptions: [
      { name: "Hũ nắp nhôm 250g", priceDelta: 0, desc: "Nắp nhôm xé tiện lợi, niêm phong kín khí" },
      { name: "Hũ nắp nhôm 450g (+65.000đ)", priceDelta: 65000, desc: "Hũ lớn cho tiệc trà gia đình" }
    ],
    usage: "Dùng trực tiếp ngay sau khi mở nắp, đậy kín nắp sau khi sử dụng để giữ độ giòn xốp.",
    benefits: [
      "Sự kết hợp hoàn hảo giữa vị bùi của hạt sen và ngậy thơm của bơ sữa",
      "Cung cấp năng lượng lành mạnh cho dân văn phòng, học sinh",
      "Không chất bảo quản, không phẩm màu tổng hợp"
    ],
    image: "https://sentruongphat.com/wp-content/uploads/2022/01/Sen-rang-bo-04.jpg",
    gallery: [
      "https://sentruongphat.com/wp-content/uploads/2022/01/Sen-rang-bo-04.jpg",
      "https://sentruongphat.com/wp-content/uploads/2022/01/Sen-rang-bo-04.jpg"
    ],
    shortDesc: "Hạt sen giòn tan phủ bơ Pháp thơm ngậy và mật ong hoa sen ngọt thanh, món ăn vặt dinh dưỡng.",
    description: "Từng hạt sen tươi bóc vỏ, tách tâm được sấy giòn rồi áo một lớp bơ nguyên chất quyện cùng mật ong thu hoạch từ chính đầm hoa sen mùa nở rộ. Vị ngọt vừa vặn, béo bùi kích thích vị giác mọi lứa tuổi."
  },
  {
    id: 8,
    name: "Bánh Cà Hạt Sen Quê Bác",
    scientificName: "Lotus Seed Traditional Egg Cookies",
    category: "nong-san-sen",
    categoryName: "Nông Sản & Hạt Sen",
    ocopStars: 3,
    price: 60000,
    originalPrice: 75000,
    rating: 4.8,
    reviewsCount: 220,
    sold: 1350,
    stock: 70,
    tag: "OCOP 3 Sao • Đặc sản xứ Nghệ",
    origin: "Làng nghề Nam Đàn, Nghệ An",
    processMethod: "Công thức truyền thống kết hợp bột hạt sen Kim Liên",
    packing: "Hộp giấy kraft mộc 300g",
    packingOptions: [
      { name: "Hộp giấy kraft mộc 300g", priceDelta: 0, desc: "Thân thiện môi trường, mộc mạc" },
      { name: "Hộp quà biếu quai xách 600g (+55.000đ)", priceDelta: 55000, desc: "Quà tặng quê hương xứ Nghệ" }
    ],
    usage: "Thưởng thức trực tiếp, kết hợp cùng tách trà sen nóng để tận hưởng trọn vẹn phong vị quê hương.",
    benefits: [
      "Bánh giòn xốp rôm rốp, thơm lừng vị trứng gà quê và bột hạt sen bùi ngậy",
      "Món quà tuổi thơ mang đậm bản sắc văn hóa ẩm thực xứ Nghệ",
      "Ít ngọt, dễ ăn, tốt cho tiêu hóa"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6ah4HFca1pbNatvB8DoxeYH3ynZeiVDnNMcdi6dSk5dseTXcUlT4CUQ&s=10",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6ah4HFca1pbNatvB8DoxeYH3ynZeiVDnNMcdi6dSk5dseTXcUlT4CUQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6ah4HFca1pbNatvB8DoxeYH3ynZeiVDnNMcdi6dSk5dseTXcUlT4CUQ&s=10"
    ],
    shortDesc: "Đặc sản bánh cà giòn xốp trứ danh xứ Nghệ kết hợp bột hạt sen Kim Liên thơm lừng, giòn rụm khó cưỡng.",
    description: "Bánh cà là thức quà truyền thống nổi tiếng của vùng đất Nam Đàn. HTX Bách Liên đã nâng tầm món bánh dân dã bằng việc bổ sung bột hạt sen sấy lạnh nguyên chất cùng trứng gà ta và đường mía tự nhiên, tạo nên viên bánh tròn vàng ruộm, giòn tan trong miệng."
  },
  {
    id: 9,
    name: "Trà Ướp Gạo Sen Tinh Túy",
    scientificName: "Lotus Anther Scented Green Tea",
    category: "tra-sen",
    categoryName: "Trà Sen Thượng Hạng",
    ocopStars: 3,
    price: 195000,
    originalPrice: 250000,
    rating: 4.9,
    reviewsCount: 145,
    sold: 620,
    stock: 35,
    tag: "OCOP 3 Sao • Tinh hoa nghệ thuật",
    origin: "Đầm Sen Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Ướp 7 lần hạt gạo sen thủ công, sấy nhiệt thấp",
    packing: "Hộp thiếc hoa văn triện cổ 150g",
    packingOptions: [
      { name: "Hộp thiếc hoa văn triện cổ 150g", priceDelta: 0, desc: "Hộp thiếc kín khí bảo quản hương lâu dài" },
      { name: "Hộp gỗ sơn mài kèm chén khải (+280.000đ)", priceDelta: 280000, desc: "Bộ ấm chén trà đạo cao cấp" }
    ],
    usage: "Dùng 8g trà hãm với 200ml nước 85°C. Rót nước ra chén tống sau 45 giây để hương thơm lan tỏa đều.",
    benefits: [
      "Đỉnh cao nghệ thuật ướp hương truyền thống Việt Nam",
      "Nước trà vàng mật ong ánh xanh, vị chát dịu ngọt hậu sâu lắng",
      "Thanh lọc tinh thần, tăng khả năng tập trung sáng tạo"
    ],
    image: "https://www.tita.art/wp-content/uploads/2023/08/tra-gao-sen-titaart6.jpg",
    gallery: [
      "https://www.tita.art/wp-content/uploads/2023/08/tra-gao-sen-titaart6.jpg",
      "https://www.tita.art/wp-content/uploads/2023/08/tra-gao-sen-titaart6.jpg"
    ],
    shortDesc: "Cần tới 1.200 bông sen bách diệp để tách hạt gạo hương, ướp và sấy chậm 7 lần công phu.",
    description: "Hạt gạo sen chính là 'túi hương' màu trắng sữa nằm ở đầu mỗi nhụy hoa sen. Để làm ra 1kg Trà Ướp Gạo Sen Bách Liên cần sự nhẫn nại phi thường của các nghệ nhân: tách từng hạt gạo sen và trải qua 7 lần ướp – sấy nối tiếp để hương sen thấm sâu vào từng búp trà."
  },

  // ==========================================
  // COMBO QUÀ TẶNG DOANH NGHIỆP & HỘI NGHỊ
  // ==========================================
  {
    id: 10,
    name: "Hộp Quà Biếu 'Bách Liên Đoàn Viên'",
    scientificName: "Bach Lien Royal Giftset",
    category: "qua-tang",
    categoryName: "Hộp Quà Biếu OCOP",
    ocopStars: 4,
    price: 680000,
    originalPrice: 850000,
    rating: 5.0,
    reviewsCount: 88,
    sold: 310,
    stock: 15,
    tag: "Quà biếu VIP • Hội nghị",
    origin: "HTX Sen Bách Liên, Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Bộ phối 4 sản phẩm OCOP sấy lạnh cao cấp",
    packing: "Hộp gỗ sơn mài quai xách sang trọng",
    packingOptions: [
      { name: "Hộp gỗ sơn mài quai xách sang trọng", priceDelta: 0, desc: "Kèm thiệp thư pháp viết tay tri ân" },
      { name: "Bản đặc biệt kèm Bộ Ấm Chén Gốm Mộc (+320.000đ)", priceDelta: 320000, desc: "Bộ ấm chén gốm mộc Bát Tràng nghệ nhân" }
    ],
    usage: "Thích hợp làm quà tặng ngoại giao, đối tác doanh nghiệp, quà Tết và khách du lịch về thăm quê Bác.",
    benefits: [
      "Tập hợp đủ 4 cực phẩm sen: Trà Bông Tươi + Hạt Sen Sấy Giòn + Trà Tâm Sen + Bánh Cà Hạt Sen",
      "Thiết kế hộp quà tôn vinh nét đẹp văn hóa và di sản sen Kim Liên",
      "Mang trọn vẹn thông điệp an khang, thanh khiết và bền vững"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOIKbQfU6E927Gk-ltdYGRSToUbqbJx3i0Za641wXeAQ&s=10",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOIKbQfU6E927Gk-ltdYGRSToUbqbJx3i0Za641wXeAQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOIKbQfU6E927Gk-ltdYGRSToUbqbJx3i0Za641wXeAQ&s=10"
    ],
    shortDesc: "Bộ quà biếu cao cấp kết hợp Trà Sen Bông, Hạt Sen Sấy, Trà Tâm Sen và Bánh Cà truyền thống trong hộp gỗ sơn mài.",
    description: "Hộp Quà 'Bách Liên Đoàn Viên' là món quà trang trọng nhất của HTX Bách Liên dành cho các sự kiện văn hóa, đại hội và hội nghị. Từng sản phẩm bên trong đều đạt chứng nhận OCOP quốc gia, đại diện cho tình cảm nồng ấm và sự hiếu khách của người dân vùng đất Làng Sen quê Bác."
  },

  // ==========================================
  // BỘ HỌC CỤ TỰ THỰC HÀNH TẠI NHÀ (DIY LOTUS KITS)
  // ==========================================
  {
    id: 11,
    name: "Bộ Tự Làm Tranh Lá Sen Khô Nghệ Thuật (DIY Kit)",
    scientificName: "DIY Lotus Leaf Art Craft Kit",
    category: "hoc-cu-diy",
    categoryName: "Bộ Học Cụ DIY Sen",
    ocopStars: null,
    price: 185000,
    originalPrice: 230000,
    rating: 4.9,
    reviewsCount: 78,
    sold: 340,
    stock: 25,
    tag: "Học cụ trải nghiệm • Sáng tạo tại nhà",
    origin: "HTX Sen Bách Liên, Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Lá sen bách diệp sấy lạnh chân không giữ nguyên vân lá tự nhiên",
    packing: "Hộp Kraft kèm khung gỗ & phụ kiện",
    packingOptions: [
      { name: "Bộ Tiêu Chuẩn (Khung gỗ 20x25cm + 10 phiến lá sen sấy)", priceDelta: 0, desc: "Đầy đủ khung gỗ, keo dán, nhíp, cọ quét & sách hướng dẫn tạo hình" },
      { name: "Bộ Nâng Cao (Khung lớn 30x40cm + Màu vẽ acrylic) (+75.000đ)", priceDelta: 75000, desc: "Khung tranh lớn 30x40cm kèm bộ 6 màu acrylic và cọ tỉa chi tiết" }
    ],
    usage: "Dán ghép các phiến lá sen sấy lạnh lên khung để tạo hình tranh phong cảnh quê Bác, hoa sen, Chùa Một Cột theo hướng dẫn hoặc tự do sáng tạo.",
    benefits: [
      "Học cụ giáo dục trải nghiệm STEM & nghệ thuật thủ công độc đáo cho học sinh, bạn trẻ và gia đình",
      "Lá sen thật 100% xử lý sấy lạnh khép kín chống ẩm mốc, giữ trọn sắc độ và đường gân lá sống động",
      "Rèn luyện sự khéo léo, tính kiên nhẫn, giải tỏa căng thẳng và mang hồn sen quê Bác vào không gian sống"
    ],
    image: "assets/images/diy_tranh_la_sen.jpg",
    gallery: [
      "assets/images/diy_tranh_la_sen.jpg",
      "assets/images/diy_tranh_la_sen.jpg"
    ],
    shortDesc: "Tự tay sáng tạo tranh nghệ thuật từ lá sen sấy lạnh Kim Liên. Đầy đủ khung tranh gỗ mộc, keo dán, nhíp gắp và sách hướng dẫn.",
    description: "Bộ học cụ 'Tự Làm Tranh Lá Sen Nghệ Thuật' do HTX Sen Bách Liên phát triển nhằm lan tỏa tình yêu hoa sen quê Bác đến mọi miền. Từng phiến lá sen bách diệp được tuyển chọn và sấy lạnh chân không, bảo toàn nguyên vẹn sắc thái tự nhiên và đường gân dẻo dai. Sản phẩm đi kèm khung tranh gỗ mộc, nhíp gắp, keo dán chuyên dụng và mã QR quét video nghệ nhân hướng dẫn từng bước."
  },
  {
    id: 12,
    name: "Bộ Tự Làm Nến Thơm Tinh Dầu Sen Quê Bác (DIY Kit)",
    scientificName: "DIY Lotus Blossom Scented Candle Kit",
    category: "hoc-cu-diy",
    categoryName: "Bộ Học Cụ DIY Sen",
    ocopStars: null,
    price: 165000,
    originalPrice: 210000,
    rating: 5.0,
    reviewsCount: 92,
    sold: 410,
    stock: 30,
    tag: "Học cụ trải nghiệm • Thư giãn an yên",
    origin: "HTX Sen Bách Liên, Kim Liên, Nam Đàn, Nghệ An",
    processMethod: "Sáp đậu nành thiên nhiên & Tinh dầu hoa sen chưng cất nguyên chất",
    packing: "Hộp Kraft sang trọng kèm hũ gốm cánh sen & dụng cụ",
    packingOptions: [
      { name: "Bộ 1 Hũ Gốm Mộc Cánh Sen 200g", priceDelta: 0, desc: "Hũ gốm điêu khắc cánh sen, sáp đậu nành, bấc gỗ, tinh dầu sen 10ml, cánh sen sấy" },
      { name: "Bộ 2 Hũ Nến Đôi (+80.000đ)", priceDelta: 80000, desc: "Gồm 2 hũ gốm: Hương Sen Sớm Kim Liên & Hương Sen Gỗ Trầm Ấm" }
    ],
    usage: "Thực hành nấu nến: đun chảy sáp đậu nành, nhỏ tinh dầu hoa sen nguyên chất, định vị bấc gỗ, rót vào hũ gốm và trang trí cánh hoa sen khô trên bề mặt.",
    benefits: [
      "100% nguyên liệu tự nhiên an toàn: sáp đậu nành lành tính không độc hại, bấc gỗ bập bùng tiếng lửa êm dịu",
      "Hương thơm hoa sen chưng cất tự nhiên giúp xoa dịu tâm trí, thanh lọc không khí và dễ đi vào giấc ngủ",
      "Trải nghiệm tự làm đồ thủ công mỹ nghệ ý nghĩa, thành phẩm sang trọng dùng trang trí hoặc làm quà tặng"
    ],
    image: "assets/images/diy_nen_thom_sen.jpg",
    gallery: [
      "assets/images/diy_nen_thom_sen.jpg",
      "assets/images/diy_nen_thom_sen.jpg"
    ],
    shortDesc: "Tự tay nấu và đổ nến thơm tại nhà với sáp đậu nành tự nhiên, tinh dầu hoa sen Bách Liên, bấc gỗ và cánh hoa sen sấy khô.",
    description: "Bộ Tự Làm Nến Thơm Tinh Dầu Sen Bách Liên mang đến cho bạn liệu pháp thư giãn tâm trí ngay tại nhà. Bộ kít chuẩn bị chu đáo tất cả dụng cụ: sáp đậu nành thiên nhiên, tinh dầu hoa sen nguyên chất được chưng cất từ hoa sen Kim Liên lúc hừng đông, bấc gỗ bập bùng tiếng lửa êm tai, hũ gốm mỹ nghệ điêu khắc cánh sen, cốc rót inox, nhiệt kế và hũ cánh sen sấy khô điểm xuyết trên mặt nến."
  }
];

// Cấu hình Tour Nông Nghiệp "Một Ngày Làm Nông Dân"
const TOUR_DATA = {
  id: "tour-mot-ngay-lam-nong-dan",
  title: "Tour Trải Nghiệm 'Một Ngày Làm Nông Dân'",
  subtitle: "Hương Sen Quê Bác • Về Với Đầm Sen Sinh Thái & Nhà Xưởng Sấy Lạnh Bách Liên",
  priceAdult: 350000,
  priceChild: 180000,
  image: "assets/images/tour_nong_dan.jpg",
  duration: "1 Ngày (07:00 - 15:00)",
  location: "Xã Kim Liên, Huyện Nam Đàn, Tỉnh Nghệ An",
  hotline: "0988.123.456",
  highlights: [
    "Mặc áo bà ba, đội nón lá chèo xuồng giữa đầm sen bách diệp Kim Liên mênh mông",
    "Tự tay hái hoa sen sương sớm, tách hạt sen tươi và ướp trà bông sen",
    "Tham quan nhà xưởng sấy lạnh khép kín hiện đại đạt chuẩn VietGAP",
    "Thưởng thức mâm cơm trưa 5 món đặc sản sen quê Bác đậm đà phong vị",
    "Nhận 01 phần quà nông sản OCOP Bách Liên do chính tay mình ướp mang về"
  ],
  schedule: [
    {
      time: "07:00 - 08:00",
      title: "Đón Khách & Thưởng Trà Chào Buổi Sáng",
      desc: "Quý khách có mặt tại Không gian văn hóa Sen Bách Liên (Kim Liên, Nam Đàn). Thưởng thức chén Trà Sen Bách Liên ấm nóng cùng bánh cà hạt sen truyền thống, nghe giới thiệu về giống sen quê Bác."
    },
    {
      time: "08:00 - 09:30",
      title: "Chèo Xuồng Đầm Sen - Tự Tay Hái Sen Sớm",
      desc: "Thay trang phục áo bà ba, nón lá nông dân. Bước lên xuồng ba lá lướt giữa đồng sen xanh ngát, nghệ nhân hướng dẫn kỹ thuật chọn bông sen nở hé vừa độ sương mai và tự tay thu hoạch đài sen tươi."
    },
    {
      time: "09:30 - 11:30",
      title: "Tham Quan Xưởng Sấy Lạnh & Trải Nghiệm Ướp Trà Bông",
      desc: "Vào khu chế biến hiện đại: tham quan hệ thống buồng sấy lạnh chân không Lio-Pharm. Tự tay trải nghiệm các công đoạn sơ chế: tách hạt sen, lấy tâm sen và trực tiếp ướp trà Shan Tuyết vào đóa sen tươi."
    },
    {
      time: "11:30 - 13:30",
      title: "Bữa Trưa Thực Dưỡng Ẩm Thực Sen Quê Bác",
      desc: "Dùng bữa trưa tại nhà sàn sinh thái với thực đơn 5 món sen tinh tế: Cơm hấp lá sen bách diệp, gà đồi hấp lá sen, gỏi ngó sen tôm thịt xứ Nghệ, canh củ sen sườn non, chè hạt sen long nhãn thanh mát."
    },
    {
      time: "13:30 - 15:00",
      title: "Check-in Lưu Niệm & Trao Quà Nông Sản OCOP",
      desc: "Nghỉ ngơi, check-in chụp ảnh tại con đường sen và không gian trưng bày OCOP. Nhận đóa trà sen tươi do chính tay mình ướp hút chân không cùng kỷ niệm chương 'Nông Dân Sen Bách Liên' mang về."
    }
  ]
};

// Danh sách mã giảm giá tri ân khách hàng
const INITIAL_COUPONS = [
  { code: "SENQUEBAC", discountPercent: 10, minOrder: 150000, desc: "Giảm 10% mừng bạn ghé thăm HTX Sen Bách Liên" },
  { code: "OCOP4SAO", discountPercent: 15, minOrder: 500000, desc: "Giảm 15% cho đơn nông sản OCOP từ 500.000đ" },
  { code: "FREESHIP", discountAmount: 30000, minOrder: 250000, desc: "Miễn phí vận chuyển toàn quốc (tối đa 30k)" }
];

// Danh sách đơn hàng mẫu ban đầu demo trang Admin
const INITIAL_ORDERS = [
  {
    id: "BL-9801",
    createdAt: "2026-10-25T14:20:00.000Z",
    customer: {
      name: "Nguyễn Thị Mai Lan",
      phone: "0912345678",
      address: "Phường Trung Đô, Thành phố Vinh, Nghệ An",
      note: "Giao giờ hành chính, đóng gói cẩn thận làm quà"
    },
    items: [
      { id: 1, name: "Trà Tâm Sen (Tim Sen) Sấy Lạnh", price: 145000, quantity: 2, pot: "Hũ thủy tinh nắp gỗ 100g", potDelta: 0 },
      { id: 2, name: "Hạt Sen Sấy Giòn Nguyên Vị", price: 95000, quantity: 1, pot: "Túi zip tráng bạc 200g", potDelta: 0 }
    ],
    couponCode: "SENQUEBAC",
    discountAmount: 38500,
    shippingFee: 25000,
    total: 371500,
    paymentMethod: "vietqr",
    status: "processing"
  },
  {
    id: "BL-9788",
    createdAt: "2026-10-24T09:15:00.000Z",
    customer: {
      name: "Lê Hoàng Dũng",
      phone: "0988776655",
      address: "Khu đô thị Ecopark, Văn Giang, Hưng Yên",
      note: "Giao trước thứ 6 giúp mình"
    },
    items: [
      { id: 10, name: "Hộp Quà Biếu 'Bách Liên Đoàn Viên'", price: 680000, quantity: 1, pot: "Hộp gỗ sơn mài quai xách", potDelta: 0 }
    ],
    couponCode: "FREESHIP",
    discountAmount: 30000,
    shippingFee: 30000,
    total: 680000,
    paymentMethod: "vietqr",
    status: "completed"
  }
];

// Danh sách đăng ký tour mẫu ban đầu demo Admin
const INITIAL_TOURS = [
  {
    id: "TOUR-2026-081",
    createdAt: "2026-10-25T10:30:00.000Z",
    tourDate: "2026-11-02",
    customer: {
      name: "Đoàn Du Lịch Hà Nội (Trần Hải Anh)",
      phone: "0934567890",
      email: "haianh.travel@gmail.com",
      note: "Đoàn có 2 người cao tuổi, nhờ chuẩn bị ghế nghỉ chu đáo"
    },
    adults: 6,
    children: 2,
    total: 2460000, // 6 x 350k + 2 x 180k
    status: "confirmed" // 'confirmed' | 'pending' | 'completed' | 'cancelled'
  },
  {
    id: "TOUR-2026-079",
    createdAt: "2026-10-24T16:45:00.000Z",
    tourDate: "2026-10-30",
    customer: {
      name: "Gia đình chị Vũ Phương Thảo",
      phone: "0971239876",
      email: "thaovu90@gmail.com",
      note: "Cho 2 bé trải nghiệm hái sen và ướp trà"
    },
    adults: 2,
    children: 2,
    total: 1060000,
    status: "pending"
  }
];

// Danh sách đoàn trường học & cơ quan đăng ký trải nghiệm mẫu
const INITIAL_GROUP_BOOKINGS = [
  {
    id: "DOAN-2026-001",
    createdAt: "2026-10-25T08:30:00.000Z",
    orgName: "Trường THCS Đặng Chanh Kỷ (Nam Đàn)",
    leaderName: "Thầy Nguyễn Văn Toàn",
    phone: "0912345999",
    email: "toannguyen.dck@gmail.com",
    visitDate: "2026-11-15",
    packageType: "tron-ngay",
    packageName: "Gói 2: Một Ngày Trọn Vẹn (Kèm Cơm Sen)",
    studentCount: 45,
    teacherCount: 4,
    estimatedTotal: 15750000, // 45 x 350.000đ (giáo viên miễn phí)
    specialRequests: "Nhờ HTX chuẩn bị 45 áo bà ba cho học sinh và hỗ trợ xuất hóa đơn VAT cho trường.",
    status: "confirmed"
  },
  {
    id: "DOAN-2026-002",
    createdAt: "2026-10-24T14:15:00.000Z",
    orgName: "Đoàn Thanh Niên & Công Đoàn Viettel Nghệ An",
    leaderName: "Chị Lê Hoàng Yến",
    phone: "0987654321",
    email: "yenlh.viettel@gmail.com",
    visitDate: "2026-11-08",
    packageType: "stem",
    packageName: "Gói 3: Chuyên Sâu STEM & Nghệ Nhân Sen",
    studentCount: 30,
    teacherCount: 2,
    estimatedTotal: 7500000, // 30 x 250.000đ
    specialRequests: "Tập trung 3 workshop làm nến thơm và tranh lá sen đóng khung mang về.",
  }
];

// ===================================================
// HỆ THỐNG 6 GÓI TOUR & DỊCH VỤ TRẢI NGHIỆM LINH HOẠT QUANH NĂM
// (Theo tài liệu Dự án Khởi nghiệp từ Sen - HTX Bách Liên)
// ===================================================
const TOUR_PACKAGES = [
  // --- NHÓM 1: DÀNH CHO HỌC SINH PHỔ THÔNG (Tháng 9 - Tháng 5) ---
  {
    id: "SCH-01",
    category: "school",
    name: "Theo Chân Bác – Thấu Cảm Hương Sen",
    tagline: "Giáo dục truyền thống & Di sản quê hương",
    target: "Học sinh Tiểu học, THCS",
    duration: "Nửa ngày (Buổi sáng 08:00 - 11:30 hoặc chiều 13:30 - 17:00)",
    season: "Tháng 9 đến tháng 5 (Trong năm học)",
    priceRange: "100.000 – 120.000 đ/em",
    basePrice: 110000,
    unit: "em",
    hasMealOption: false,
    image: "assets/images/lang_sen_tuoi_tho.jpg",
    highlights: [
      "Tham quan Khu di tích Quốc gia đặc biệt Kim Liên (Quê nội Làng Sen, Quê ngoại Hoàng Trù)",
      "Tìm hiểu nếp nhà tranh, gia đình cụ Phó bảng Nguyễn Sinh Sắc và bà Hoàng Thị Loan",
      "Hoàn thành 'Sổ tay di sản Làng Sen' với các câu hỏi tương tác khám phá lịch sử",
      "Giao lưu, học hát các làn điệu Dân ca Ví, Giặm Nghệ Tĩnh cùng nghệ nhân tại đầm sen",
      "Thưởng thức nước mát trà lá sen & bánh cà hạt sen Quê Bác giải lao"
    ],
    takeaway: "Sổ tay di sản Làng Sen hoàn thành, Giấy chứng nhận tham gia hành trình",
    minPax: 20
  },
  {
    id: "SCH-02",
    category: "school",
    name: "Nghệ Nhân Sen Nhí",
    tagline: "STEM trải nghiệm thực hành nghề sen độc bản",
    target: "Học sinh THCS, THPT",
    duration: "Nửa ngày hoặc 1 ngày trọn gói",
    season: "Tháng 9 đến tháng 5 (Trong năm học)",
    priceRange: "165.000 – 180.000 đ/em",
    basePrice: 170000,
    unit: "em",
    hasMealOption: true,
    mealPrice: 40000, // Cơm quê từ sen +40.000đ/suất
    image: "assets/images/diy_tranh_la_sen.jpg",
    highlights: [
      "Bao gồm toàn bộ nội dung tìm hiểu di sản & dân ca của Chương trình 1",
      "02 Giờ thực hành chuyên sâu tại xưởng nghề thủ công Bách Liên:",
      "• Lựa chọn 1: Tự tay ướp Trà Bông Sen Bách Diệp sấy lạnh mang về",
      "• Lựa chọn 2: Học kỹ thuật ép lá sen khô tạo hình Tranh lá sen nghệ thuật đóng khung gỗ",
      "Gói trọn ngày (tùy chọn): Thưởng thức bữa trưa cơm quê thực dưỡng 5 món từ sen (+40.000đ/suất)",
      "Miễn phí vé trải nghiệm và cơm trưa cho giáo viên phụ trách đoàn (tỷ lệ 1 GV / 15 HS)"
    ],
    takeaway: "01 Đóa trà sen bách diệp tươi hút chân không HOẶC 01 Bức tranh lá sen đóng khung gỗ",
    minPax: 20
  },
  {
    id: "SCH-03",
    category: "school",
    name: "Trại Hè Kỹ Năng 'Mùa Sen Kim Liên'",
    tagline: "Kỳ nghỉ hè bán trú sinh thái & rèn luyện kỹ năng sống",
    target: "Học sinh từ 10 đến 18 tuổi",
    duration: "3 – 5 Ngày bán trú (07:30 – 17:00 mỗi ngày)",
    season: "Tháng 6 đến tháng 8 (Mùa sen nở rộ rực rỡ nhất)",
    priceRange: "2.000.000 đ/em (Trọn gói 3 ngày)",
    basePrice: 2000000,
    unit: "em",
    hasMealOption: false,
    image: "assets/images/tour_nong_dan.jpg",
    highlights: [
      "Khám phá và nhận biết bộ sưu tập trên 100 giống sen quý của HTX Bách Liên",
      "Tập làm 'Nông dân nhí': Chèo thuyền hái sen, phân loại ngó sen, tách hạt sen tươi",
      "Nhập môn trà đạo Việt: Học nghệ thuật ướp và pha trà sen đạt chuẩn OCOP 4 sao",
      "Xưởng thủ công mùa hè: Tự tay đúc nến thơm sen và làm xà phòng tinh dầu sen Kim Liên",
      "Lớp học văn hóa: Học hát và tự sáng tác lời mới cho các điệu Dân ca Ví Giặm về quê Bác",
      "Bao gồm toàn bộ bữa trưa thực dưỡng, áo bà ba nông dân, nón lá và xe đưa đón an toàn"
    ],
    takeaway: "Huy hiệu Trại hè Sen Quê Bác, trọn bộ sản phẩm tự tay chế biến, video nhật ký trải nghiệm",
    minPax: 10
  },

  // --- NHÓM 2: DÀNH CHO KHÁCH DU LỊCH ĐẠI CHÚNG, GIA ĐÌNH & ĐOÀN THỂ ---
  {
    id: "PUB-01",
    category: "public",
    name: "Thưởng Trà Sen – Nghe Câu Ví Giặm",
    tagline: "Không gian trà đạo thiền tịnh & Dân ca UNESCO",
    target: "Khách hành hương, cơ quan đoàn thể, người cao tuổi",
    duration: "60 – 90 Phút thư giãn thảnh thơi",
    season: "Phục vụ quanh năm trong không gian nhà sàn ven hồ sen",
    priceRange: "80.000 – 120.000 đ/người",
    basePrice: 100000,
    unit: "người",
    hasMealOption: false,
    image: "assets/images/dan_ca_vi_giam.jpg",
    highlights: [
      "Thưởng thức 03 phẩm trà sen OCOP thượng hạng: Trà Bông Sen tươi, Trà Liên Tu, Trà Bạch Liên Nữ Vương",
      "Tiệc trà truyền thống dùng kèm Hạt sen sấy bơ mật ong giòn rụm và Bánh cà hạt sen xứ Nghệ",
      "Lắng nghe các nghệ nhân dân ca biểu diễn điệu Ví, Giặm ân tình mộc mạc bên hồ sen",
      "Giao lưu đối đáp, tìm hiểu văn hóa trà sen cung đình và cách nhận biết trà sen sạch không hương liệu",
      "Không gian check-in chụp ảnh áo dài, áo bà ba bên khung cảnh hồ sen thơ mộng"
    ],
    takeaway: "Voucher ưu đãi 10% mua nông sản sen OCOP tại gian hàng HTX",
    minPax: 5
  },
  {
    id: "PUB-02",
    category: "public",
    name: "Workshop 'Sáng Tạo Cùng Sen'",
    tagline: "Lớp thủ công mỹ nghệ sen ứng dụng cho mọi lứa tuổi",
    target: "Khách gia đình, bạn trẻ, đoàn du lịch trải nghiệm",
    duration: "2 – 3 Giờ thực hành sáng tạo",
    season: "Phục vụ quanh năm (Sáng 09:00 hoặc Chiều 14:00)",
    priceRange: "150.000 – 250.000 đ/người",
    basePrice: 190000,
    unit: "người",
    hasMealOption: false,
    image: "assets/images/diy_nen_thom_sen.jpg",
    highlights: [
      "Thực hành 03 bộ môn thủ công mỹ nghệ lấy cảm hứng từ cây sen Kim Liên:",
      "• 1. Tự tay phối màu và dán Tranh lá sen phong cảnh sấy khô ép đóng khung gỗ",
      "• 2. Đúc Nến thơm hoa sen từ sáp đậu nành thiên nhiên và tinh dầu sen nguyên chất",
      "• 3. Tự làm Xà phòng dưỡng da tinh dầu sen thiên nhiên tạo hình bông sen",
      "Được nghệ nhân HTX hướng dẫn tận tình từng bước kỹ thuật xử lý nguyên liệu tự nhiên",
      "Thưởng thức trà tâm sen và hạt sen sấy trong suốt thời gian thực hành"
    ],
    takeaway: "Toàn bộ tác phẩm tranh lá sen, hũ nến thơm hoặc bánh xà phòng sen do chính tay bạn làm ra",
    minPax: 2
  },
  {
    id: "PUB-03",
    category: "public",
    name: "Combo 'Gia Đình Về Làng Sen'",
    tagline: "Hành trình trọn vẹn yêu thương cho cả tổ ấm",
    target: "Hộ gia đình từ 3 đến 5 thành viên",
    duration: "Nửa ngày (Buổi sáng 08:30 - 13:00 hoặc chiều)",
    season: "Phục vụ quanh năm",
    priceRange: "450.000 – 600.000 đ/combo",
    basePrice: 520000,
    unit: "combo",
    isCombo: true,
    hasMealOption: false, // Đã bao gồm mâm cơm gia đình
    image: "assets/images/hero_sen_que_bac.jpg",
    highlights: [
      "01 Hướng dẫn viên riêng đồng hành chu đáo chăm sóc xuyên suốt cho gia đình",
      "Tham quan đầm sen bách diệp, chụp ảnh lưu niệm gia đình trong trang phục truyền thống",
      "Buổi thực hành thủ công gia đình: Bố mẹ cùng các con tự tay ướp đóa trà sen tươi mang về",
      "Mâm cơm quê đặc sản từ sen Kim Liên chuẩn vị xứ Nghệ dành cho cả gia đình:",
      "• Gà đồi hấp lá sen, cơm hạt sen bọc lá sen, gỏi ngó sen tôm thịt, canh củ sen hầm sườn non, chè sen tráng miệng",
      "Tặng kèm 01 set quà nông sản sen Bách Liên cho bố mẹ"
    ],
    takeaway: "02 Đóa trà bông sen bách diệp tươi + Set quà lưu niệm OCOP cho gia đình",
    minPax: 1 // 1 combo
  }
];

// Cấu hình HTX Nông Nghiệp & Chế Biến Sen Bách Liên
const SHOP_CONFIG = {
  shopName: "HTX Sen Bách Liên",
  brandTitle: "Bách Liên • Hương Sen Quê Bác",
  slogan: "Hương sen quê Bác",
  subSlogan: "Tinh hoa nông sản OCOP • Công nghệ sấy lạnh khép kín",
  hotline: "0988.123.456",
  zaloPhone: "0988123456",
  email: "senbachlien.namdan@gmail.com",
  address: "Xã Kim Liên, Huyện Nam Đàn, Tỉnh Nghệ An (Đầm Sen Quê Bác)",
  bank: {
    bankId: "MB", // Ngân hàng Quân Đội
    accountNo: "098812345688",
    accountName: "HTX NONG NGHIEP SEN BACH LIEN"
  }
};
