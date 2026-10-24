// Module giao diện chính & điều hướng Sen Đá House (app.js)

const App = {
  activeCategory: "all",
  activePriceRange: "all",
  activeDifficulty: "all",
  searchKeyword: "",
  sortBy: "default",
  currentModalProduct: null,
  selectedPotOption: { name: "Chậu nhựa ươm", priceDelta: 0 },
  modalQuantity: 1,

  init() {
    this.initTheme();
    this.renderProducts();
    CartService.renderCartUI();
    this.bindEvents();
    this.setupBackToTop();
  },

  // Khởi tạo chế độ Sáng / Tối
  initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.innerHTML = savedTheme === "dark" 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
    this.initTheme();
  },

  // Lọc và sắp xếp sản phẩm
  getFilteredProducts() {
    let products = StorageService.getProducts();

    // Lọc theo danh mục
    if (this.activeCategory !== "all") {
      products = products.filter(p => p.category === this.activeCategory);
    }

    // Lọc theo giá
    if (this.activePriceRange === "under-50k") {
      products = products.filter(p => p.price < 50000);
    } else if (this.activePriceRange === "50k-100k") {
      products = products.filter(p => p.price >= 50000 && p.price <= 100000);
    } else if (this.activePriceRange === "over-100k") {
      products = products.filter(p => p.price > 100000);
    }

    // Lọc theo độ khó chăm sóc
    if (this.activeDifficulty !== "all") {
      products = products.filter(p => p.difficulty.toLowerCase().includes(this.activeDifficulty.toLowerCase()));
    }

    // Lọc từ khóa tìm kiếm
    if (this.searchKeyword) {
      const kw = this.searchKeyword.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(kw) || 
        (p.scientificName && p.scientificName.toLowerCase().includes(kw)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(kw)) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(kw))
      );
    }

    // Sắp xếp
    if (this.sortBy === "price-asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === "price-desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === "sold") {
      products.sort((a, b) => (b.sold || 0) - (a.sold || 0));
    }

    return products;
  },

  // Hiển thị danh sách sản phẩm ra lưới
  renderProducts() {
    const grid = document.getElementById("product-grid");
    const countEl = document.getElementById("product-count-display");
    if (!grid) return;

    const filtered = this.getFilteredProducts();

    if (countEl) {
      countEl.textContent = `Hiển thị ${filtered.length} cây cảnh phù hợp`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-products-view">
          <div class="empty-icon">🌵</div>
          <h3>Không tìm thấy loại cây nào phù hợp!</h3>
          <p>Thử đổi bộ lọc hoặc tìm từ khóa khác như "sen đá nâu", "ngọc bích", "combo"...</p>
          <button class="btn btn-outline" onclick="App.resetFilters()">Đặt lại bộ lọc</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(product => {
      const discountPercent = product.originalPrice > product.price 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
        : null;

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-badge-group">
            ${product.tag ? `<span class="badge badge-tag">${product.tag}</span>` : ""}
            ${discountPercent ? `<span class="badge badge-discount">-${discountPercent}%</span>` : ""}
          </div>
          
          <div class="product-thumb-wrapper" onclick="App.openQuickView(${product.id})">
            <img src="${product.image}" alt="Cây ${product.name} - ${product.categoryName || 'Sen Đá'}" class="product-thumb" loading="lazy" />
            <button class="quick-view-overlay-btn" title="Xem nhanh chi tiết" aria-label="Xem nhanh chi tiết ${product.name}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Xem nhanh
            </button>
          </div>

          <div class="product-body">
            <span class="product-category-label">${product.categoryName || "Sen Đá"}</span>
            <h3 class="product-title" onclick="App.openQuickView(${product.id})" title="${product.name}">${product.name}</h3>
            <p class="product-scientific">${product.scientificName || ""}</p>
            
            <div class="product-meta-pills">
              <span class="meta-pill" title="Mức độ chăm sóc">🌿 ${product.difficulty}</span>
              <span class="meta-pill" title="Kích cỡ">📏 ${product.size}</span>
            </div>

            <div class="product-price-row">
              <div class="price-wrap">
                <span class="current-price">${formatCurrency(product.price)}</span>
                ${product.originalPrice > product.price ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ""}
              </div>
              <div class="rating-info">
                ⭐ <strong>${product.rating}</strong> <span class="rating-count">(${product.sold || 0} đã bán)</span>
              </div>
            </div>

            <div class="product-actions-row">
              <button class="btn btn-primary btn-add-cart" onclick="CartService.addItem(${product.id}, 1)" aria-label="Thêm ${product.name} vào giỏ hàng">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  },

  // Mở Popup xem nhanh chi tiết sản phẩm
  openQuickView(productId) {
    const products = StorageService.getProducts();
    const product = products.find(p => p.id === Number(productId));
    if (!product) return;

    this.currentModalProduct = product;
    this.selectedPotOption = { name: "Chậu nhựa ươm", priceDelta: 0 };
    this.modalQuantity = 1;

    const modal = document.getElementById("quickview-modal");
    if (!modal) return;

    // Điền dữ liệu
    document.getElementById("qv-img-main").src = product.image;
    document.getElementById("qv-name").textContent = product.name;
    document.getElementById("qv-scientific").textContent = product.scientificName || "";
    document.getElementById("qv-price").textContent = formatCurrency(product.price);
    document.getElementById("qv-rating").textContent = product.rating;
    document.getElementById("qv-reviews").textContent = `(${product.reviewsCount || 45} đánh giá)`;
    document.getElementById("qv-sold").textContent = `${product.sold || 100} đã bán`;
    document.getElementById("qv-short-desc").textContent = product.shortDesc || product.description;
    document.getElementById("qv-difficulty").textContent = product.difficulty;
    document.getElementById("qv-light").textContent = product.light;
    document.getElementById("qv-water").textContent = product.water;
    document.getElementById("qv-size").textContent = product.size;
    document.getElementById("qv-qty-input").textContent = "1";

    // Danh sách thumbnail ảnh
    const thumbsContainer = document.getElementById("qv-thumbnails");
    const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
    thumbsContainer.innerHTML = gallery.map((img, i) => `
      <img src="${img}" class="qv-thumb-item ${i === 0 ? 'active' : ''}" onclick="App.changeQuickViewImage('${img}', this)" />
    `).join("");

    // Render lựa chọn chậu
    const potOptions = [
      { name: "Chậu nhựa ươm", priceDelta: 0, desc: "Nhẹ, tiện thay chậu sau" },
      { name: "Chậu đất nung mộc (+15.000đ)", priceDelta: 15000, desc: "Thoát ẩm mát rễ tối ưu" },
      { name: "Chậu gốm men hỏa biến (+35.000đ)", priceDelta: 35000, desc: "Sang trọng, decor bàn làm việc" }
    ];

    const potContainer = document.getElementById("qv-pot-options");
    potContainer.innerHTML = potOptions.map((opt, idx) => `
      <label class="pot-radio-card ${idx === 0 ? 'selected' : ''}" onclick="App.selectPotOption('${opt.name}', ${opt.priceDelta}, this)">
        <input type="radio" name="potOption" value="${opt.name}" ${idx === 0 ? 'checked' : ''} />
        <div class="pot-info">
          <strong>${opt.name}</strong>
          <small>${opt.desc}</small>
        </div>
      </label>
    `).join("");

    modal.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  },

  changeQuickViewImage(src, element) {
    document.getElementById("qv-img-main").src = src;
    document.querySelectorAll(".qv-thumb-item").forEach(el => el.classList.remove("active"));
    if (element) element.classList.add("active");
  },

  selectPotOption(name, priceDelta, labelEl) {
    this.selectedPotOption = { name, priceDelta };
    document.querySelectorAll(".pot-radio-card").forEach(el => el.classList.remove("selected"));
    if (labelEl) labelEl.classList.add("selected");

    // Cập nhật lại giá hiển thị theo chậu
    if (this.currentModalProduct) {
      const newPrice = this.currentModalProduct.price + priceDelta;
      document.getElementById("qv-price").textContent = formatCurrency(newPrice);
    }
  },

  updateModalQty(delta) {
    this.modalQuantity = Math.max(1, this.modalQuantity + delta);
    document.getElementById("qv-qty-input").textContent = this.modalQuantity;
  },

  addCurrentModalToCart() {
    if (!this.currentModalProduct) return;
    CartService.addItem(this.currentModalProduct.id, this.modalQuantity, this.selectedPotOption);
    this.closeQuickView();
  },

  closeQuickView() {
    const modal = document.getElementById("quickview-modal");
    if (modal) modal.classList.remove("modal-open");
    document.body.style.overflow = "";
  },

  // Reset toàn bộ bộ lọc
  resetFilters() {
    this.activeCategory = "all";
    this.activePriceRange = "all";
    this.activeDifficulty = "all";
    this.searchKeyword = "";
    this.sortBy = "default";

    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";

    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) sortSelect.value = "default";

    document.querySelectorAll(".category-pill").forEach(el => {
      el.classList.toggle("active", el.dataset.cat === "all");
    });

    document.querySelectorAll(".filter-btn-group button").forEach(el => {
      el.classList.toggle("active", el.dataset.val === "all");
    });

    this.renderProducts();
  },

  // Tra cứu đơn hàng đã đặt bằng SĐT hoặc Mã đơn
  openOrderTrackingModal() {
    const modal = document.getElementById("tracking-modal");
    if (!modal) return;
    modal.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    this.searchOrders("");
  },

  closeOrderTrackingModal() {
    const modal = document.getElementById("tracking-modal");
    if (modal) modal.classList.remove("modal-open");
    document.body.style.overflow = "";
  },

  searchOrders(keyword) {
    const listContainer = document.getElementById("tracking-results-list");
    if (!listContainer) return;

    const orders = StorageService.getOrders();
    const kw = keyword.toLowerCase().trim();

    const filtered = kw ? orders.filter(o => 
      o.id.toLowerCase().includes(kw) || 
      o.customer.phone.includes(kw) ||
      o.customer.name.toLowerCase().includes(kw)
    ) : orders;

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state-card">
          <p>Không tìm thấy đơn hàng nào khớp với "<strong>${keyword}</strong>".</p>
          <small>Vui lòng kiểm tra lại số điện thoại hoặc mã đơn (VD: SDH-98214).</small>
        </div>
      `;
      return;
    }

    const statusMap = {
      processing: { text: "Chờ xác nhận & đóng gói", colorClass: "status-orange" },
      shipping: { text: "Đang vận chuyển", colorClass: "status-blue" },
      completed: { text: "Đã giao thành công", colorClass: "status-green" },
      cancelled: { text: "Đã hủy đơn", colorClass: "status-red" }
    };

    listContainer.innerHTML = filtered.map(order => {
      const st = statusMap[order.status] || { text: order.status, colorClass: "status-gray" };
      return `
        <div class="order-tracking-card">
          <div class="order-track-header">
            <div>
              <span class="order-track-id">${order.id}</span>
              <span class="order-track-date">• Ngày đặt: ${formatDateTime(order.createdAt)}</span>
            </div>
            <span class="order-status-badge ${st.colorClass}">${st.text}</span>
          </div>

          <div class="order-track-customer">
            <p><strong>Người nhận:</strong> ${order.customer.name} - ${order.customer.phone}</p>
            <p><strong>Địa chỉ:</strong> ${order.customer.address}</p>
          </div>

          <div class="order-track-items">
            ${order.items.map(i => `
              <div class="track-item-row">
                <span>${i.name} (${i.pot}) × ${i.quantity}</span>
                <span>${formatCurrency(i.unitTotal * i.quantity)}</span>
              </div>
            `).join("")}
          </div>

          <div class="order-track-footer">
            <span>Tổng thanh toán:</span>
            <strong class="total-highlight">${formatCurrency(order.total)}</strong>
          </div>
        </div>
      `;
    }).join("");
  },

  // Gán sự kiện tương tác
  bindEvents() {
    // Tìm kiếm
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchKeyword = e.target.value;
        this.renderProducts();
      });
    }

    // Chọn danh mục
    document.querySelectorAll(".category-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.activeCategory = pill.dataset.cat;
        this.renderProducts();
      });
    });

    // Chọn bộ lọc giá
    document.querySelectorAll(".price-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".price-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activePriceRange = btn.dataset.val;
        this.renderProducts();
      });
    });

    // Chọn bộ lọc chăm sóc
    document.querySelectorAll(".diff-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".diff-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeDifficulty = btn.dataset.val;
        this.renderProducts();
      });
    });

    // Sắp xếp
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.renderProducts();
      });
    }

    // Mở / Đóng Drawer giỏ hàng
    const openCartBtn = document.getElementById("header-cart-btn");
    const closeCartBtn = document.getElementById("cart-drawer-close-btn");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartBackdrop = document.getElementById("cart-backdrop");

    if (openCartBtn && cartDrawer && cartBackdrop) {
      const toggleCart = () => {
        cartDrawer.classList.toggle("open");
        cartBackdrop.classList.toggle("open");
      };
      openCartBtn.addEventListener("click", toggleCart);
      if (closeCartBtn) closeCartBtn.addEventListener("click", toggleCart);
      cartBackdrop.addEventListener("click", toggleCart);
    }

    // Áp dụng voucher
    const applyCouponBtn = document.getElementById("apply-coupon-btn");
    const couponInput = document.getElementById("coupon-code-input");
    if (applyCouponBtn && couponInput) {
      applyCouponBtn.addEventListener("click", () => {
        if (couponInput.value) {
          CartService.applyCoupon(couponInput.value);
          couponInput.value = "";
        }
      });
    }

    // Nút mở checkout
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => CheckoutService.openCheckoutModal());
    }

    // Submit form checkout
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => CheckoutService.handleCheckoutSubmit(e));
    }

    // Lắng nghe cập nhật sản phẩm / đơn hàng từ tab khác nếu có
    window.addEventListener("products_updated", () => this.renderProducts());

    // Đóng drawer và modal khi bấm phím Escape (Chuẩn Accessibility WCAG)
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeQuickView();
        this.closeOrderTrackingModal();
        if (typeof CheckoutService !== "undefined") {
          CheckoutService.closeCheckoutModal();
          CheckoutService.closeSuccessModal();
        }
        if (typeof AdminApp !== "undefined") {
          AdminApp.closeAddProductModal();
        }
        const cartDrawer = document.getElementById("cart-drawer");
        const cartBackdrop = document.getElementById("cart-backdrop");
        if (cartDrawer && cartDrawer.classList.contains("open")) {
          cartDrawer.classList.remove("open");
          cartBackdrop?.classList.remove("open");
          document.body.style.overflow = "";
        }
      }
    });
  },

  // Nút cuộn lên đầu trang
  setupBackToTop() {
    const btn = document.getElementById("back-to-top-btn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
