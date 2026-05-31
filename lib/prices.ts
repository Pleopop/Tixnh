export const SHIPPING_FEE = 30_000;

export const PRODUCT_PRICES: Record<string, { name: string; price: number }> = {
  "tinh-yen": { name: "Tĩnh · Yên", price: 35000 },
  "tinh-tram": { name: "Tĩnh · Trầm", price: 29000 },
  "tinh-nhien": { name: "Tĩnh · Nhiên", price: 27000 },
};

export function getProductPrice(productId: string): number | undefined {
  return PRODUCT_PRICES[productId]?.price;
}

export function getProductName(productId: string): string | undefined {
  return PRODUCT_PRICES[productId]?.name;
}
