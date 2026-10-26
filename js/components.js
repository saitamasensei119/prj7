// ===================================================
// SITE COMPONENTS (Header & Footer dùng chung toàn bộ các trang)
// HTX Nông Nghiệp & Chế Biến Sen Bách Liên • "Hương Sen Quê Bác"
// ===================================================

const SiteComponents = {
  // Sinh mã HTML cho Header dựa trên trang đang đứng (activePage)
  getHeaderHTML(activePage = "") {
    // Tự động nhận diện nếu không truyền vào
    if (!activePage) {
      const path = window.location.pathname.toLowerCase();
      if (path.includes("trai-nghiem")) {
        activePage = "experience";
      } else if (path.includes("tour")) {
        activePage = "tour";
      } else if (path.includes("dac-san")) {
        activePage = "shop";
      } else {
        activePage = "home";
      }
    }

    return `
      <!-- 1. Thanh thông báo ưu đãi (Top Bar) -->
      <header class="top-bar">
        <div class="container top-bar-inner">
          <div class="top-bar-tags">
            <span class="top-bar-tag"> Bách Liên - Hương Sen Quê Bác</span>
          </div>
          <div class="top-bar-links">
            <span>Voucher hôm nay:  <strong>SENQUEBAC</strong> (Giảm 10%) • Hotline / Zalo: <a href="tel:0988123456" class="phone-link-top">0988.123.456</a></span>
          </div>
        </div>
      </header>

      <!-- 2. Thanh điều hướng chính (Navbar) -->
      <nav class="navbar" id="main-navbar">
        <div class="container navbar-inner">
          <!-- Logo & Tên HTX -->
          <a href="index.html" class="brand" style="text-decoration: none;" title="Về trang chủ HTX Sen Bách Liên">
            <img 
              src="https://file.hstatic.net/200000313235/article/14_ecolotus_sen_trong_van_hoa_nguoi_vn_294504ba0d4a44ea96f843b7b67f3041_1024x1024.jpg" 
              alt="Logo HTX Sen Bách Liên" 
              class="brand-logo-img" 
              style="width: 44px; height: 44px; border-radius: 12px; object-fit: cover; box-shadow: var(--shadow-sm); display: block;" 
            />
            <div class="brand-text">
              <h1 style="font-size: 1.35rem; margin: 0; line-height: 1.1; font-family: var(--font-serif); font-weight: 700; color: var(--text-main);">Bách Liên</h1>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600; letter-spacing: 0.08em;">Hương Sen Quê Bác</span>
            </div>
          </a>

          

          <!-- Ô tìm kiếm tức thì -->
          <div class="search-box">
            <div class="search-input-wrap">
              <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                id="search-input" 
                class="search-input" 
                placeholder="Tìm trà tâm sen, hạt sen, trà bông, nến thơm..." 
                autocomplete="off" 
                aria-label="Tìm kiếm sản phẩm sen OCOP & Bộ học cụ" 
              />
            </div>
          </div>

          <!-- Cụm nút chức năng -->
          <div class="nav-actions">
            <!-- Đổi theme Sáng / Tối -->
            <button id="theme-toggle-btn" class="icon-btn" onclick="App.toggleTheme()" title="Chuyển chế độ Sáng / Tối" aria-label="Chuyển chế độ Sáng hoặc Tối">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>

            <!-- Tra cứu đơn hàng -->
            <button class="icon-btn" onclick="App.openOrderTrackingModal()" title="Tra cứu đơn hàng của bạn" aria-label="Tra cứu đơn hàng đã đặt">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </button>

            <!-- Giỏ hàng -->
            <button id="header-cart-btn" class="icon-btn" title="Xem giỏ hàng" aria-label="Xem giỏ hàng của bạn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span class="cart-badge-count" aria-live="polite">0</span>
            </button>

            <!-- Link tới Bảng Admin Demo -->
            <a href="admin.html" class="btn-admin-link" title="Mở trang quản trị đơn hàng, tour & khách đoàn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </a>
          </div>
        </div>
      </nav>
    `;
  },

  // Sinh mã HTML cho Footer thống nhất
  getFooterHTML() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <!-- Cột 1: Thông tin thương hiệu -->
            <div class="footer-brand">
              <div class="brand" style="margin-bottom: 12px;">
                <img 
                  src="https://file.hstatic.net/200000313235/article/14_ecolotus_sen_trong_van_hoa_nguoi_vn_294504ba0d4a44ea96f843b7b67f3041_1024x1024.jpg" 
                  alt="Logo HTX Sen Bách Liên" 
                  class="brand-logo-img" 
                  style="width: 44px; height: 44px; border-radius: 12px; object-fit: cover; display: block;" 
                />
                <div class="brand-text">
                  <h2 style="font-size: 1.25rem; font-family: var(--font-serif); font-weight: 700; color: var(--text-main); margin: 0;">Bách Liên</h2>
                  <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Hương Sen Quê Bác</span>
                </div>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 14px;">
                Hợp tác xã Nông nghiệp & Chế biến Sen Bách Liên. Tinh hoa nông sản OCOP 3 sao & 4 sao, công nghệ sấy lạnh khép kín Lio-Pharm bảo toàn nguyên vẹn dược tính tự nhiên.
              </p>
              <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.6;">
                📍 Xã Kim Liên, Huyện Nam Đàn, Tỉnh Nghệ An (Đầm Sen Quê Bác)<br />
                📞 Hotline / Zalo: <strong>0988.123.456</strong><br />
                ✉️ Email: senbachlien.namdan@gmail.com
              </p>
            </div>

            <!-- Cột 2: Sản phẩm OCOP -->
            <div class="footer-col">
              <h4>Sản Phẩm OCOP Tiêu Biểu</h4>
              <ul>
                <li><a href="index.html#catalog-section"> Trà Tâm Sen Sấy Lạnh (OCOP 4 Sao)</a></li>
                <li><a href="index.html#catalog-section"> Hạt Sen Sấy Giòn Nguyên Vị (OCOP 4 Sao)</a></li>
                <li><a href="index.html#catalog-section"> Trà Ướp Bông Sen Tươi (OCOP 4 Sao)</a></li>
                <li><a href="index.html#catalog-section"> Bánh Cà Hạt Sen Quê Bác (OCOP 3 Sao)</a></li>
                <li><a href="index.html#catalog-section"> Bộ Tự Làm Tranh Lá Sen & Nến Thơm DIY</a></li>
              </ul>
            </div>

            <!-- Cột 3: Trải nghiệm & Tour -->
            <div class="footer-col">
              <h4>Chủ Đề & Dịch Vụ</h4>
              <ul>
                <li><a href="trai-nghiem.html#theme-1"> Tuổi Thơ Ở Làng Sen (Giáo dục di sản)</a></li>
                <li><a href="trai-nghiem.html#theme-2"> Nghệ Nhân Sen Xứ Nghệ (3 Workshop STEM)</a></li>
                <li><a href="trai-nghiem.html#theme-3"> Làn Điệu Ví, Giặm Quê Hương (UNESCO)</a></li>
                <li><a href="trai-nghiem.html#group-booking-section"> Đăng Ký Khách Đoàn / Trường Học</a></li>
                <li><a href="index.html#tour-section"> Tour Một Ngày Làm Nông Dân</a></li>
                <li><a href="javascript:void(0)" onclick="App.openOrderTrackingModal()"> Tra cứu đơn hàng nông sản</a></li>
              </ul>
            </div>

            <!-- Cột 4: Bảng Quản Trị HTX -->
            <div class="footer-col">
              <h4>Bảng Quản Trị HTX</h4>
              <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
                Quản lý đơn hàng OCOP, lịch khách đặt tour nông dân và danh sách đoàn trường học đăng ký trải nghiệm.
              </p>
              <a href="admin.html" class="btn btn-primary" style="font-size: 0.84rem; padding: 8px 18px; display: inline-flex; align-items: center; gap: 6px;">
                Mở Bảng Admin Demo ➔
              </a>
            </div>
          </div>

          <div class="footer-bottom">
            <span>© 2026 HTX Sen Bách Liên - Kim Liên, Nam Đàn, Nghệ An. Website 100% Client-side tối ưu cho GitHub Pages.</span>
            <span>Hương sen quê Bác • Tinh hoa nông sản Việt </span>
          </div>
        </div>
      </footer>
    `;
  },

  // Tự động render vào các thẻ tùy biến hoặc ID
  renderAll() {
    // 1. Render Custom Element <site-header>
    document.querySelectorAll("site-header").forEach(el => {
      const active = el.getAttribute("active") || "";
      el.innerHTML = this.getHeaderHTML(active);
    });

    // 2. Render ID #site-header nếu có
    const headerEl = document.getElementById("site-header");
    if (headerEl && !headerEl.innerHTML.trim()) {
      const active = headerEl.getAttribute("data-active") || "";
      headerEl.innerHTML = this.getHeaderHTML(active);
    }

    // 3. Render Custom Element <site-footer>
    document.querySelectorAll("site-footer").forEach(el => {
      el.innerHTML = this.getFooterHTML();
    });

    // 4. Render ID #site-footer nếu có
    const footerEl = document.getElementById("site-footer");
    if (footerEl && !footerEl.innerHTML.trim()) {
      footerEl.innerHTML = this.getFooterHTML();
    }
  }
};

// Đăng ký Web Components native của trình duyệt
if (typeof customElements !== "undefined") {
  if (!customElements.get("site-header")) {
    customElements.define("site-header", class extends HTMLElement {
      connectedCallback() {
        const active = this.getAttribute("active") || "";
        this.innerHTML = SiteComponents.getHeaderHTML(active);
      }
    });
  }

  if (!customElements.get("site-footer")) {
    customElements.define("site-footer", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = SiteComponents.getFooterHTML();
      }
    });
  }
}

// Khởi chạy đồng bộ ngay khi load script
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => SiteComponents.renderAll());
} else {
  SiteComponents.renderAll();
}
