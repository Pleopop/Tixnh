import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = "idle" | "cart" | "checkout" | "processing" | "success" | "cancelled";

export type ShippingInfo = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  note: string;
};

export type PaymentMethod = "cod" | "transfer";

type CartContextType = {
  items: CartItem[];
  status: OrderStatus;
  shippingInfo: ShippingInfo | null;
  paymentMethod: PaymentMethod;
  orderCode: string;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  goToCheckout: () => void;
  submitOrder: (info: ShippingInfo, method: PaymentMethod) => void;
  cancelOrder: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

const PRICE_MAP: Record<string, number> = {
  "tinh-yen": 185000,
  "tinh-tram": 185000,
  "tinh-nhien": 185000,
};

function generateOrderCode() {
  return "TINH-" + Date.now().toString(36).toUpperCase();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [status, setStatus] = useState<OrderStatus>("idle");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [orderCode, setOrderCode] = useState("");

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setStatus("cart");
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setStatus("idle");
  }, []);

  const openCart = useCallback(() => setStatus("cart"), []);
  const closeCart = useCallback(() => setStatus("idle"), []);
  const goToCheckout = useCallback(() => setStatus("checkout"), []);

  const submitOrder = useCallback((info: ShippingInfo, method: PaymentMethod) => {
    setShippingInfo(info);
    setPaymentMethod(method);
    setStatus("processing");

    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        setOrderCode(generateOrderCode());
        setStatus("success");
        setItems([]);
      } else {
        setStatus("cancelled");
      }
    }, 2000);
  }, []);

  const cancelOrder = useCallback(() => {
    setStatus("idle");
    setShippingInfo(null);
    setItems([]);
  }, []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce(
    (s, i) => s + i.quantity * (PRICE_MAP[i.product.id] ?? 185000),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        status,
        shippingInfo,
        paymentMethod,
        orderCode,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
        goToCheckout,
        submitOrder,
        cancelOrder,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { PRICE_MAP };
