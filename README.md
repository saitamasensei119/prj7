# 🌱 Sen Đá House • Website Bán Cây Cảnh Mini (Không Cần CSDL)

Website thương mại điện tử chuyên bán sen đá, xương rồng và phụ kiện bàn làm việc được thiết kế **100% Client-side** (HTML5 + CSS3 + Vanilla JavaScript ES6+), lưu trữ trạng thái bằng **LocalStorage**, tối ưu hoàn hảo để **đưa lên GitHub Pages và gửi link cho khách hàng truy cập ngay**.

---

## 🌟 Điểm Nổi Bật & Tính Năng Demo

1. **Không cần CSDL hay Server backend**:
   - Tự động nạp dữ liệu mẫu ban đầu từ `js/data.js`.
   - Giỏ hàng, lịch sử đơn hàng, voucher và sản phẩm mới được lưu trực tiếp vào `localStorage` của trình duyệt.
   - Có nút **"Khôi phục dữ liệu gốc" (Reset Data)** trong bảng Admin và dưới Footer để đưa web về trạng thái mẫu ban đầu sau mỗi lần demo.

2. **Thanh toán VietQR động**:
   - Tự động sinh mã QR ngân hàng chuẩn VietQR khớp chính xác với số tiền đơn hàng và mã đơn (ví dụ: `SDH-98214`). Khách hàng có thể mở app ngân hàng quét thử ngay.

3. **Chốt đơn 1 chạm qua Zalo**:
   - Khi hoàn tất đơn, hệ thống tự động soạn sẵn tin nhắn chi tiết (Tên cây, số lượng, loại chậu, địa chỉ, tổng tiền) và mở link Zalo để khách bấm gửi thẳng cho chủ shop.

4. **Trải nghiệm khách hàng phong phú**:
   - Tìm kiếm thời gian thực (Live Search).
   - Bộ lọc theo danh mục, khoảng giá, mức độ dễ chăm sóc.
   - Sắp xếp giá, bán chạy, đánh giá.
   - Popup xem nhanh (Quick View) có chọn chậu (chậu nhựa, chậu đất nung, chậu gốm men hỏa biến).
   - Giỏ hàng trượt (Slide-over Cart Drawer) kèm mã giảm giá (`SENXANH10`, `FREESHIP`).
   - Tra cứu đơn hàng đã đặt theo SĐT hoặc Mã đơn.
   - Chế độ Sáng / Tối (Dark / Light Mode) hiện đại chuẩn phong cách Botanical Zen.

5. **Bảng Quản Trị Mini Admin (`admin.html`)**:
   - Báo cáo KPI: Doanh thu ảo, số đơn hàng mới, tồn kho.
   - Quản lý danh sách đơn hàng & đổi trạng thái (Chờ xác nhận $\to$ Đang giao $\to$ Đã giao).
   - Thêm sản phẩm cây mới trực tiếp trên giao diện.

---

## 🚀 Hướng Dẫn Đưa Lên GitHub Pages (Có Link Gửi Khách Trong 1 Phút)

### Cách 1: Tải trực tiếp qua giao diện Web GitHub (Không cần cài Git)
1. Đăng nhập [GitHub.com](https://github.com), bấm **New repository** $\to$ Đặt tên repo (ví dụ: `senda-house`) $\to$ Chọn **Public** $\to$ Bấm **Create repository**.
2. Tại màn hình repo vừa tạo, chọn **"uploading an existing file"**.
3. Kéo thả toàn bộ các file và thư mục trong thư mục này (`index.html`, `admin.html`, thư mục `css/`, `js/`, `assets/`) vào GitHub rồi bấm **Commit changes**.
4. Vào tab **Settings** của repository $\to$ Menu bên trái chọn **Pages**.
5. Tại mục **Branch**, chọn `main` (hoặc `master`) $\to$ Thư mục chọn `/(root)` $\to$ Bấm **Save**.
6. Đợi khoảng 30 - 60 giây, GitHub sẽ cấp cho bạn một đường link có dạng:
   $$\text{https://<ten-tai-khoan>.github.io/<ten-repo>/}$$
   Bạn chỉ cần copy link này gửi cho khách là họ truy cập xem và đặt hàng được ngay!

---

### Cách 2: Dùng Git Command Line
```bash
git init
git add .
git commit -m "feat: Ra mắt website Sen Đá House demo không cần CSDL"
git branch -M main
git remote add origin https://github.com/<ten-tai-khoan>/<ten-repo>.git
git push -u origin main
```
Sau đó vào **Settings $\to$ Pages** bật GitHub Pages như Bước 4 ở trên.

---

## ⚙️ Hướng Dẫn Tùy Biến Thông Tin Shop & Ngân Hàng Nhận Tiền

Mở file [`js/data.js`](file:///d:/prj7/js/data.js), cuộn xuống cuối cùng tại `SHOP_CONFIG`:

```javascript
const SHOP_CONFIG = {
  shopName: "Sen Đá House • Cây Cảnh & Vườn Mini",
  hotline: "0987.654.321",
  zaloPhone: "0987654321",       // <-- Thay bằng số Zalo nhận tin chốt đơn của bạn
  address: "124 Vườn Cảnh Xanh, Cầu Giấy, Hà Nội",
  bank: {
    bankId: "MB",               // Mã ngân hàng: MB, VCB, ACB, TPB, BIDV, TECHCOMBANK...
    accountNo: "098765432188",  // <-- Số tài khoản ngân hàng của bạn
    accountName: "NGUYEN VAN A" // <-- Tên chủ tài khoản (in hoa không dấu)
  }
};
```
Mỗi khi khách đặt đơn chọn hình thức VietQR, mã QR sinh ra sẽ tự động điền đúng STK và tên ngân hàng này của bạn!
