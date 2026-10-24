// Module quản lý Giỏ Hàng & Khuyến Mãi cho Sen Đá House

const CartService = {
  appliedCoupon: null,
  baseShippingFee: 25000,
  freeShipThreshold: 300000,

  getCart() {
    return StorageService.getCart();
  },

  // Thêm sản phẩm vào giỏ
  addItem(productId, quantity = 1, potOption = { name: "Chậu nhựa ươm", priceDelta: 0 }) {
    const products = StorageService.getProducts();
    const product = products.find(p => p.id === Number(productId));
    if (!product) return false;

    const cart = this.getCart();
    // Tạo cartItemId kết hợp ID và loại chậu để phân biệt biến thể
    const cartItemId = `${product.id}_${potOption.name}`;

    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        pot: potOption.name,
        potDelta: potOption.priceDelta || 0,
        unitTotal: product.price + (potOption.priceDelta || 0),
        quantity: quantity
      });
    }

    StorageService.saveCart(cart);
    this.renderCartUI();
    this.showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, "success");
    return true;
  },

  // Cập nhật số lượng
  updateQuantity(cartItemId, delta) {
    const cart = this.getCart();
    const item = cart.find(i => i.cartItemId === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(cartItemId);
      return;
    }

    StorageService.saveCart(cart);
    this.renderCartUI();
  },

  // Xóa món khỏi giỏ
  removeItem(cartItemId) {
    let cart = this.getCart();
    cart = cart.filter(i => i.cartItemId !== cartItemId);
    StorageService.saveCart(cart);
    this.renderCartUI();
    this.showToast("Đã xóa sản phẩm khỏi giỏ hàng", "info");
  },

  // Xóa toàn bộ giỏ
  clearCart() {
    StorageService.saveCart([]);
    this.appliedCoupon = null;
    this.renderCartUI();
  },

  // Áp dụng mã giảm giá
  applyCoupon(code) {
    const cleanCode = code.trim().toUpperCase();
    const coupons = StorageService.getCoupons();
    const coupon = coupons.find(c => c.code === cleanCode);

    if (!coupon) {
      this.showToast("Mã giảm giá không tồn tại hoặc đã hết hạn!", "error");
      return false;
    }

    const { subtotal } = this.calculateTotals();
    if (subtotal < coupon.minOrder) {
      this.showToast(`Mã này chỉ áp dụng cho đơn từ ${formatCurrency(coupon.minOrder)}!`, "warning");
      return false;
    }

    this.appliedCoupon = coupon;
    this.renderCartUI();
    this.showToast(`Đã áp dụng mã "${coupon.code}" thành công!`, "success");
    return true;
  },

  removeCoupon() {
    this.appliedCoupon = null;
    this.renderCartUI();
    this.showToast("Đã gỡ mã giảm giá", "info");
  },

  // Tính toán tổng tiền
  calculateTotals() {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.unitTotal * item.quantity), 0);
    
    // Phí ship: Miễn phí nếu trên 300k, ngược lại 25k
    let shipping = subtotal > 0 ? (subtotal >= this.freeShipThreshold ? 0 : this.baseShippingFee) : 0;
    
    // Giảm giá từ coupon
    let discount = 0;
    if (this.appliedCoupon && subtotal >= this.appliedCoupon.minOrder) {
      if (this.appliedCoupon.discountPercent) {
        discount = Math.round((subtotal * this.appliedCoupon.discountPercent) / 100);
      } else if (this.appliedCoupon.discountAmount) {
        discount = this.appliedCoupon.discountAmount;
      }
    }

    // Tổng tiền không âm
    const total = Math.max(0, subtotal + shipping - discount);

    return {
      subtotal,
      shipping,
      discount,
      total,
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
  },

  // Cập nhật giao diện Drawer Giỏ Hàng
  renderCartUI() {
    const cart = this.getCart();
    const { subtotal, shipping, discount, total, itemCount } = this.calculateTotals();

    // Cập nhật badge đếm số lượng trên header
    const cartBadges = document.querySelectorAll(".cart-badge-count");
    cartBadges.forEach(badge => {
      badge.textContent = itemCount;
      badge.style.display = itemCount > 0 ? "flex" : "none";
    });

    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartEmptyState = document.getElementById("cart-empty-state");
    const cartFooter = document.getElementById("cart-drawer-footer");

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      if (cartEmptyState) cartEmptyState.style.display = "flex";
      cartItemsContainer.style.display = "none";
      if (cartFooter) cartFooter.style.display = "none";
      return;
    }

    if (cartEmptyState) cartEmptyState.style.display = "none";
    cartItemsContainer.style.display = "flex";
    if (cartFooter) cartFooter.style.display = "block";

    // Render danh sách item
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="Cây ${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-title-row">
            <h4 class="cart-item-name">${item.name}</h4>
            <button class="cart-item-remove-btn" onclick="CartService.removeItem('${item.cartItemId}')" title="Xóa món này" aria-label="Xóa ${item.name} khỏi giỏ hàng">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
            </button>
          </div>
          <p class="cart-item-pot">Phân loại: <span>${item.pot}</span></p>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatCurrency(item.unitTotal)}</span>
            <div class="qty-control">
              <button class="qty-btn" onclick="CartService.updateQuantity('${item.cartItemId}', -1)" aria-label="Giảm 1 số lượng cho ${item.name}">-</button>
              <span class="qty-val" aria-live="polite">${item.quantity}</span>
              <button class="qty-btn" onclick="CartService.updateQuantity('${item.cartItemId}', 1)" aria-label="Tăng 1 số lượng cho ${item.name}">+</button>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    // Render tóm tắt thanh toán
    document.getElementById("cart-subtotal").textContent = formatCurrency(subtotal);
    const shippingEl = document.getElementById("cart-shipping");
    if (shipping === 0 && subtotal > 0) {
      shippingEl.innerHTML = '<span class="badge-free">Miễn phí ship</span>';
    } else {
      shippingEl.textContent = formatCurrency(shipping);
    }

    const discountRow = document.getElementById("cart-discount-row");
    if (discount > 0) {
      discountRow.style.display = "flex";
      document.getElementById("cart-discount").textContent = `-${formatCurrency(discount)}`;
    } else {
      discountRow.style.display = "none";
    }

    document.getElementById("cart-final-total").textContent = formatCurrency(total);

    // Hiển thị coupon đang áp dụng
    const activeCouponBox = document.getElementById("active-coupon-box");
    if (this.appliedCoupon) {
      activeCouponBox.style.display = "flex";
      activeCouponBox.innerHTML = `
        <span class="coupon-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          ${this.appliedCoupon.code} (-${this.appliedCoupon.discountPercent ? this.appliedCoupon.discountPercent + '%' : formatCurrency(this.appliedCoupon.discountAmount)})
        </span>
        <button class="remove-coupon-btn" onclick="CartService.removeCoupon()">Gỡ bỏ</button>
      `;
    } else {
      activeCouponBox.style.display = "none";
    }
  },

  // Hiển thị thông báo Toast gọn nhẹ
  showToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    const icon = type === "success" ? "✓" : type === "warning" ? "!" : type === "error" ? "✕" : "ℹ";
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("toast-show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};
