import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateOrderCode } from "../lib/orders";
import {
  getProductName,
  getProductPrice,
  SHIPPING_FEE,
} from "../lib/prices";

type CheckoutItem = { productId: string; quantity: number };

type CheckoutBody = {
  items?: CheckoutItem[];
  shipping?: {
    fullName?: string;
    phone?: string;
    address?: string;
    city?: string;
    note?: string;
  };
  paymentMethod?: "cod" | "transfer";
};

function badRequest(res: VercelResponse, message: string) {
  return res.status(400).json({ error: message });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as CheckoutBody;
  const items = body.items;
  const shipping = body.shipping;
  const paymentMethod = body.paymentMethod;

  if (!Array.isArray(items) || items.length === 0) {
    return badRequest(res, "Giỏ hàng trống");
  }

  if (!shipping?.fullName?.trim()) return badRequest(res, "Thiếu họ tên");
  if (!shipping?.phone?.trim()) return badRequest(res, "Thiếu số điện thoại");
  if (!shipping?.address?.trim()) return badRequest(res, "Thiếu địa chỉ");
  if (!shipping?.city?.trim()) return badRequest(res, "Thiếu tỉnh/thành phố");

  const phone = shipping.phone.replace(/\s/g, "");
  if (!/^(0|\+84)[0-9]{8,9}$/.test(phone)) {
    return badRequest(res, "Số điện thoại không hợp lệ");
  }

  if (paymentMethod !== "cod" && paymentMethod !== "transfer") {
    return badRequest(res, "Phương thức thanh toán không hợp lệ");
  }

  const lineItems: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[] = [];

  let subtotal = 0;

  for (const item of items) {
    if (!item.productId || typeof item.quantity !== "number" || item.quantity < 1) {
      return badRequest(res, "Sản phẩm không hợp lệ");
    }

    const unitPrice = getProductPrice(item.productId);
    const productName = getProductName(item.productId);
    if (unitPrice === undefined || !productName) {
      return badRequest(res, `Sản phẩm không tồn tại: ${item.productId}`);
    }

    lineItems.push({
      productId: item.productId,
      productName,
      quantity: item.quantity,
      unitPrice,
    });
    subtotal += unitPrice * item.quantity;
  }

  const total = subtotal + SHIPPING_FEE;
  const orderCode = generateOrderCode();

  try {
    const { getPrisma } = await import("../lib/db");
    const prisma = getPrisma();

    const order = await prisma.order.create({
      data: {
        orderCode,
        fullName: shipping.fullName.trim(),
        phone,
        address: shipping.address.trim(),
        city: shipping.city.trim(),
        note: shipping.note?.trim() || null,
        paymentMethod,
        subtotal,
        shippingFee: SHIPPING_FEE,
        total,
        items: {
          create: lineItems,
        },
      },
      include: { items: true },
    });

    return res.status(201).json({
      orderCode: order.orderCode,
      status: order.status,
      total: order.total,
      paymentMethod: order.paymentMethod,
    });
  } catch (err) {
    console.error("checkout error", err);
    return res.status(500).json({ error: "Không thể tạo đơn hàng. Vui lòng thử lại." });
  }
}
