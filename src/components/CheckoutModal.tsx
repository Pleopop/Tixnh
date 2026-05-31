import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart, type ShippingInfo, type PaymentMethod, PRICE_MAP } from "../context/CartContext";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}

type Step = "info" | "payment" | "confirm" | "processing";

const SHIPPING_FEE = 30000;

export function CheckoutModal() {
  const { status, items, totalPrice, submitOrder, openCart } = useCart();
  const isOpen = status === "checkout";

  const [step, setStep] = useState<Step>("info");
  const [form, setForm] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  function validate() {
    const e: Partial<ShippingInfo> = {};
    if (!form.fullName.trim()) e.fullName = "Vui lòng nhập họ tên";
    if (!form.phone.trim() || !/^(0|\+84)[0-9]{8,9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Số điện thoại không hợp lệ";
    if (!form.address.trim()) e.address = "Vui lòng nhập địa chỉ";
    if (!form.city.trim()) e.city = "Vui lòng nhập tỉnh/thành phố";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === "info") {
      if (validate()) setStep("payment");
    } else if (step === "payment") {
      setStep("confirm");
    }
  }

  function handleSubmit() {
    setStep("processing");
    submitOrder(form, paymentMethod);
  }

  function handleBack() {
    if (step === "payment") setStep("info");
    else if (step === "confirm") setStep("payment");
    else if (step === "info") openCart();
  }

  const grandTotal = totalPrice + SHIPPING_FEE;

  const stepLabels = ["Thông tin", "Thanh toán", "Xác nhận"];
  const stepIndex = step === "info" ? 0 : step === "payment" ? 1 : 2;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="checkout-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-end justify-center bg-tinh-ink/40 backdrop-blur-[3px] sm:items-center sm:p-4"
      >
        <motion.div
          key="checkout-modal"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className="relative flex max-h-[95dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-tinh-cream shadow-2xl sm:rounded-3xl"
        >
          {/* Header */}
          <div className="border-b border-tinh-dusk/20 px-6 py-5">
            <h2 className="font-serif text-xl text-tinh-ink">Đặt hàng</h2>

            {/* Step indicator */}
            {step !== "processing" && (
              <div className="mt-3 flex items-center gap-2">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full font-sans text-[10px] font-semibold transition-colors ${
                          i < stepIndex
                            ? "bg-tinh-sageDeep text-white"
                            : i === stepIndex
                            ? "bg-tinh-sageDeep text-white ring-2 ring-tinh-sage/30"
                            : "bg-tinh-dusk/30 text-tinh-muted"
                        }`}
                      >
                        {i < stepIndex ? "✓" : i + 1}
                      </div>
                      <span
                        className={`font-sans text-xs ${
                          i === stepIndex ? "font-semibold text-tinh-ink" : "text-tinh-muted"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div className={`h-px w-6 ${i < stepIndex ? "bg-tinh-sageDeep" : "bg-tinh-dusk/30"}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {/* Step 1: Shipping info */}
            {step === "info" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <p className="font-sans text-sm text-tinh-muted">Nhập thông tin giao hàng của bạn</p>

                {(
                  [
                    { key: "fullName", label: "Họ và tên *", placeholder: "Nguyễn Văn A", type: "text" },
                    { key: "phone", label: "Số điện thoại *", placeholder: "0912 345 678", type: "tel" },
                    { key: "address", label: "Địa chỉ *", placeholder: "Số nhà, tên đường, phường/xã", type: "text" },
                    { key: "city", label: "Tỉnh / Thành phố *", placeholder: "Hà Nội", type: "text" },
                    { key: "note", label: "Ghi chú", placeholder: "Giao giờ hành chính, gọi trước khi giao...", type: "text" },
                  ] as const
                ).map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="mb-1.5 block font-sans text-xs font-medium text-tinh-ink">{label}</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, [key]: e.target.value }));
                        if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
                      }}
                      placeholder={placeholder}
                      className={`w-full rounded-xl border bg-white/80 px-4 py-3 font-sans text-sm text-tinh-ink placeholder-tinh-dusk outline-none transition focus:border-tinh-sageDeep focus:ring-2 focus:ring-tinh-sage/20 ${
                        errors[key] ? "border-red-300" : "border-tinh-dusk/40"
                      }`}
                    />
                    {errors[key] && (
                      <p className="mt-1 font-sans text-xs text-red-500">{errors[key]}</p>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Step 2: Payment method */}
            {step === "payment" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <p className="font-sans text-sm text-tinh-muted">Chọn phương thức thanh toán</p>

                {[
                  {
                    id: "cod" as PaymentMethod,
                    title: "Thanh toán khi nhận hàng (COD)",
                    desc: "Trả tiền mặt khi nhận hàng tại nhà",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                      </svg>
                    ),
                  },
                  {
                    id: "transfer" as PaymentMethod,
                    title: "Chuyển khoản ngân hàng",
                    desc: "MB Bank · 1234 5678 · Nguyễn Tĩnh Nhiên",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                      </svg>
                    ),
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                      paymentMethod === opt.id
                        ? "border-tinh-sageDeep bg-tinh-sageDeep/8 ring-2 ring-tinh-sage/30"
                        : "border-tinh-dusk/30 bg-white/60 hover:border-tinh-sage"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                        paymentMethod === opt.id
                          ? "bg-tinh-sageDeep text-white"
                          : "bg-tinh-paper text-tinh-muted"
                      }`}
                    >
                      {opt.icon}
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-tinh-ink">{opt.title}</p>
                      <p className="mt-0.5 font-sans text-xs text-tinh-muted">{opt.desc}</p>
                      {opt.id === "transfer" && paymentMethod === "transfer" && (
                        <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 font-sans text-xs text-amber-700">
                          Vui lòng chuyển khoản trong vòng 24h. Đơn hàng sẽ được xử lý sau khi xác nhận thanh toán.
                        </div>
                      )}
                    </div>
                    <div className="ml-auto mt-0.5 flex-shrink-0">
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition ${
                          paymentMethod === opt.id
                            ? "border-tinh-sageDeep bg-tinh-sageDeep"
                            : "border-tinh-dusk/50"
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === "confirm" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <p className="font-sans text-sm text-tinh-muted">Kiểm tra lại thông tin trước khi đặt hàng</p>

                {/* Products summary */}
                <div className="rounded-2xl border border-tinh-dusk/20 bg-white/60 p-4">
                  <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-tinh-sageDeep">
                    Sản phẩm
                  </p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.product.id} className="flex justify-between">
                        <span className="font-sans text-sm text-tinh-ink">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-sans text-sm text-tinh-muted">
                          {formatVND((PRICE_MAP[item.product.id] ?? 185000) * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 border-t border-tinh-dusk/20 pt-3">
                    <div className="flex justify-between text-xs text-tinh-muted">
                      <span>Phí vận chuyển</span>
                      <span>{formatVND(SHIPPING_FEE)}</span>
                    </div>
                    <div className="mt-1.5 flex justify-between">
                      <span className="font-sans text-sm font-semibold text-tinh-ink">Tổng thanh toán</span>
                      <span className="font-serif text-lg text-tinh-sageDeep">{formatVND(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div className="rounded-2xl border border-tinh-dusk/20 bg-white/60 p-4">
                  <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-tinh-sageDeep">
                    Giao hàng đến
                  </p>
                  <p className="font-sans text-sm font-medium text-tinh-ink">{form.fullName}</p>
                  <p className="font-sans text-sm text-tinh-muted">{form.phone}</p>
                  <p className="font-sans text-sm text-tinh-muted">
                    {form.address}, {form.city}
                  </p>
                  {form.note && (
                    <p className="mt-1 font-sans text-xs italic text-tinh-dusk">Ghi chú: {form.note}</p>
                  )}
                </div>

                {/* Payment */}
                <div className="rounded-2xl border border-tinh-dusk/20 bg-white/60 p-4">
                  <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-tinh-sageDeep">
                    Thanh toán
                  </p>
                  <p className="font-sans text-sm text-tinh-ink">
                    {paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản ngân hàng"}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Processing */}
            {step === "processing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="relative mb-6">
                  <div className="h-16 w-16 rounded-full border-4 border-tinh-dusk/20 border-t-tinh-sageDeep animate-spin" />
                </div>
                <p className="font-serif text-xl text-tinh-ink">Đang xử lý đơn hàng…</p>
                <p className="mt-2 font-sans text-sm text-tinh-muted">Vui lòng không tắt trang này</p>
              </motion.div>
            )}
          </div>

          {/* Footer buttons */}
          {step !== "processing" && (
            <div className="border-t border-tinh-dusk/20 px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 rounded-full border border-tinh-dusk/40 py-3 font-sans text-sm text-tinh-muted transition hover:border-tinh-sage hover:text-tinh-ink"
                >
                  ← Quay lại
                </button>
                {step !== "confirm" ? (
                  <button
                    onClick={handleNext}
                    className="flex-[2] rounded-full bg-tinh-sageDeep py-3 font-sans text-sm font-semibold text-white transition hover:bg-tinh-ink"
                  >
                    Tiếp theo →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-[2] rounded-full bg-tinh-sageDeep py-3 font-sans text-sm font-semibold text-white transition hover:bg-tinh-ink"
                  >
                    Xác nhận đặt hàng ✓
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
