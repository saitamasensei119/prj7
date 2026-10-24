// Module Thanh Toán (Checkout), Sinh Mã VietQR Tự Động & Chốt Đơn Qua Zalo

const CheckoutService = {
  currentOrder: null,

  // Mở modal thanh toán
  openCheckoutModal() {
    const cart = StorageService.getCart();
    if (cart.length === 0) {
      CartService.showToast("Giỏ hàng của bạn đang trống!", "warning");
      return;
    }

    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    // Đóng drawer giỏ hàng nếu đang mở
    document.getElementById("cart-drawer")?.classList.remove("open");
    document.getElementById("cart-backdrop")?.classList.remove("open");

    // Điền trước thông tin thanh toán vào modal
    const { subtotal, shipping, discount, total } = CartService.calculateTotals();
    
    document.getElementById("checkout-subtotal").textContent = formatCurrency(subtotal);
    document.getElementById("checkout-shipping").textContent = shipping === 0 ? "Miễn phí" : formatCurrency(shipping);
    
    const discountRow = document.getElementById("checkout-discount-row");
    if (discount > 0) {
      discountRow.style.display = "flex";
      document.getElementById("checkout-discount").textContent = `-${formatCurrency(discount)}`;
    } else {
      discountRow.style.display = "none";
    }

    document.getElementById("checkout-total").textContent = formatCurrency(total);

    // Mở modal
    modal.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  },

  closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (modal) modal.classList.remove("modal-open");
    document.body.style.overflow = "";
  },

  // Xử lý submit form đặt hàng
  handleCheckoutSubmit(event) {
    event.preventDefault();

    const cart = StorageService.getCart();
    if (cart.length === 0) return;

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const note = document.getElementById("customer-note").value.trim();
    const paymentMethodEl = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentMethod = paymentMethodEl ? paymentMethodEl.value : "cod";

    if (!name || !phone || !address) {
      CartService.showToast("Vui lòng điền đầy đủ Tên, SĐT và Địa chỉ nhận hàng!", "error");
      return;
    }

    // Kiểm tra định dạng số điện thoại Việt Nam cơ bản
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone)) {
      CartService.showToast("Số điện thoại không hợp lệ, vui lòng kiểm tra lại!", "warning");
      return;
    }

    const { subtotal, shipping, discount, total } = CartService.calculateTotals();
    const orderId = "SDH-" + Math.floor(10000 + Math.random() * 90000);

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name,
        phone,
        address,
        note: note || "Không có"
      },
      items: cart.map(item => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        pot: item.pot,
        potDelta: item.potDelta,
        unitTotal: item.unitTotal
      })),
      couponCode: CartService.appliedCoupon ? CartService.appliedCoupon.code : null,
      discountAmount: discount,
      shippingFee: shipping,
      total: total,
      paymentMethod: paymentMethod,
      status: "processing"
    };

    // Lưu vào LocalStorage
    StorageService.addOrder(newOrder);
    this.currentOrder = newOrder;

    // Xóa giỏ hàng
    CartService.clearCart();

    // Đóng form checkout và mở popup thành công
    this.closeCheckoutModal();
    this.openSuccessModal(newOrder);
  },

  // Hiển thị modal đặt hàng thành công & Sinh mã VietQR
  openSuccessModal(order) {
    const successModal = document.getElementById("order-success-modal");
    if (!successModal) return;

    const config = StorageService.getConfig();

    document.getElementById("success-order-id").textContent = order.id;
    document.getElementById("success-customer-name").textContent = order.customer.name;
    document.getElementById("success-customer-phone").textContent = order.customer.phone;
    document.getElementById("success-customer-address").textContent = order.customer.address;
    document.getElementById("success-order-total").textContent = formatCurrency(order.total);
    document.getElementById("success-payment-method").textContent = 
      order.paymentMethod === "vietqr" ? "Chuyển khoản QR ngân hàng" : "Thanh toán khi nhận hàng (COD)";

    // Khu vực VietQR
    const qrSection = document.getElementById("vietqr-container");
    if (order.paymentMethod === "vietqr") {
      qrSection.style.display = "block";
      const addInfo = encodeURIComponent(`Thanh toan don ${order.id}`);
      const qrUrl = `https://img.vietqr.io/image/${config.bank.bankId}-${config.bank.accountNo}-compact2.png?amount=${order.total}&addInfo=${addInfo}&accountName=${encodeURIComponent(config.bank.accountName)}`;
      
      document.getElementById("vietqr-image").src = qrUrl;
      document.getElementById("qr-bank-name").textContent = config.bank.bankId;
      document.getElementById("qr-account-no").textContent = config.bank.accountNo;
      document.getElementById("qr-account-name").textContent = config.bank.accountName;
      document.getElementById("qr-amount").textContent = formatCurrency(order.total);
      document.getElementById("qr-content").textContent = `Thanh toan don ${order.id}`;
    } else {
      qrSection.style.display = "none";
    }

    // Cài đặt nút "Gửi đơn qua Zalo"
    const zaloBtn = document.getElementById("btn-send-zalo");
    if (zaloBtn) {
      zaloBtn.onclick = () => this.sendOrderToZalo(order);
    }

    successModal.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  },

  closeSuccessModal() {
    const successModal = document.getElementById("order-success-modal");
    if (successModal) successModal.classList.remove("modal-open");
    document.body.style.overflow = "";
  },

  // Tạo nội dung tin nhắn và mở liên kết Zalo chốt đơn
  sendOrderToZalo(order) {
    const config = StorageService.getConfig();
    const itemsText = order.items
      .map((item, idx) => `• ${idx + 1}. ${item.name} (${item.pot}) x${item.quantity} = ${formatCurrency(item.unitTotal * item.quantity)}`)
      .join("\n");

    const message = 
`🌱 [ĐƠN HÀNG SEN ĐÁ HOUSE] 🌱
Mã đơn: ${order.id}
Khách hàng: ${order.customer.name}
SĐT: ${order.customer.phone}
Địa chỉ: ${order.customer.address}
Ghi chú: ${order.customer.note}
---------------------------
Sản phẩm:
${itemsText}
---------------------------
Tạm tính + Ship: ${formatCurrency(order.total)}
Hình thức: ${order.paymentMethod === "vietqr" ? "Chuyển khoản QR" : "Thanh toán COD"}

👉 Nhờ Shop kiểm tra và giao hàng giúp mình sớm nhé!`;

    // Copy vào clipboard phòng khi Zalo chặn query param quá dài
    navigator.clipboard?.writeText(message);
    CartService.showToast("Đã sao chép nội dung đơn hàng! Đang chuyển hướng Zalo...", "success");

    // Mở Zalo số hotline shop
    setTimeout(() => {
      window.open(`https://zalo.me/${config.zaloPhone}`, "_blank");
    }, 600);
  },

  // In hóa đơn / Lưu PDF
  printOrderReceipt() {
    window.print();
  }
};
