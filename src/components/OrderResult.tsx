import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}

export function OrderResult() {
  const { status, orderCode, shippingInfo, paymentMethod, cancelOrder } = useCart();

  const isSuccess = status === "success";
  const isCancelled = status === "cancelled";

  return (
    <AnimatePresence>
      {(isSuccess || isCancelled) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-tinh-ink/40 backdrop-blur-[3px] p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="w-full max-w-sm rounded-3xl bg-tinh-cream p-8 shadow-2xl text-center"
          >
            {isSuccess ? (
              <>
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-tinh-sageDeep/10"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10 text-tinh-sageDeep">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-tinh-sageDeep">
                    Đặt hàng thành công
                  </p>
                  <h2 className="mt-3 font-serif text-3xl text-tinh-ink">Cảm ơn bạn!</h2>
                  <p className="mt-2 font-sans text-sm text-tinh-muted">
                    Đơn hàng của bạn đã được ghi nhận và đang được xử lý.
                  </p>

                  <div className="mt-6 rounded-2xl border border-tinh-dusk/20 bg-white/70 p-4 text-left space-y-2.5">
                    <div className="flex justify-between">
                      <span className="font-sans text-xs text-tinh-muted">Mã đơn hàng</span>
                      <span className="font-sans text-xs font-semibold text-tinh-ink">{orderCode}</span>
                    </div>
                    {shippingInfo && (
                      <div className="flex justify-between">
                        <span className="font-sans text-xs text-tinh-muted">Giao đến</span>
                        <span className="font-sans text-xs text-tinh-ink text-right max-w-[160px]">
                          {shippingInfo.fullName}, {shippingInfo.city}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-sans text-xs text-tinh-muted">Thanh toán</span>
                      <span className="font-sans text-xs text-tinh-ink">
                        {paymentMethod === "cod" ? "COD" : "Chuyển khoản"}
                      </span>
                    </div>
                  </div>

                  {paymentMethod === "transfer" && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-left">
                      <p className="font-sans text-xs font-semibold text-amber-700">Hướng dẫn chuyển khoản</p>
                      <p className="mt-1 font-sans text-xs text-amber-600">
                        MB Bank · 1234 5678 · Nguyễn Tĩnh Nhiên
                      </p>
                      <p className="font-sans text-xs text-amber-600">
                        Nội dung: <strong>{orderCode}</strong>
                      </p>
                    </div>
                  )}

                  <div className="mt-6 rounded-xl bg-tinh-paper/80 py-3 px-4">
                    <p className="font-serif text-sm italic text-tinh-muted">
                      "Một nhịp thở chậm đang trên đường đến tay bạn."
                    </p>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={cancelOrder}
                  className="mt-6 w-full rounded-full bg-tinh-sageDeep py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-tinh-ink"
                >
                  Về trang chủ
                </motion.button>
              </>
            ) : (
              <>
                {/* Cancelled icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10 text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>

                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                  Thanh toán thất bại
                </p>
                <h2 className="mt-3 font-serif text-3xl text-tinh-ink">Đơn hàng bị hủy</h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-tinh-muted">
                  Rất tiếc, đã có lỗi xảy ra trong quá trình xử lý thanh toán. Vui lòng thử lại sau.
                </p>

                <button
                  onClick={cancelOrder}
                  className="mt-8 w-full rounded-full bg-tinh-sageDeep py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-tinh-ink"
                >
                  Thử lại
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
