// Module giao diện chính & điều hướng HTX Sen Bách Liên (app.js)
// Thương hiệu: Bách Liên - "Hương sen quê Bác"

const App = {
  activeCategory: "all",
  activePriceRange: "all",
  activeOcopFilter: "all",
  searchKeyword: "",
  sortBy: "default",
  currentModalProduct: null,
  selectedPotOption: { name: "Quy cách tiêu chuẩn", priceDelta: 0 },
  modalQuantity: 1,

  // Trạng thái Tour nông nghiệp
  tourAdults: 2,
  tourChildren: 0,
  tourPriceAdult: 350000,
  tourPriceChild: 180000,

  init() {
    this.initTheme();
    this.renderProducts();
    if (typeof CartService !== "undefined") CartService.renderCartUI();
    this.bindEvents();
    this.setupBackToTop();
    this.setupTourDefaults();
    this.setupGroupDefaults();
    this.setupTourPageDefaults();
  },

  setupGroupDefaults() {
    const groupDateInput = document.getElementById("group-date");
    if (groupDateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const minDate = tomorrow.toISOString().split("T")[0];
      groupDateInput.min = minDate;
      if (!groupDateInput.value) {
        groupDateInput.value = minDate;
      }
      this.calcGroupEstimate();
    }
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

    // Lọc theo danh mục hoặc hạng sao OCOP
    if (this.activeCategory === "ocop-4") {
      products = products.filter(p => p.ocopStars === 4);
    } else if (this.activeCategory === "ocop-3") {
      products = products.filter(p => p.ocopStars === 3);
    } else if (this.activeCategory !== "all") {
      products = products.filter(p => p.category === this.activeCategory);
    }

    // Lọc theo khoảng giá
    if (this.activePriceRange === "under-100k") {
      products = products.filter(p => p.price < 100000);
    } else if (this.activePriceRange === "100k-200k") {
      products = products.filter(p => p.price >= 100000 && p.price <= 200000);
    } else if (this.activePriceRange === "over-200k") {
      products = products.filter(p => p.price > 200000);
    }

    // Lọc phụ theo phân hạng sao OCOP
    if (this.activeOcopFilter === "4") {
      products = products.filter(p => p.ocopStars === 4);
    } else if (this.activeOcopFilter === "3") {
      products = products.filter(p => p.ocopStars === 3);
    }

    // Lọc từ khóa tìm kiếm
    if (this.searchKeyword) {
      const kw = this.searchKeyword.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(kw) || 
        (p.scientificName && p.scientificName.toLowerCase().includes(kw)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(kw)) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(kw)) ||
        (p.description && p.description.toLowerCase().includes(kw))
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
      countEl.textContent = `Hiển thị ${filtered.length} sản phẩm OCOP & nông sản sen Bách Liên`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-products-view">
          <div class="empty-icon">🪷</div>
          <h3>Không tìm thấy sản phẩm sen nào phù hợp!</h3>
          <p>Thử đổi bộ lọc hoặc tìm từ khóa khác như "tâm sen", "hạt sen", "trà bông", "bánh cà"...</p>
          <button class="btn btn-outline" onclick="App.resetFilters()">Đặt lại bộ lọc</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(product => {
      const discountPercent = product.originalPrice > product.price 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
        : null;

      const ocopBadge = product.ocopStars 
        ? `<span class="badge badge-ocop ocop-star-${product.ocopStars}">⭐ OCOP ${product.ocopStars} Sao</span>`
        : "";

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-badge-group">
            ${ocopBadge}
            ${product.tag ? `<span class="badge badge-tag">${product.tag}</span>` : ""}
            ${discountPercent ? `<span class="badge badge-discount">-${discountPercent}%</span>` : ""}
          </div>
          
          <div class="product-thumb-wrapper" onclick="App.openQuickView(${product.id})">
            <img src="${product.image}" alt="${product.name} - ${product.categoryName || 'Sen Bách Liên'}" class="product-thumb" loading="lazy" />
            <button class="quick-view-overlay-btn" title="Xem nhanh chi tiết" aria-label="Xem chi tiết ${product.name}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Xem chi tiết
            </button>
          </div>

          <div class="product-body">
            <span class="product-category-label">${product.categoryName || "Nông Sản Sen"}</span>
            <h3 class="product-title" onclick="App.openQuickView(${product.id})" title="${product.name}">${product.name}</h3>
            <p class="product-scientific">${product.scientificName || "Hương sen quê Bác"}</p>
            
            <div class="product-meta-pills">
              <span class="meta-pill" title="Công nghệ / Loại hình">${product.category === 'hoc-cu-diy' ? '🎨 Tự làm DIY' : '❄️ Sấy lạnh'}</span>
              <span class="meta-pill" title="Quy cách đóng gói">📦 ${product.packing ? product.packing.split(' ')[0] + ' ' + (product.packing.split(' ')[1] || '') : "Hộp chuẩn"}</span>
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
    this.selectedPotOption = { 
      name: (product.packingOptions && product.packingOptions[0]) ? product.packingOptions[0].name : (product.packing || "Quy cách tiêu chuẩn"), 
      priceDelta: 0 
    };
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
    
    // Cập nhật thông số nông sản OCOP
    const diffEl = document.getElementById("qv-difficulty");
    if (diffEl) {
      diffEl.textContent = product.ocopStars 
        ? `OCOP ${product.ocopStars} Sao` 
        : (product.category === "hoc-cu-diy" ? "Học Cụ Sáng Tạo" : "Đạt Chuẩn VietGAP");
    }
    
    const lightEl = document.getElementById("qv-light");
    if (lightEl) lightEl.textContent = product.origin || "Xã Kim Liên, Nam Đàn, Nghệ An";
    
    const waterEl = document.getElementById("qv-water");
    if (waterEl) waterEl.textContent = product.processMethod || "Sấy lạnh khép kín Lio-Pharm";
    
    const sizeEl = document.getElementById("qv-size");
    if (sizeEl) sizeEl.textContent = product.packing || "Hộp cao cấp";

    document.getElementById("qv-qty-input").textContent = "1";

    // Danh sách thumbnail ảnh
    const thumbsContainer = document.getElementById("qv-thumbnails");
    const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
    thumbsContainer.innerHTML = gallery.map((img, i) => `
      <img src="${img}" class="qv-thumb-item ${i === 0 ? 'active' : ''}" onclick="App.changeQuickViewImage('${img}', this)" alt="${product.name}" />
    `).join("");

    // Render lựa chọn quy cách đóng gói
    const potOptions = product.packingOptions && product.packingOptions.length 
      ? product.packingOptions
      : [
          { name: product.packing || "Quy cách chuẩn", priceDelta: 0, desc: "Bao bì niêm phong tiệt trùng tiêu chuẩn" },
          { name: "Hộp quà biếu cao cấp (+45.000đ)", priceDelta: 45000, desc: "Kèm túi quai xách sang trọng làm quà" }
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

    // Cập nhật lại giá hiển thị theo quy cách
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

  // ==========================================
  // PHÂN HỆ ĐẶT TOUR NÔNG NGHIỆP TRẢI NGHIỆM
  // ==========================================
  setupTourDefaults() {
    const today = new Date();
    today.setDate(today.getDate() + 2); // Mặc định chọn ngày sau 2 hôm
    const dateInput = document.getElementById("tour-date-input");
    if (dateInput) {
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.value = `${yyyy}-${mm}-${dd}`;
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }
    this.calculateTourTotal();
  },

  openTourModal() {
    const modal = document.getElementById("tour-booking-modal");
    if (modal) {
      modal.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      this.calculateTourTotal();
    }
  },

  closeTourModal() {
    const modal = document.getElementById("tour-booking-modal");
    if (modal) modal.classList.remove("modal-open");
    document.body.style.overflow = "";
  },

  changeTourAdults(delta) {
    this.tourAdults = Math.max(1, this.tourAdults + delta);
    const el = document.getElementById("tour-adults-val");
    if (el) el.textContent = this.tourAdults;
    this.calculateTourTotal();
  },

  changeTourChildren(delta) {
    this.tourChildren = Math.max(0, this.tourChildren + delta);
    const el = document.getElementById("tour-children-val");
    if (el) el.textContent = this.tourChildren;
    this.calculateTourTotal();
  },

  calculateTourTotal() {
    const total = (this.tourAdults * this.tourPriceAdult) + (this.tourChildren * this.tourPriceChild);
    const totalEl = document.getElementById("tour-calc-total");
    if (totalEl) totalEl.textContent = formatCurrency(total);
    return total;
  },

  handleTourBookingSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("tour-name-input")?.value.trim();
    const phone = document.getElementById("tour-phone-input")?.value.trim();
    const date = document.getElementById("tour-date-input")?.value;
    const note = document.getElementById("tour-note-input")?.value.trim() || "";

    if (!name || !phone || !date) {
      CartService.showToast("Vui lòng điền đầy đủ họ tên, số điện thoại và ngày tham quan!", "error");
      return;
    }

    const total = this.calculateTourTotal();
    const bookingId = "TOUR-" + Date.now().toString().slice(-6);

    const booking = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      tourDate: date,
      customer: { name, phone, note },
      adults: this.tourAdults,
      children: this.tourChildren,
      total: total,
      status: "pending"
    };

    StorageService.addTourBooking(booking);
    this.closeTourModal();

    // Hiển thị thông báo thành công
    CartService.showToast(`Đăng ký tour thành công! Mã vé: ${bookingId}`, "success");

    // Mở liên kết Zalo hoặc tư vấn
    const config = StorageService.getConfig();
    const zaloMsg = `Chào HTX Sen Bách Liên, tôi vừa đăng ký Tour "Một ngày làm nông dân":%0A- Mã vé: ${bookingId}%0A- Người đặt: ${name} (${phone})%0A- Ngày đi: ${date}%0A- Số khách: ${this.tourAdults} Người lớn, ${this.tourChildren} Trẻ em%0A- Tổng tiền: ${formatCurrency(total)}%0A- Ghi chú: ${note || 'Không'}`;
    
    setTimeout(() => {
      if (confirm(`Đăng ký tour thành công! Bạn có muốn mở Zalo (${config.hotline}) để gửi xác nhận lịch trình ngay không?`)) {
        window.open(`https://zalo.me/${config.zaloPhone}?text=${zaloMsg}`, "_blank");
      }
    }, 400);
  },

  // Reset toàn bộ bộ lọc
  resetFilters() {
    this.activeCategory = "all";
    this.activePriceRange = "all";
    this.activeOcopFilter = "all";
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

  // Modal tra cứu đơn hàng
  openOrderTrackingModal() {
    const modal = document.getElementById("tracking-modal");
    if (modal) {
      modal.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      const input = document.getElementById("tracking-phone-input");
      if (input) input.focus();
    }
  },

  closeOrderTrackingModal() {
    const modal = document.getElementById("tracking-modal");
    if (modal) modal.classList.remove("modal-open");
    document.body.style.overflow = "";
  },

  handleOrderTrackingSubmit(e) {
    e.preventDefault();
    const phoneInput = document.getElementById("tracking-phone-input");
    const resultBox = document.getElementById("tracking-results-box");
    if (!phoneInput || !resultBox) return;

    const phone = phoneInput.value.trim();
    if (!phone) return;

    const allOrders = StorageService.getOrders();
    const matched = allOrders.filter(o => o.customer && o.customer.phone === phone);

    if (matched.length === 0) {
      resultBox.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted);">
          <p>Không tìm thấy đơn hàng nào với số điện thoại <strong>${phone}</strong>.</p>
        </div>
      `;
      return;
    }

    resultBox.innerHTML = `
      <h4 style="margin-bottom: 12px; font-size: 0.95rem;">Tìm thấy ${matched.length} đơn hàng của bạn:</h4>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${matched.map(o => `
          <div style="border: 1px solid var(--surface-border); border-radius: var(--radius-sm); padding: 14px; background: var(--bg-subtle);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <strong>${o.id}</strong>
              <span class="badge" style="background: var(--primary-light); color: var(--primary);">
                ${o.status === 'completed' ? 'Đã giao' : o.status === 'shipping' ? 'Đang giao' : 'Đang xử lý'}
              </span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">
              Ngày đặt: ${formatDateTime(o.createdAt)}
            </p>
            <p style="font-size: 0.9rem; font-weight: 700; color: var(--primary);">
              Tổng: ${formatCurrency(o.total)} (${o.items.length} món)
            </p>
          </div>
        `).join("")}
      </div>
    `;
  },

  // Gắn các sự kiện tương tác
  bindEvents() {
    // Tìm kiếm tức thì với debounce
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.searchKeyword = e.target.value;
          this.renderProducts();
        }, 120);
      });
    }

    // Chọn danh mục chính (Category Pills)
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

    // Chọn bộ lọc hạng sao OCOP
    document.querySelectorAll(".diff-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".diff-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeOcopFilter = btn.dataset.val;
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
        this.closeTourModal();
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
  },

  // ==========================================
  // XỬ LÝ ĐĂNG KÝ TRẢI NGHIỆM KHÁCH ĐOÀN (TRAI-NGHIEM.HTML)
  // ==========================================
  calcGroupEstimate() {
    const studentInput = document.getElementById("group-student-count");
    const packageSelect = document.getElementById("group-package");
    const totalEl = document.getElementById("estimate-total");
    if (!studentInput || !packageSelect || !totalEl) return;

    const count = Math.max(1, parseInt(studentInput.value) || 0);
    const pkg = packageSelect.value;
    let pricePerStudent = 260000;
    if (pkg === "nua-ngay") pricePerStudent = 180000;
    else if (pkg === "stem") pricePerStudent = 250000;

    const total = count * pricePerStudent;
    totalEl.textContent = formatCurrency(total);
    return total;
  },

  selectPackageOption(packageVal, packageName) {
    const packageSelect = document.getElementById("group-package");
    if (packageSelect) {
      packageSelect.value = packageVal;
      this.calcGroupEstimate();
    }
    const section = document.getElementById("group-booking-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  },

  handleGroupBookingSubmit(e) {
    e.preventDefault();
    const orgName = document.getElementById("group-org-name")?.value.trim();
    const leaderName = document.getElementById("group-leader-name")?.value.trim();
    const phone = document.getElementById("group-phone")?.value.trim();
    const email = document.getElementById("group-email")?.value.trim() || "";
    const visitDate = document.getElementById("group-date")?.value;
    const studentCount = parseInt(document.getElementById("group-student-count")?.value) || 0;
    const teacherCount = parseInt(document.getElementById("group-teacher-count")?.value) || 0;
    const packageSelect = document.getElementById("group-package");
    const packageType = packageSelect?.value || "tron-ngay";
    const packageName = packageSelect?.options[packageSelect.selectedIndex]?.text || "Gói Trọn Vẹn";
    const notes = document.getElementById("group-notes")?.value.trim() || "";
    const estimatedTotal = this.calcGroupEstimate() || 0;

    if (!orgName || !leaderName || !phone || !visitDate) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    const bookingId = "DOAN-2026-" + Math.floor(100 + Math.random() * 900);
    const bookingData = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      orgName,
      leaderName,
      phone,
      email,
      visitDate,
      packageType,
      packageName,
      studentCount,
      teacherCount,
      estimatedTotal,
      specialRequests: notes,
      status: "pending"
    };

    StorageService.addGroupBooking(bookingData);

    // Cập nhật giao diện modal xác nhận
    const resBookingId = document.getElementById("res-booking-id");
    const resOrgName = document.getElementById("res-org-name");
    const resLeaderName = document.getElementById("res-leader-name");
    const resPhone = document.getElementById("res-phone");
    const resPackage = document.getElementById("res-package");
    const resCounts = document.getElementById("res-counts");
    const resTotal = document.getElementById("res-total");

    if (resBookingId) resBookingId.textContent = bookingId;
    if (resOrgName) resOrgName.textContent = orgName;
    if (resLeaderName) resLeaderName.textContent = leaderName;
    if (resPhone) resPhone.textContent = phone;
    if (resPackage) resPackage.textContent = packageName;
    if (resCounts) resCounts.textContent = `${studentCount} học sinh/khách + ${teacherCount} giáo viên`;
    if (resTotal) resTotal.textContent = formatCurrency(estimatedTotal);

    // Tạo link Zalo tư vấn với nội dung chuẩn bị sẵn
    const zaloBtn = document.getElementById("res-zalo-btn");
    if (zaloBtn) {
      const zaloMsg = encodeURIComponent(
        `Chào HTX Sen Bách Liên, tôi là ${leaderName} đại diện ${orgName} (SĐT: ${phone}). Tôi vừa gửi phiếu đăng ký trải nghiệm đoàn mã ${bookingId} vào ngày ${visitDate} (${studentCount} học sinh, ${packageName}). Nhờ HTX gửi kế hoạch chi tiết và dự toán kinh phí giúp tôi nhé!`
      );
      zaloBtn.href = `https://zalo.me/0988123456?text=${zaloMsg}`;
    }

    // Hiển thị modal
    const modal = document.getElementById("group-success-modal");
    const backdrop = document.getElementById("group-success-backdrop");
    if (modal && backdrop) {
      modal.classList.add("open");
      backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    // Reset form
    e.target.reset();
    this.calcGroupEstimate();
  },

  closeGroupSuccessModal() {
    const modal = document.getElementById("group-success-modal");
    const backdrop = document.getElementById("group-success-backdrop");
    if (modal && backdrop) {
      modal.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.style.overflow = "";
    }
  },

  // ==========================================
  // XỬ LÝ TRANG CHUYÊN ĐỀ TOUR (TOUR.HTML)
  // ==========================================
  setupTourPageDefaults() {
    const tourDateInput = document.getElementById("tour-date");
    if (tourDateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const minDate = tomorrow.toISOString().split("T")[0];
      tourDateInput.min = minDate;
      if (!tourDateInput.value) {
        tourDateInput.value = minDate;
      }
      this.calcTourEstimate();
    }
  },

  switchTourTab(tabKey) {
    const btnSchool = document.getElementById("tab-btn-school");
    const btnPublic = document.getElementById("tab-btn-public");
    const gridSchool = document.getElementById("packages-school-grid");
    const gridPublic = document.getElementById("packages-public-grid");

    if (!btnSchool || !btnPublic || !gridSchool || !gridPublic) return;

    if (tabKey === "school") {
      btnSchool.classList.add("active");
      btnSchool.setAttribute("aria-selected", "true");
      btnPublic.classList.remove("active");
      btnPublic.setAttribute("aria-selected", "false");
      gridSchool.style.display = "grid";
      gridPublic.style.display = "none";
    } else {
      btnPublic.classList.add("active");
      btnPublic.setAttribute("aria-selected", "true");
      btnSchool.classList.remove("active");
      btnSchool.setAttribute("aria-selected", "false");
      gridPublic.style.display = "grid";
      gridSchool.style.display = "none";
    }
  },

  selectTourPackage(pkgId) {
    if (pkgId.startsWith("SCH")) {
      this.switchTourTab("school");
    } else {
      this.switchTourTab("public");
    }

    const select = document.getElementById("tour-pkg-select");
    if (select) {
      select.value = pkgId;
      this.calcTourEstimate();
    }

    const section = document.getElementById("tour-booking-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  },

  calcTourEstimate() {
    const select = document.getElementById("tour-pkg-select");
    const countInput = document.getElementById("tour-count");
    const teachersInput = document.getElementById("tour-teachers");
    const mealCheckbox = document.getElementById("tour-meal-checkbox");
    const mealOptionBox = document.getElementById("tour-meal-option-box");

    if (!select || !countInput) return;

    const pkgId = select.value;
    const count = Math.max(1, parseInt(countInput.value) || 1);
    const teachers = parseInt(teachersInput?.value) || 0;

    // Tìm gói trong data.js
    const pkg = (typeof TOUR_PACKAGES !== "undefined") 
      ? TOUR_PACKAGES.find(p => p.id === pkgId) 
      : null;

    if (!pkg) return;

    // Cập nhật nhãn số lượng nếu là gói Combo gia đình
    const countLabel = document.getElementById("tour-count-label");
    const countHint = document.getElementById("tour-count-hint");
    if (pkg.isCombo) {
      if (countLabel) countLabel.textContent = "Số lượng combo gia đình (3–5 người/combo) *";
      if (countHint) countHint.textContent = "(Đã bao gồm mâm cơm sen đặc sản & HDV riêng)";
    } else if (pkg.category === "school") {
      if (countLabel) countLabel.textContent = "Số lượng học sinh tham gia *";
      if (countHint) countHint.textContent = "(Tỷ lệ 15 học sinh được miễn phí vé 1 giáo viên phụ trách)";
    } else {
      if (countLabel) countLabel.textContent = "Số lượng khách tham gia *";
      if (countHint) countHint.textContent = "(Áp dụng cho khách đại chúng, người lớn & trẻ em)";
    }

    // Ẩn hiện tùy chọn cơm quê sen (chỉ áp dụng cho SCH-02)
    const hasMeal = pkg.hasMealOption && mealCheckbox && mealCheckbox.checked;
    if (mealOptionBox) {
      mealOptionBox.style.display = pkg.hasMealOption ? "block" : "none";
    }

    // Tính tổng tiền
    let unitPrice = pkg.basePrice;
    let extraMealPerPerson = hasMeal ? (pkg.mealPrice || 40000) : 0;
    let total = (unitPrice + extraMealPerPerson) * count;

    // Cập nhật giao diện dự toán
    const estPkgName = document.getElementById("est-package-name");
    const estUnitPrice = document.getElementById("est-unit-price");
    const estMealRow = document.getElementById("est-meal-row");
    const estHeadcount = document.getElementById("est-headcount");
    const estTotal = document.getElementById("est-total-amount");

    if (estPkgName) estPkgName.textContent = pkg.name;
    if (estUnitPrice) {
      estUnitPrice.textContent = `${formatCurrency(pkg.basePrice)} / ${pkg.unit}`;
    }
    if (estMealRow) {
      estMealRow.style.display = hasMeal ? "flex" : "none";
    }
    if (estHeadcount) {
      if (pkg.isCombo) {
        estHeadcount.textContent = `${count} combo gia đình`;
      } else if (pkg.category === "school") {
        estHeadcount.textContent = `${count} học sinh + ${teachers} giáo viên`;
      } else {
        estHeadcount.textContent = `${count} khách`;
      }
    }
    if (estTotal) {
      estTotal.textContent = formatCurrency(total);
    }

    // Cập nhật link Zalo trực tiếp
    const zaloDirectBtn = document.getElementById("btn-zalo-tour-direct");
    if (zaloDirectBtn) {
      const zaloTxt = encodeURIComponent(
        `Chào HTX Sen Bách Liên, tôi muốn tư vấn đăng ký gói "${pkg.name}" (${count} ${pkg.unit}). Dự toán dự kiến: ${formatCurrency(total)}. Nhờ HTX gửi kế hoạch chi tiết giúp tôi nhé!`
      );
      zaloDirectBtn.href = `https://zalo.me/0988123456?text=${zaloTxt}`;
    }

    return total;
  },

  handleTourBookingSubmit(e) {
    e.preventDefault();
    const select = document.getElementById("tour-pkg-select");
    const contactName = document.getElementById("tour-contact-name")?.value.trim();
    const phone = document.getElementById("tour-phone")?.value.trim();
    const org = document.getElementById("tour-org")?.value.trim() || "";
    const visitDate = document.getElementById("tour-date")?.value;
    const count = parseInt(document.getElementById("tour-count")?.value) || 1;
    const teachers = parseInt(document.getElementById("tour-teachers")?.value) || 0;
    const notes = document.getElementById("tour-notes")?.value.trim() || "";
    const mealCheckbox = document.getElementById("tour-meal-checkbox");
    const hasMeal = mealCheckbox ? mealCheckbox.checked : false;

    if (!select || !contactName || !phone || !visitDate) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    const pkgId = select.value;
    const pkg = (typeof TOUR_PACKAGES !== "undefined") ? TOUR_PACKAGES.find(p => p.id === pkgId) : null;
    const packageName = pkg ? pkg.name : select.options[select.selectedIndex]?.text;
    const estimatedTotal = this.calcTourEstimate() || 0;
    const bookingId = "TOUR-" + Math.floor(1000 + Math.random() * 9000);

    const bookingData = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      pkgId: pkgId,
      packageName: packageName,
      contactName: contactName,
      phone: phone,
      org: org,
      visitDate: visitDate,
      count: count,
      teachers: teachers,
      hasMeal: hasMeal,
      notes: notes,
      total: estimatedTotal,
      status: "pending"
    };

    // Lưu vào LocalStorage qua StorageService
    if (typeof StorageService !== "undefined") {
      StorageService.addTourBooking(bookingData);
    }

    // Điền dữ liệu vào modal biên nhận
    const rId = document.getElementById("tour-receipt-id");
    const rPkg = document.getElementById("tour-receipt-pkg");
    const rContact = document.getElementById("tour-receipt-contact");
    const rPhone = document.getElementById("tour-receipt-phone");
    const rOrg = document.getElementById("tour-receipt-org");
    const rDate = document.getElementById("tour-receipt-date");
    const rCounts = document.getElementById("tour-receipt-counts");
    const rTotal = document.getElementById("tour-receipt-total");

    if (rId) rId.textContent = bookingId;
    if (rPkg) rPkg.textContent = packageName;
    if (rContact) rContact.textContent = contactName;
    if (rPhone) rPhone.textContent = phone;
    if (rOrg) rOrg.textContent = org || "Khách tự do";
    if (rDate) rDate.textContent = visitDate;
    if (rCounts) {
      rCounts.textContent = (pkg && pkg.isCombo) 
        ? `${count} combo gia đình` 
        : `${count} khách ${teachers > 0 ? '(+' + teachers + ' người phụ trách)' : ''}`;
    }
    if (rTotal) rTotal.textContent = formatCurrency(estimatedTotal);

    // Cập nhật nút Zalo trong modal
    const zaloModalBtn = document.getElementById("tour-receipt-zalo-btn");
    if (zaloModalBtn) {
      const msg = encodeURIComponent(
        `Chào HTX Sen Bách Liên, tôi là ${contactName} (${org ? org + ', ' : ''}SĐT: ${phone}). Tôi vừa gửi phiếu đặt tour mã ${bookingId} vào ngày ${visitDate} (${packageName}, ${count} ${pkg ? pkg.unit : 'người'}). Dự toán: ${formatCurrency(estimatedTotal)}. Nhờ HTX xác nhận và tư vấn chi tiết giúp tôi nhé!`
      );
      zaloModalBtn.href = `https://zalo.me/0988123456?text=${msg}`;
    }

    // Hiển thị modal
    const modal = document.getElementById("tour-success-modal");
    const backdrop = document.getElementById("tour-success-backdrop");
    if (modal && backdrop) {
      modal.classList.add("open");
      backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    // Reset form
    e.target.reset();
    this.setupTourPageDefaults();
  },

  closeTourSuccessModal() {
    const modal = document.getElementById("tour-success-modal");
    const backdrop = document.getElementById("tour-success-backdrop");
    if (modal && backdrop) {
      modal.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.style.overflow = "";
    }
  }
};

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
