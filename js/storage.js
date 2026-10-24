// Quản lý lưu trữ LocalStorage cho Sen Đá House
// Thay thế hoàn toàn CSDL truyền thống, hoạt động offline / tĩnh trên GitHub Pages

const STORAGE_KEYS = {
  PRODUCTS: "senda_products_v1",
  CART: "senda_cart_v1",
  ORDERS: "senda_orders_v1",
  COUPONS: "senda_coupons_v1",
  SHOP_CONFIG: "senda_config_v1",
  THEME: "senda_theme_v1"
};

const StorageService = {
  // Khởi tạo dữ liệu và tự động đồng bộ khi data.js có chỉnh sửa
  init() {
    let stored = null;
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS));
    } catch (e) {
      stored = null;
    }

    if (!stored || !Array.isArray(stored) || stored.length === 0) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    } else {
      // Tự động phát hiện khi bạn sửa ảnh, giá, mô tả trong data.js để cập nhật ngay vào LocalStorage
      let hasChanges = false;
      INITIAL_PRODUCTS.forEach(seedProd => {
        const idx = stored.findIndex(p => p.id === seedProd.id);
        if (idx >= 0) {
          if (
            stored[idx].image !== seedProd.image ||
            stored[idx].name !== seedProd.name ||
            stored[idx].price !== seedProd.price ||
            stored[idx].originalPrice !== seedProd.originalPrice ||
            stored[idx].shortDesc !== seedProd.shortDesc ||
            JSON.stringify(stored[idx].gallery) !== JSON.stringify(seedProd.gallery)
          ) {
            stored[idx] = { ...stored[idx], ...seedProd };
            hasChanges = true;
          }
        } else {
          stored.push(seedProd);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(stored));
      }
    }

    if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(INITIAL_COUPONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SHOP_CONFIG)) {
      localStorage.setItem(STORAGE_KEYS.SHOP_CONFIG, JSON.stringify(SHOP_CONFIG));
    }
  },

  // Lấy danh sách sản phẩm
  getProducts() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
    } catch (e) {
      console.error("Lỗi đọc sản phẩm từ LocalStorage:", e);
      return INITIAL_PRODUCTS;
    }
  },

  // Lưu danh sách sản phẩm
  saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent("products_updated", { detail: products }));
  },

  // Thêm hoặc cập nhật một sản phẩm
  upsertProduct(product) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...products[index], ...product };
    } else {
      product.id = Date.now();
      products.unshift(product);
    }
    this.saveProducts(products);
    return product;
  },

  // Xóa sản phẩm theo ID
  deleteProduct(productId) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== Number(productId));
    this.saveProducts(products);
  },

  // Giỏ hàng
  getCart() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart_updated", { detail: cart }));
  },

  // Đơn hàng
  getOrders() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    } catch (e) {
      return INITIAL_ORDERS;
    }
  },

  saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent("orders_updated", { detail: orders }));
  },

  addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);
    return order;
  },

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const target = orders.find(o => o.id === orderId);
    if (target) {
      target.status = newStatus;
      this.saveOrders(orders);
      return true;
    }
    return false;
  },

  // Mã giảm giá
  getCoupons() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.COUPONS)) || [];
    } catch (e) {
      return INITIAL_COUPONS;
    }
  },

  // Cấu hình shop
  getConfig() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOP_CONFIG)) || SHOP_CONFIG;
    } catch (e) {
      return SHOP_CONFIG;
    }
  },

  // Khôi phục dữ liệu gốc ban đầu (Cực kỳ tiện khi demo)
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(INITIAL_COUPONS));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SHOP_CONFIG, JSON.stringify(SHOP_CONFIG));
    window.location.reload();
  }
};

// Hàm tiện ích định dạng tiền tệ VND
function formatCurrency(amount) {
  if (isNaN(amount)) return "0 đ";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

// Hàm tiện ích định dạng ngày giờ Việt Nam
function formatDateTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Khởi chạy sẵn khi file được nạp
StorageService.init();
