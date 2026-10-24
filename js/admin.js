// Module quản trị Admin Demo cho Sen Đá House (admin.js)

const AdminApp = {
  currentTab: "orders", // 'orders' | 'products' | 'settings'

  init() {
    this.renderKPIs();
    this.renderOrdersTable();
    this.renderProductsTable();
    this.bindEvents();
  },

  // Hiển thị các thẻ chỉ số KPI
  renderKPIs() {
    const orders = StorageService.getOrders();
    const products = StorageService.getProducts();

    const totalRevenue = orders.reduce((sum, o) => {
      // Chỉ tính doanh thu các đơn không bị hủy
      return o.status !== "cancelled" ? sum + o.total : sum;
    }, 0);

    const pendingOrdersCount = orders.filter(o => o.status === "processing").length;
    const completedOrdersCount = orders.filter(o => o.status === "completed").length;

    document.getElementById("kpi-revenue").textContent = formatCurrency(totalRevenue);
    document.getElementById("kpi-orders-count").textContent = `${orders.length} đơn`;
    document.getElementById("kpi-pending-count").textContent = `${pendingOrdersCount} đơn`;
    document.getElementById("kpi-products-count").textContent = `${products.length} cây`;
  },

  // Hiển thị bảng danh sách đơn hàng
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
      const itemsList = order.items.map(i => `• ${i.name} (${i.pot}) x${i.quantity}`).join("<br/>");
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
            ${order.customer.note ? `<br/><small style="color: var(--accent); font-style: italic;">Note: ${order.customer.note}</small>` : ""}
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

  // Hiển thị danh sách sản phẩm quản trị
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
          <span class="badge" style="background: var(--bg-subtle); color: var(--text-main);">${prod.categoryName || prod.category}</span>
        </td>
        <td>
          <strong style="color: var(--primary);">${formatCurrency(prod.price)}</strong>
          ${prod.originalPrice > prod.price ? `<br/><small style="color: var(--text-light); text-decoration: line-through;">${formatCurrency(prod.originalPrice)}</small>` : ""}
        </td>
        <td>
          ⭐ ${prod.rating} (${prod.sold || 0} đã bán)
        </td>
        <td>
          <span class="badge" style="background: #dcfce7; color: #166534;">Còn ${prod.stock || 20} cây</span>
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
    const scientificName = document.getElementById("prod-scientific").value.trim();
    const category = document.getElementById("prod-category").value;
    const price = Number(document.getElementById("prod-price").value);
    const originalPrice = Number(document.getElementById("prod-original-price").value) || price;
    const difficulty = document.getElementById("prod-difficulty").value;
    const image = document.getElementById("prod-image").value.trim() || "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80";
    const shortDesc = document.getElementById("prod-desc").value.trim();

    const catNames = {
      "sen-da": "Sen Đá",
      "xuong-rong": "Xương Rồng",
      "combo": "Combo Quà Tặng",
      "phu-kien": "Chậu & Phụ Kiện"
    };

    const newProd = {
      name,
      scientificName,
      category,
      categoryName: catNames[category] || "Cây cảnh",
      price,
      originalPrice,
      difficulty,
      light: "Ánh sáng tán xạ 4-6h/ngày",
      water: "Tưới 1-2 lần/tuần",
      size: "7 - 9 cm",
      rating: 5.0,
      reviewsCount: 1,
      sold: 0,
      stock: 25,
      tag: "Mới về",
      image,
      gallery: [image],
      shortDesc,
      description: shortDesc
    };

    StorageService.upsertProduct(newProd);
    this.closeAddProductModal();
    this.renderProductsTable();
    this.renderKPIs();
    CartService.showToast(`Đã thêm cây "${name}" thành công!`, "success");
    e.target.reset();
  },

  // Xem chi tiết hóa đơn
  viewOrderInvoice(orderId) {
    const orders = StorageService.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    CheckoutService.openSuccessModal(order);
  },

  // Chuyển tab giữa Đơn Hàng & Sản Phẩm
  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });

    document.getElementById("admin-orders-section").style.display = tabName === "orders" ? "block" : "none";
    document.getElementById("admin-products-section").style.display = tabName === "products" ? "block" : "none";
  },

  bindEvents() {
    // Lọc trạng thái đơn
    const filterSelect = document.getElementById("admin-order-filter");
    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        this.renderOrdersTable(e.target.value);
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
