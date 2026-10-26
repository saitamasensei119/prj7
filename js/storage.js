// Quản lý lưu trữ LocalStorage cho HTX Sen Bách Liên
// Hoạt động 100% offline & client-side trên GitHub Pages, không cần server/CSDL

const STORAGE_KEYS = {
  PRODUCTS: "bachlien_products_v1",
  CART: "bachlien_cart_v1",
  ORDERS: "bachlien_orders_v1",
  TOURS: "bachlien_tours_v1",
  GROUP_BOOKINGS: "bachlien_group_bookings_v1",
  COUPONS: "bachlien_coupons_v1",
  SHOP_CONFIG: "bachlien_config_v1",
  THEME: "bachlien_theme_v1"
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
      // Tự động phát hiện khi cập nhật data.js để đồng bộ vào LocalStorage
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
            stored[idx].ocopStars !== seedProd.ocopStars ||
            stored[idx].category !== seedProd.category ||
            JSON.stringify(stored[idx].packingOptions) !== JSON.stringify(seedProd.packingOptions) ||
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
    if (!localStorage.getItem(STORAGE_KEYS.TOURS)) {
      localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(typeof INITIAL_TOURS !== 'undefined' ? INITIAL_TOURS : []));
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

  // Đơn hàng nông sản
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

  // Quản lý Đặt Tour Nông Nghiệp
  getTours() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.TOURS)) || [];
    } catch (e) {
      return typeof INITIAL_TOURS !== 'undefined' ? INITIAL_TOURS : [];
    }
  },

  saveTours(tours) {
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(tours));
    window.dispatchEvent(new CustomEvent("tours_updated", { detail: tours }));
  },

  addTourBooking(booking) {
    const tours = this.getTours();
    tours.unshift(booking);
    this.saveTours(tours);
    return booking;
  },

  updateTourStatus(tourId, newStatus) {
    const tours = this.getTours();
    const target = tours.find(t => t.id === tourId);
    if (target) {
      target.status = newStatus;
      this.saveTours(tours);
      return true;
    }
    return false;
  },

  // Đăng ký trải nghiệm khách đoàn / trường học
  getGroupBookings() {
    this.init();
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GROUP_BOOKINGS);
      if (stored) return JSON.parse(stored);
      if (typeof INITIAL_GROUP_BOOKINGS !== "undefined") {
        return INITIAL_GROUP_BOOKINGS;
      }
      return [];
    } catch (e) {
      return typeof INITIAL_GROUP_BOOKINGS !== "undefined" ? INITIAL_GROUP_BOOKINGS : [];
    }
  },

  saveGroupBookings(bookings) {
    localStorage.setItem(STORAGE_KEYS.GROUP_BOOKINGS, JSON.stringify(bookings));
  },

  addGroupBooking(booking) {
    const list = this.getGroupBookings();
    list.unshift(booking);
    this.saveGroupBookings(list);
    return booking;
  },

  updateGroupBookingStatus(bookingId, newStatus) {
    const list = this.getGroupBookings();
    const target = list.find(b => b.id === bookingId);
    if (target) {
      target.status = newStatus;
      this.saveGroupBookings(list);
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

  // Khôi phục dữ liệu gốc ban đầu
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(INITIAL_COUPONS));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(typeof INITIAL_TOURS !== 'undefined' ? INITIAL_TOURS : []));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SHOP_CONFIG, JSON.stringify(SHOP_CONFIG));
    window.location.reload();
  }
};

// Định dạng tiền tệ VND
function formatCurrency(amount) {
  if (typeof amount !== "number" || isNaN(amount)) return "0 đ";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(amount)
    .replace("₫", "đ");
}

// Định dạng ngày giờ
function formatDateTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleDateString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}
