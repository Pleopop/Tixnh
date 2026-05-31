import type { PaymentMethod, ShippingInfo } from "../context/CartContext";

export type CheckoutItemPayload = {
  productId: string;
  quantity: number;
};

export type CheckoutResult = {
  orderCode: string;
  status: string;
  total: number;
  paymentMethod: string;
};

export async function postCheckout(
  items: CheckoutItemPayload[],
  shipping: ShippingInfo,
  paymentMethod: PaymentMethod
): Promise<CheckoutResult> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, shipping, paymentMethod }),
  });

  const data = (await res.json()) as CheckoutResult & { error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? "Không thể đặt hàng");
  }

  return data;
}
