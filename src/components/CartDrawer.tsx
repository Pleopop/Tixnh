import { motion, AnimatePresence } from "framer-motion";
import { useCart, PRICE_MAP } from "../context/CartContext";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}

export function CartDrawer() {
  const { items, status, closeCart, goToCheckout, removeItem, updateQty, totalPrice, totalItems } =
    useCart();

  const isOpen = status === "cart";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-tinh-ink/30 backdrop-blur-[2px]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35 }}
            className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-md flex-col bg-tinh-cream shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-tinh-dusk/25 px-6 py-5">
              <div>
                <h2 className="font-serif text-xl tracking-tight text-tinh-ink">Giỏ hàng</h2>
                {totalItems > 0 && (
                  <p className="mt-0.5 font-sans text-xs text-tinh-muted">
                    {totalItems} sản phẩm
                  </p>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full text-tinh-muted transition hover:bg-tinh-paper hover:text-tinh-ink"
                aria-label="Đóng giỏ hàng"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tinh-paper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="h-8 w-8 text-tinh-dusk">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </div>
                  <p className="font-serif text-lg text-tinh-muted">Giỏ hàng trống</p>
                  <p className="mt-1 font-sans text-sm text-tinh-dusk">Thêm sản phẩm để bắt đầu</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 rounded-full border border-tinh-dusk/50 px-6 py-2.5 font-sans text-sm text-tinh-ink transition hover:bg-tinh-paper"
                  >
                    Khám phá sản phẩm
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const price = PRICE_MAP[item.product.id] ?? 185000;
                    return (
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 rounded-xl border border-tinh-dusk/20 bg-white/60 p-4"
                      >
                        {item.product.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-20 w-16 flex-shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div
                            className="h-20 w-16 flex-shrink-0 rounded-lg"
                            style={{
                              background: `linear-gradient(135deg, ${item.product.accentColor}cc, ${item.product.accentColor}44)`,
                            }}
                          />
                        )}
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-serif text-base text-tinh-ink">{item.product.name}</p>
                              <p className="mt-0.5 font-sans text-xs text-tinh-muted">
                                {formatVND(price)} / túi
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="ml-2 flex h-6 w-6 items-center justify-center text-tinh-dusk transition hover:text-tinh-ink"
                              aria-label="Xóa"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-tinh-dusk/30 bg-tinh-paper px-1 py-0.5">
                              <button
                                onClick={() => updateQty(item.product.id, item.quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-tinh-muted transition hover:bg-tinh-dusk/20 hover:text-tinh-ink"
                              >
                                −
                              </button>
                              <span className="w-5 text-center font-sans text-sm text-tinh-ink">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.product.id, item.quantity + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-tinh-muted transition hover:bg-tinh-dusk/20 hover:text-tinh-ink"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-sans text-sm font-semibold text-tinh-sageDeep">
                              {formatVND(price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-tinh-dusk/25 bg-tinh-cream px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-tinh-muted">Tổng cộng</span>
                  <span className="font-serif text-2xl text-tinh-ink">{formatVND(totalPrice)}</span>
                </div>
                <p className="mt-1 font-sans text-[11px] text-tinh-dusk">Phí vận chuyển sẽ được tính khi thanh toán</p>
                <button
                  onClick={goToCheckout}
                  className="mt-4 w-full rounded-full bg-tinh-sageDeep py-3.5 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-tinh-ink"
                >
                  Tiến hành đặt hàng →
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
