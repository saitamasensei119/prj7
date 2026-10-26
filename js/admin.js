// Module quản trị Admin Demo cho HTX Sen Bách Liên (admin.js)
// Quản lý đơn hàng OCOP, lịch đăng ký Tour nông nghiệp & danh mục sản phẩm

const AdminApp = {
  currentTab: "orders", // 'orders' | 'tours' | 'products'

  init() {
    this.renderKPIs();
    this.renderOrdersTable();
    this.renderToursTable();
    this.renderGroupBookings();
    this.renderProductsTable();
    this.bindEvents();
  },

  // Hiển thị các thẻ chỉ số KPI
  renderKPIs() {
    const orders = StorageService.getOrders();
    const tours = StorageService.getTours();
    const groups = StorageService.getGroupBookings();
    const products = StorageService.getProducts();

    const orderRevenue = orders.reduce((sum, o) => {
      return o.status !== "cancelled" ? sum + o.total : sum;
    }, 0);

    const tourRevenue = tours.reduce((sum, t) => {
      return t.status !== "cancelled" ? sum + (t.total || 0) : sum;
    }, 0);

    const groupRevenue = groups.reduce((sum, g) => {
      return g.status !== "cancelled" ? sum + (g.estimatedTotal || 0) : sum;
    }, 0);

    const pendingOrdersCount = orders.filter(o => o.status === "processing").length;
    const totalTourGuests = tours.reduce((sum, t) => sum + (t.adults || 0) + (t.children || 0), 0);
    const totalStudents = groups.reduce((sum, g) => sum + (g.studentCount || 0), 0);

    document.getElementById("kpi-revenue").textContent = formatCurrency(orderRevenue + tourRevenue + groupRevenue);
    document.getElementById("kpi-orders-count").textContent = `${orders.length} đơn`;
    document.getElementById("kpi-pending-count").textContent = `${tours.length} tour • ${groups.length} đoàn (${totalStudents} HS)`;
    document.getElementById("kpi-products-count").textContent = `${products.length} sản phẩm`;
  },

  // Hiển thị bảng danh sách đơn hàng nông sản
  renderOrdersTable(filterStatus = "all") {
    const tbody = document.getElementById("admin-orders-tbody");
    if (!tbody) return;

    let orders = StorageService.getOrders();
    if (filterStatus !== "all") {
      orders = orders.filter(o => o.status === filterStatus);
    }

    if (orders.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
            Chưa có đơn hàng nào trong mục này.
          </td>
        </tr>
      `;
      return;
    }

    const statusOptions = [
      { val: "processing", label: "Chờ xác nhận" },
      { val: "shipping", label: "Đang giao hàng" },
      { val: "completed", label: "Đã giao thành công" },
      { val: "cancelled", label: "Đã hủy đơn" }
    ];

    tbody.innerHTML = orders.map(order => {
      const itemsList = order.items.map(i => `• ${i.name} (${i.pot || 'Tiêu chuẩn'}) x${i.quantity}`).join("<br/>");
      const paymentBadge = order.paymentMethod === "vietqr" 
        ? `<span class="badge" style="background: #0284c7; color: white;">VietQR</span>`
        : `<span class="badge" style="background: #64748b; color: white;">COD</span>`;

      return `
        <tr>
          <td>
            <strong>${order.id}</strong>
            <br/><small style="color: var(--text-light);">${formatDateTime(order.createdAt)}</small>
          </td>
          <td>
            <strong>${order.customer.name}</strong>
            <br/><span style="color: var(--primary); font-size: 0.82rem;">📞 ${order.customer.phone}</span>
            <br/><small style="color: var(--text-muted);">${order.customer.address}</small>
            ${order.customer.note ? `<br/><small style="color: var(--accent); font-style: italic;">Ghi chú: ${order.customer.note}</small>` : ""}
          </td>
          <td style="font-size: 0.85rem; line-height: 1.4;">
            ${itemsList}
          </td>
          <td>
            ${paymentBadge}
          </td>
          <td>
            <strong style="color: var(--primary); font-size: 1rem;">${formatCurrency(order.total)}</strong>
            ${order.couponCode ? `<br/><small style="color: var(--success);">Mã: ${order.couponCode}</small>` : ""}
          </td>
          <td>
            <select class="custom-select status-select" onchange="AdminApp.handleStatusChange('${order.id}', this.value)">
              ${statusOptions.map(opt => `
                <option value="${opt.val}" ${order.status === opt.val ? 'selected' : ''}>${opt.label}</option>
              `).join("")}
            </select>
          </td>
          <td>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="AdminApp.viewOrderInvoice('${order.id}')">
              Chi tiết
            </button>
          </td>
        </tr>
      `;
    }).join("");
  },

  // Cập nhật trạng thái đơn
  handleStatusChange(orderId, newStatus) {
    StorageService.updateOrderStatus(orderId, newStatus);
    this.renderKPIs();
    CartService.showToast(`Đã đổi trạng thái đơn ${orderId} thành công!`, "success");
  },

  // ==========================================
  // HIỂN THỊ BẢNG ĐẶT TOUR NÔNG NGHIỆP
  // ==========================================
  renderToursTable(filterStatus = "all") {
    const tbody = document.getElementById("admin-tours-tbody");
    if (!tbody) return;

    let tours = StorageService.getTours();
    if (filterStatus !== "all") {
      tours = tours.filter(t => t.status === filterStatus);
    }

    if (tours.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
            Chưa có lịch đặt tour nào trong mục này.
          </td>
        </tr>
      `;
      return;
    }

    const tourStatusOptions = [
      { val: "pending", label: "Chờ xác nhận" },
      { val: "confirmed", label: "Đã xác nhận" },
      { val: "completed", label: "Đã hoàn thành" },
      { val: "cancelled", label: "Đã hủy" }
    ];

    tbody.innerHTML = tours.map(tour => {
      const tourFormattedDate = tour.tourDate ? new Date(tour.tourDate).toLocaleDateString("vi-VN", { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }) : "Chưa chọn";
      
      return `
        <tr>
          <td>
            <strong>${tour.id}</strong>
            <br/><small style="color: var(--text-light);">${formatDateTime(tour.createdAt)}</small>
          </td>
          <td>
            <strong style="color: var(--primary); font-size: 0.95rem;">📅 ${tourFormattedDate}</strong>
          </td>
          <td>
            <strong>${tour.customer.name}</strong>
            <br/><span style="color: var(--primary); font-size: 0.82rem;">📞 ${tour.customer.phone}</span>
            ${tour.customer.email ? `<br/><small style="color: var(--text-muted);">✉️ ${tour.customer.email}</small>` : ""}
            ${tour.customer.note ? `<br/><small style="color: var(--accent); font-style: italic;">Yêu cầu: ${tour.customer.note}</small>` : ""}
          </td>
          <td>
            <strong>${tour.adults}</strong> Người lớn
            ${tour.children > 0 ? `<br/><small style="color: var(--text-muted);">${tour.children} Trẻ em</small>` : ""}
          </td>
          <td>
            <strong style="color: var(--primary); font-size: 1rem;">${formatCurrency(tour.total)}</strong>
          </td>
          <td>
            <select class="custom-select status-select" onchange="AdminApp.handleTourStatusChange('${tour.id}', this.value)">
              ${tourStatusOptions.map(opt => `
                <option value="${opt.val}" ${tour.status === opt.val ? 'selected' : ''}>${opt.label}</option>
              `).join("")}
            </select>
          </td>
          <td>
            <a href="https://zalo.me/${tour.customer.phone}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 4px;">
              💬 Zalo Khách
            </a>
          </td>
        </tr>
      `;
    }).join("");
  },

  handleTourStatusChange(tourId, newStatus) {
    StorageService.updateTourStatus(tourId, newStatus);
    this.renderKPIs();
    CartService.showToast(`Đã cập nhật trạng thái vé ${tourId}!`, "success");
  },

  // ==========================================
  // HIỂN THỊ BẢNG ĐĂNG KÝ TRẢI NGHIỆM KHÁCH ĐOÀN
  // ==========================================
  renderGroupBookings(filterStatus = "all") {
    const tbody = document.getElementById("admin-groups-tbody");
    if (!tbody) return;

    const selectEl = document.getElementById("admin-group-filter");
    if (selectEl && filterStatus === "all") {
      filterStatus = selectEl.value;
    }

    let groups = StorageService.getGroupBookings();
    if (filterStatus !== "all") {
      groups = groups.filter(g => g.status === filterStatus);
    }

    if (groups.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px; color: var(--text-muted);">
            Chưa có đoàn trường học / cơ quan nào trong mục này.
          </td>
        </tr>
      `;
      return;
    }

    const groupStatusOptions = [
      { val: "pending", label: "Chờ xác nhận" },
      { val: "confirmed", label: "Đã xác nhận" },
      { val: "completed", label: "Đã hoàn thành" },
      { val: "cancelled", label: "Đã hủy" }
    ];

    tbody.innerHTML = groups.map(g => {
      const visitFormattedDate = g.visitDate ? new Date(g.visitDate).toLocaleDateString("vi-VN", { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }) : "Chưa chọn";

      return `
        <tr>
          <td>
            <strong style="color: var(--primary);">${g.id}</strong>
            <br/><small style="color: var(--text-light);">${formatDateTime(g.createdAt)}</small>
          </td>
          <td>
            <strong style="font-size: 0.95rem;">${g.orgName}</strong>
            ${g.specialRequests ? `<br/><small style="color: var(--accent); font-style: italic;">Yêu cầu: ${g.specialRequests}</small>` : ""}
          </td>
          <td>
            <strong>${g.leaderName}</strong>
            <br/><span style="color: var(--primary); font-size: 0.82rem;">📞 ${g.phone}</span>
            ${g.email ? `<br/><small style="color: var(--text-muted);">✉️ ${g.email}</small>` : ""}
          </td>
          <td>
            <strong style="color: var(--primary);">📅 ${visitFormattedDate}</strong>
          </td>
          <td style="font-size: 0.85rem;">
            ${g.packageName}
          </td>
          <td>
            <strong>${g.studentCount}</strong> Học sinh/Khách
            ${g.teacherCount > 0 ? `<br/><small style="color: var(--text-muted);">${g.teacherCount} Giáo viên</small>` : ""}
          </td>
          <td>
            <strong style="color: var(--primary); font-size: 1rem;">${formatCurrency(g.estimatedTotal)}</strong>
          </td>
          <td>
            <select class="custom-select status-select" onchange="AdminApp.handleGroupStatusChange('${g.id}', this.value)">
              ${groupStatusOptions.map(opt => `
                <option value="${opt.val}" ${g.status === opt.val ? 'selected' : ''}>${opt.label}</option>
              `).join("")}
            </select>
          </td>
          <td>
            <a href="https://zalo.me/${g.phone}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 4px;">
              💬 Zalo Đoàn
            </a>
          </td>
        </tr>
      `;
    }).join("");
  },

  handleGroupStatusChange(bookingId, newStatus) {
    StorageService.updateGroupBookingStatus(bookingId, newStatus);
    this.renderKPIs();
    CartService.showToast(`Đã cập nhật trạng thái đoàn ${bookingId}!`, "success");
  },

  // Hiển thị danh sách sản phẩm OCOP
  renderProductsTable() {
    const tbody = document.getElementById("admin-products-tbody");
    if (!tbody) return;

    const products = StorageService.getProducts();

    tbody.innerHTML = products.map(prod => `
      <tr>
        <td>
          <img src="${prod.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;" alt="${prod.name}" />
        </td>
        <td>
          <strong>${prod.name}</strong>
          <br/><small style="color: var(--text-muted); font-style: italic;">${prod.scientificName || ""}</small>
        </td>
        <td>
          <span class="badge ${prod.ocopStars ? 'badge-ocop ocop-star-' + prod.ocopStars : ''}" style="margin-bottom: 4px; display: inline-block;">
            ${prod.ocopStars ? `⭐ OCOP ${prod.ocopStars} Sao` : 'Tiêu chuẩn'}
          </span>
          <br/><small style="color: var(--text-muted);">${prod.categoryName || prod.category}</small>
        </td>
        <td>
          <strong style="color: var(--primary);">${formatCurrency(prod.price)}</strong>
          ${prod.originalPrice > prod.price ? `<br/><small style="color: var(--text-light); text-decoration: line-through;">${formatCurrency(prod.originalPrice)}</small>` : ""}
        </td>
        <td>
          ⭐ ${prod.rating} (${prod.sold || 0} đã bán)
        </td>
        <td>
          <span class="badge" style="background: #dcfce7; color: #166534;">Còn ${prod.stock || 20} sp</span>
        </td>
        <td>
          <button class="btn btn-secondary" style="padding: 6px 10px; font-size: 0.78rem; color: var(--danger);" onclick="AdminApp.deleteProduct(${prod.id})">
            Xóa
          </button>
        </td>
      </tr>
    `).join("");
  },

  // Xóa sản phẩm
  deleteProduct(productId) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách demo?")) {
      StorageService.deleteProduct(productId);
      this.renderProductsTable();
      this.renderKPIs();
      CartService.showToast("Đã xóa sản phẩm thành công!", "info");
    }
  },

  // Mở modal thêm sản phẩm mới
  openAddProductModal() {
    const modal = document.getElementById("add-product-modal");
    if (modal) {
      modal.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    }
  },

  closeAddProductModal() {
    const modal = document.getElementById("add-product-modal");
    if (modal) {
      modal.classList.remove("modal-open");
      document.body.style.overflow = "";
    }
  },

  // Xử lý thêm sản phẩm mới
  handleAddProductSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("prod-name").value.trim();
    const scientificName = document.getElementById("prod-scientific")?.value.trim() || "";
    const category = document.getElementById("prod-category").value;
    const ocopStars = Number(document.getElementById("prod-ocop-stars")?.value || 4);
    const price = Number(document.getElementById("prod-price").value);
    const originalPrice = Number(document.getElementById("prod-original-price").value) || price;
    const packing = document.getElementById("prod-packing")?.value.trim() || "Hộp tiêu chuẩn";
    const image = document.getElementById("prod-image").value.trim() || "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80";
    const shortDesc = document.getElementById("prod-desc").value.trim();

    const catNames = {
      "tra-sen": "Trà Sen Thượng Hạng",
      "nong-san-sen": "Nông Sản & Hạt Sen",
      "qua-tang": "Hộp Quà Biếu OCOP",
      "hoc-cu-diy": "Bộ Học Cụ DIY Sen"
    };

    const newProd = {
      name,
      scientificName,
      category,
      categoryName: catNames[category] || "Nông sản Sen",
      ocopStars,
      price,
      originalPrice,
      packing,
      origin: "Xã Kim Liên, Nam Đàn, Nghệ An",
      processMethod: "Sấy lạnh khép kín Lio-Pharm",
      rating: 5.0,
      reviewsCount: 1,
      sold: 0,
      stock: 30,
      tag: `OCOP ${ocopStars} Sao`,
      image,
      gallery: [image],
      shortDesc,
      description: shortDesc,
      packingOptions: [
        { name: packing, priceDelta: 0, desc: "Đóng gói tiêu chuẩn HTX Bách Liên" }
      ]
    };

    StorageService.upsertProduct(newProd);
    this.closeAddProductModal();
    this.renderProductsTable();
    this.renderKPIs();
    CartService.showToast(`Đã thêm sản phẩm "${name}" thành công!`, "success");
    e.target.reset();
  },

  // Xem chi tiết hóa đơn
  viewOrderInvoice(orderId) {
    const orders = StorageService.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    CheckoutService.openSuccessModal(order);
  },

  // Chuyển tab giữa Đơn Hàng, Đặt Tour, Khách Đoàn & Sản Phẩm
  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });

    const ordersSec = document.getElementById("admin-orders-section");
    const toursSec = document.getElementById("admin-tours-section");
    const groupsSec = document.getElementById("admin-groups-section");
    const productsSec = document.getElementById("admin-products-section");

    if (ordersSec) ordersSec.style.display = tabName === "orders" ? "block" : "none";
    if (toursSec) toursSec.style.display = tabName === "tours" ? "block" : "none";
    if (groupsSec) groupsSec.style.display = tabName === "groups" ? "block" : "none";
    if (productsSec) productsSec.style.display = tabName === "products" ? "block" : "none";
  },

  bindEvents() {
    // Lọc trạng thái đơn
    const filterSelect = document.getElementById("admin-order-filter");
    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        this.renderOrdersTable(e.target.value);
      });
    }

    // Lọc trạng thái tour
    const tourFilterSelect = document.getElementById("admin-tour-filter");
    if (tourFilterSelect) {
      tourFilterSelect.addEventListener("change", (e) => {
        this.renderToursTable(e.target.value);
      });
    }

    // Submit form thêm sản phẩm
    const addForm = document.getElementById("add-product-form");
    if (addForm) {
      addForm.addEventListener("submit", (e) => this.handleAddProductSubmit(e));
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.initTheme();
  AdminApp.init();
});
