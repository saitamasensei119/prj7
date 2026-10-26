// Module giao diện chính & điều hướng HTX Sen Bách Liên (app.js)
// Thương hiệu: Bách Liên - "Hương sen quê Bác"

// ==========================================
// HÀM CHUẨN HÓA TIẾNG VIỆT & TÌM KIẾM ĐA NĂNG
// Hỗ trợ cả có dấu, không dấu, Unicode NFC/NFD, chữ hoa & thường
// ==========================================
function normalizeVietnamese(str) {
  if (!str) return "";
  return str.normalize("NFC").toLowerCase().trim();
}

function stripVietnameseTones(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function matchVietnameseSearch(targetText, query) {
  if (!query) return true;
  if (!targetText) return false;

  const normTarget = normalizeVietnamese(targetText);
  const normQuery = normalizeVietnamese(query);

  // 1. Khớp có dấu sau khi chuẩn hóa Unicode NFC & chữ thường (Khắc phục triệt để lỗi gõ bộ gõ tổ hợp)
  if (normTarget.includes(normQuery)) return true;

  // 2. Khớp không dấu (ví dụ: gõ 'bach lien' tìm ra cả 'Bách Liên' và 'Bạch Liên')
  const stripTarget = stripVietnameseTones(targetText);
  const stripQuery = stripVietnameseTones(query);
  if (stripTarget.includes(stripQuery)) return true;

  // 3. Tách từ đơn: gõ "tra sen", "hat sen", "bach lien"
  const tokens = stripQuery.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    return tokens.every(token => stripTarget.includes(token));
  }

  return false;
}

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
    CartService.renderCartUI();
    this.bindEvents();
    this.setupBackToTop();
    this.setupTourDefaults();
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

    // Lọc từ khóa tìm kiếm thông minh (khớp cả có dấu, không dấu, Unicode NFC/NFD, hoa/thường)
    if (this.searchKeyword) {
      const kw = this.searchKeyword;
      products = products.filter(p => {
        const searchableContent = [
          p.name,
          p.scientificName,
          p.categoryName,
          p.tag,
          p.shortDesc,
          p.description,
          p.origin,
          p.processMethod,
          p.packing,
          ...(p.benefits || [])
        ].filter(Boolean).join(" ");

        return matchVietnameseSearch(searchableContent, kw);
      });
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
              <span class="meta-pill" title="Công nghệ sơ chế">❄️ Sấy lạnh</span>
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
    if (diffEl) diffEl.textContent = product.ocopStars ? `OCOP ${product.ocopStars} Sao` : "Đạt Chuẩn VietGAP";
    
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
      const input = document.getElementById("tracking-input");
      if (input) input.focus();
    }
  },

  closeOrderTrackingModal() {
    const modal = document.getElementById("tracking-modal");
    if (modal) modal.classList.remove("modal-open");
    document.body.style.overflow = "";
  },

  // Tra cứu đơn hàng theo SĐT, Mã đơn hoặc Tên khách
  searchOrders(query) {
    const resultBox = document.getElementById("tracking-results-list");
    if (!resultBox) return;

    const q = (query || "").trim();
    if (!q) {
      resultBox.innerHTML = "";
      return;
    }

    const allOrders = StorageService.getOrders();
    const matched = allOrders.filter(o => {
      const target = `${o.id} ${o.customer?.name || ""} ${o.customer?.phone || ""} ${o.customer?.address || ""}`;
      return matchVietnameseSearch(target, q);
    });

    if (matched.length === 0) {
      resultBox.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted);">
          <p>Không tìm thấy đơn hàng nào khớp với: <strong>${q}</strong></p>
        </div>
      `;
      return;
    }

    resultBox.innerHTML = `
      <h4 style="margin-bottom: 12px; font-size: 0.95rem;">Tìm thấy ${matched.length} đơn hàng:</h4>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${matched.map(o => `
          <div style="border: 1px solid var(--surface-border); border-radius: var(--radius-sm); padding: 14px; background: var(--bg-subtle);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <strong>${o.id}</strong>
              <span class="badge" style="background: var(--primary-light); color: var(--primary);">
                ${o.status === 'completed' ? 'Đã giao' : o.status === 'shipping' ? 'Đang giao' : 'Đang xử lý'}
              </span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;">
              Khách hàng: <strong>${o.customer?.name}</strong> (${o.customer?.phone})
            </p>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 6px;">
              Ngày đặt: ${formatDateTime(o.createdAt)}
            </p>
            <p style="font-size: 0.9rem; font-weight: 700; color: var(--primary);">
              Tổng: ${formatCurrency(o.total)} (${o.items?.length || 0} món)
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
        }, 80);
      });

      // Nhấn Enter tự cuộn xuống phần sản phẩm
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
        }
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
  }
};

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
